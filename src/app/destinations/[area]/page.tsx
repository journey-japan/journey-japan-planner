import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ItineraryCard from "@/components/itinerary/ItineraryCard";
import { DESTINATION_DATA } from "@/lib/destination-data";
import { getItineraries, getSpots } from "@/lib/db";
import { SAMPLE_ITINERARIES } from "@/lib/sample-data";
import { AREAS } from "@/types";

const SITE_URL = "https://plan.journeyjpn.com";

// Generate static params for all areas
export function generateStaticParams() {
  return Object.keys(DESTINATION_DATA).map((area) => ({ area }));
}

// Dynamic metadata per destination
export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const dest = DESTINATION_DATA[area];
  if (!dest) return {};

  return {
    title: dest.metaTitle,
    description: dest.metaDescription,
    keywords: dest.keywords,
    alternates: {
      canonical: `/destinations/${area}`,
    },
    openGraph: {
      title: dest.metaTitle,
      description: dest.metaDescription,
      url: `${SITE_URL}/destinations/${area}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dest.metaTitle,
      description: dest.metaDescription,
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const dest = DESTINATION_DATA[area];
  if (!dest) notFound();

  // Fetch itineraries for this area
  let itineraries = await getItineraries(area);
  if (itineraries.length === 0) {
    itineraries = SAMPLE_ITINERARIES.filter((i) => i.area === area);
  }

  // Fetch spot count for this area
  const spots = await getSpots(area);

  // JSON-LD for this destination
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.label,
    description: dest.intro,
    url: `${SITE_URL}/destinations/${area}`,
    touristType: dest.bestFor,
    containedInPlace: {
      "@type": "Country",
      name: "Japan",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Destinations",
        item: `${SITE_URL}/destinations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: dest.label,
        item: `${SITE_URL}/destinations/${area}`,
      },
    ],
  };

  // Other destinations for internal linking
  const otherDestinations = AREAS.filter((a) => a.value !== area).slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main>
        {/* ===== HERO ===== */}
        <section className="relative bg-gray-900 py-24 px-6 text-center overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dest.heroImageUrl})` }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative max-w-3xl mx-auto">
            <div className="text-5xl mb-4">{dest.emoji}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {dest.heroTitle}
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
              {dest.heroSubtitle}
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/editor/new"
                className="bg-accent hover:bg-accent-hover text-white font-medium px-7 py-3 rounded-xl transition-colors shadow-lg"
              >
                Start Planning {dest.label}
              </Link>
              {itineraries.length > 0 && (
                <a
                  href="#itineraries"
                  className="border border-white/40 hover:border-white text-white font-medium px-7 py-3 rounded-xl transition-colors hover:bg-white/10"
                >
                  Browse {dest.label} Itineraries
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ===== QUICK INFO BAR ===== */}
        <section className="border-b border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap gap-6 justify-center text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-800">Suggested stay:</span>{" "}
              {dest.suggestedDays}
            </div>
            <div className="hidden md:block text-gray-300">|</div>
            <div>
              <span className="font-semibold text-gray-800">Best season:</span>{" "}
              {dest.bestSeason}
            </div>
            <div className="hidden md:block text-gray-300">|</div>
            <div>
              <span className="font-semibold text-gray-800">Spots:</span>{" "}
              {spots.length > 0 ? `${spots.length}+ in our planner` : "Coming soon"}
            </div>
          </div>
        </section>

        {/* ===== INTRO ===== */}
        <section className="max-w-3xl mx-auto px-6 py-14">
          <h2 className="text-xl font-bold mb-4">
            Why Visit {dest.label}?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {dest.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {dest.bestFor.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-accent-light text-accent px-3 py-1.5 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* ===== HIGHLIGHTS ===== */}
        <section className="bg-gray-50 py-14 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-10">
              Top Things to Do in {dest.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dest.highlights.map((h) => (
                <div
                  key={h.title}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow"
                >
                  <div className="text-3xl mb-3">{h.icon}</div>
                  <h3 className="text-base font-semibold mb-2">{h.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ITINERARIES FOR THIS AREA ===== */}
        {itineraries.length > 0 && (
          <section id="itineraries" className="max-w-7xl mx-auto px-6 py-14">
            <h2 className="text-xl font-bold mb-2">
              {dest.label} Itineraries by Travel Professionals
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Expertly curated itineraries you can customize with drag-and-drop.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {itineraries.map((itinerary, index) => (
                <ItineraryCard
                  key={itinerary.id}
                  itinerary={itinerary}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* ===== GETTING THERE ===== */}
        <section className="max-w-3xl mx-auto px-6 py-14 border-t border-gray-100">
          <h2 className="text-xl font-bold mb-4">
            Getting to {dest.label}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {dest.gettingThere}
          </p>
        </section>

        {/* ===== EXPLORE OTHER DESTINATIONS ===== */}
        <section className="bg-gray-50 py-14 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-8">
              Explore Other Destinations
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {otherDestinations.map((a) => (
                <Link
                  key={a.value}
                  href={`/destinations/${a.value}`}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:border-accent hover:text-accent transition-all"
                >
                  <span className="text-lg">{a.emoji}</span>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="bg-gradient-to-br from-accent to-green-700 rounded-2xl py-12 px-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">
              Ready to explore {dest.label}?
            </h2>
            <p className="text-base opacity-85 mb-7">
              Start with a professional itinerary and customize it your way.
            </p>
            <Link
              href="/editor/new"
              className="inline-block bg-white text-accent font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Start Planning — It&apos;s Free
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
