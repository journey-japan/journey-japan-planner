import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSpotBySlug, getSpots, getSpotUsageCounts, getPopularSpots } from "@/lib/db";
import { formatAdmissionFee } from "@/lib/format";
import SpotFavoriteWrapper from "@/components/spot/SpotFavoriteWrapper";

const SITE_URL = "https://plan.journeyjpn.com";

const CATEGORY_LABELS: Record<string, string> = {
  shrine: "Shrine",
  temple: "Temple",
  museum: "Museum",
  park: "Park",
  observation: "Observation",
  shopping: "Shopping",
  food: "Food",
  restaurant: "Restaurant",
  landmark: "Landmark",
  onsen: "Onsen",
  nature: "Nature",
  entertainment: "Entertainment",
  market: "Market",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spot = await getSpotBySlug(slug);
  if (!spot) return {};

  const areaLabel = spot.area.charAt(0).toUpperCase() + spot.area.slice(1);
  const title = spot.metaTitle || `${spot.nameEn} — ${areaLabel} Guide | Journey Japan`;
  const description = spot.metaDescription || spot.description.slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/spots/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/spots/${slug}`,
      type: "article",
      images: spot.photoUrls?.[0] ? [{ url: spot.photoUrls[0] }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SpotDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spot = await getSpotBySlug(slug);
  if (!spot) notFound();

  const areaLabel = spot.area.charAt(0).toUpperCase() + spot.area.slice(1);
  const fee = formatAdmissionFee(spot.admissionFee, spot.admissionFeeCurrency);

  // Popularity data
  const [usageCounts, popularSpots, areaSpots] = await Promise.all([
    getSpotUsageCounts([spot.id]),
    getPopularSpots(spot.area, 5),
    getSpots(spot.area),
  ]);
  const savedCount = usageCounts[spot.id] || 0;

  // Find this spot's rank
  const rank = popularSpots.findIndex((p) => p.spot.id === spot.id) + 1;

  const relatedSpots = areaSpots
    .filter((s) => s.id !== spot.id)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: spot.nameEn,
    alternateName: spot.nameJa,
    description: spot.description,
    url: `${SITE_URL}/spots/${slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: spot.address,
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: spot.lat,
      longitude: spot.lng,
    },
    ...(spot.photoUrls?.[0] && { image: spot.photoUrls[0] }),
    ...(fee && {
      isAccessibleForFree: fee === "Free",
    }),
    containedInPlace: {
      "@type": "City",
      name: areaLabel,
      containedInPlace: { "@type": "Country", name: "Japan" },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: areaLabel, item: `${SITE_URL}/destinations/${spot.area}` },
      { "@type": "ListItem", position: 3, name: spot.nameEn, item: `${SITE_URL}/spots/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-gray-900">
          {spot.photoUrls?.[0] ? (
            <div className="relative h-72 md:h-96">
              <Image
                src={spot.photoUrls[0]}
                alt={spot.nameEn}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          ) : (
            <div className="h-48 bg-gray-800" />
          )}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="text-xs text-white/60 mb-3">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="mx-1.5">/</span>
                <Link href={`/destinations/${spot.area}`} className="hover:text-white transition-colors">{areaLabel}</Link>
                <span className="mx-1.5">/</span>
                <span className="text-white/90">{spot.nameEn}</span>
              </nav>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{spot.nameEn}</h1>
              <p className="text-sm text-white/60 mt-1">{spot.nameJa}</p>
            </div>
          </div>
        </section>

        {/* Quick Info */}
        <section className="border-b border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="bg-accent-light text-accent px-3 py-1 rounded-full text-xs font-medium">
              {CATEGORY_LABELS[spot.category] || spot.category}
            </span>
            <span className="flex items-center gap-1">
              <span>⏱</span> ~{spot.avgDurationMin} min
            </span>
            {fee && (
              <span className="flex items-center gap-1">
                <span>🎫</span> {fee}
              </span>
            )}
            <span className="flex items-center gap-1">
              <span>📍</span> {areaLabel}
            </span>
            {savedCount > 0 && (
              <span className="flex items-center gap-1">
                <span>👥</span> Saved by {savedCount} {savedCount === 1 ? "traveler" : "travelers"}
              </span>
            )}
            {rank > 0 && (
              <span className="flex items-center gap-1 font-medium text-accent">
                <span>🏆</span> #{rank} in {areaLabel}
              </span>
            )}
            <span className="ml-auto">
              <SpotFavoriteWrapper spotId={spot.id} />
            </span>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-bold mb-3">About {spot.nameEn}</h2>
              <p className="text-gray-600 leading-relaxed">{spot.description}</p>

              {/* Photo gallery */}
              {spot.photoUrls && spot.photoUrls.length > 1 && (
                <div className="mt-8">
                  <h2 className="text-lg font-bold mb-3">Photos</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {spot.photoUrls.slice(1).map((url, i) => (
                      <div key={i} className="relative h-44 rounded-xl overflow-hidden bg-gray-100">
                        <Image
                          src={url}
                          alt={`${spot.nameEn} photo ${i + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Opening hours */}
              {spot.openingHours && Object.keys(spot.openingHours).length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-bold mb-3">Opening Hours</h2>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-1">
                    {Object.entries(spot.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="text-gray-500 capitalize">{day}</span>
                        <span className="text-gray-700">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Address & Map */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Location</h3>
                {spot.address && (
                  <p className="text-sm text-gray-600 mb-3">{spot.address}</p>
                )}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.nameEn + " " + spot.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-gray-200 hover:border-accent hover:text-accent text-sm font-medium text-gray-600 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Open in Google Maps
                </a>
              </div>

              {/* Plan CTA */}
              <div className="bg-gradient-to-br from-accent to-green-700 rounded-xl p-5 text-white text-center">
                <p className="text-sm font-semibold mb-2">Want to visit {spot.nameEn}?</p>
                <p className="text-xs opacity-80 mb-4">Add it to your custom itinerary.</p>
                <Link
                  href="/editor/new"
                  className="inline-block bg-white text-accent font-semibold px-5 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                >
                  Start Planning
                </Link>
              </div>

              {/* Popular Ranking */}
              {popularSpots.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Popular in {areaLabel}
                  </h3>
                  <div className="space-y-2">
                    {popularSpots.map((entry, i) => (
                      <Link
                        key={entry.spot.id}
                        href={entry.spot.slug ? `/spots/${entry.spot.slug}` : "#"}
                        className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                          entry.spot.id === spot.id
                            ? "bg-accent-light text-accent font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                          i === 0 ? "bg-amber-100 text-amber-700"
                            : i === 1 ? "bg-gray-200 text-gray-600"
                            : i === 2 ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {i + 1}
                        </span>
                        <span className="truncate">{entry.spot.nameEn}</span>
                        <span className="text-[10px] text-gray-400 ml-auto flex-shrink-0">
                          {entry.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to area */}
              <Link
                href={`/destinations/${spot.area}`}
                className="block text-center text-sm text-gray-500 hover:text-accent transition-colors"
              >
                &larr; All {areaLabel} Spots
              </Link>
            </div>
          </div>
        </section>

        {/* Related Spots */}
        {relatedSpots.length > 0 && (
          <section className="bg-gray-50 py-12 px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-lg font-bold text-center mb-8">
                More Spots in {areaLabel}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedSpots.map((s) => (
                  <Link
                    key={s.id}
                    href={s.slug ? `/spots/${s.slug}` : `/destinations/${s.area}`}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-32 bg-gray-100">
                      {s.photoUrls?.[0] ? (
                        <Image
                          src={s.photoUrls[0]}
                          alt={s.nameEn}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">📍</div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-gray-900 leading-tight">{s.nameEn}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {CATEGORY_LABELS[s.category] || s.category} · ~{s.avgDurationMin} min
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
