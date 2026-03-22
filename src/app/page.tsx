import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ItineraryCard from "@/components/itinerary/ItineraryCard";
import { AREAS } from "@/types";
import { getItineraries, getSpots } from "@/lib/db";
import { SAMPLE_ITINERARIES } from "@/lib/sample-data";

export default async function HomePage() {
  // Try fetching from DB, fall back to sample data
  let itineraries = await getItineraries();
  const useFallback = itineraries.length === 0;
  if (useFallback) {
    itineraries = SAMPLE_ITINERARIES;
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Journey Japan",
    url: "https://plan.journeyjpn.com",
    description:
      "Plan your perfect Japan trip with itineraries curated by professional travel agents. Customize your schedule with drag-and-drop, explore 50+ must-visit spots, and book tours directly from your plan.",
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Journey Japan",
      url: "https://journeyjpn.com",
    },
    featureList: [
      "Drag-and-drop itinerary editor",
      "Professional travel agent curated itineraries",
      "Interactive Google Maps integration",
      "Book tours directly from your itinerary",
      "50+ must-visit spots in Tokyo, Kyoto, Osaka",
      "Free to use — no credit card required",
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://plan.journeyjpn.com",
      },
    ],
  };

  // FAQ structured data — may appear as rich result in Google
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Journey Japan free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Journey Japan is completely free. You can browse professional itineraries, customize them with drag-and-drop, and save your plans without any cost or credit card.",
        },
      },
      {
        "@type": "Question",
        name: "Who creates the itineraries on Journey Japan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our itineraries are curated by professional travel agents who specialize in Japan travel. Each itinerary is crafted based on years of expertise to help you make the most of your trip.",
        },
      },
      {
        "@type": "Question",
        name: "Can I customize the itineraries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Use our intuitive drag-and-drop editor to add, remove, or rearrange spots in any itinerary. You can also start from scratch and build your own plan.",
        },
      },
      {
        "@type": "Question",
        name: "Can I book tours directly from Journey Japan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can browse and book recommended tours and experiences directly from your itinerary page, making it easy to go from planning to booking in one place.",
        },
      },
      {
        "@type": "Question",
        name: "What areas of Japan does Journey Japan cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We currently cover major destinations including Tokyo, Kyoto, Osaka, Hakone, Nikko, Kamakura, Nara, and Hiroshima, with more areas being added regularly.",
        },
      },
    ],
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>

      {/* ===== HERO ===== */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        {/* Hero background image */}
        <Image
          src="/hero-bg_r1.jpg"
          alt="Japan trip planner showing Tokyo Tower, Mount Fuji, cherry blossoms, and an interactive itinerary editor"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-white/50 px-3.5 py-1.5 rounded-full text-[13px] text-gray-600 mb-6">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Built by professional travel agents
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
            Plan your perfect{" "}
            <span className="text-green-300">Japan</span> trip
          </h1>
          <p className="text-lg text-white/85 max-w-xl mx-auto mb-8 drop-shadow">
            Browse expert-curated itineraries from professional travel agents.
            Customize your plan with drag-and-drop, and book tours directly — all in one place.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/editor/new"
              className="bg-accent hover:bg-accent-hover text-white font-medium px-7 py-3 rounded-xl transition-colors shadow-lg"
            >
              Start Planning
            </Link>
            <Link
              href="#itineraries"
              className="border border-white/60 hover:border-white text-white font-medium px-7 py-3 rounded-xl transition-colors hover:bg-white/10 backdrop-blur-sm"
            >
              Browse Itineraries
            </Link>
          </div>
        </div>
      </section>

      {/* ===== AREA SELECTOR ===== */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-bold">Explore by Area</h2>
          <Link href="/destinations/tokyo" className="text-sm text-accent font-medium hover:underline">
            View all areas
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {AREAS.map((area) => (
            <Link
              key={area.value}
              href={`/destinations/${area.value}`}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all bg-gray-100 text-gray-700 hover:bg-accent-light hover:text-accent border border-transparent hover:border-accent"
            >
              <span className="text-lg">{area.emoji}</span>
              {area.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ===== ITINERARY CARDS ===== */}
      <section id="itineraries" className="max-w-7xl mx-auto px-6 pb-14">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-xl font-bold">Popular Itineraries</h2>
          <Link href="#" className="text-sm text-accent font-medium hover:underline">
            See all
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit mb-6">
          {["All", "Pro Picks", "Community"].map((tab, i) => (
            <button
              key={tab}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                i === 0
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
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

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Browse or Start Fresh",
                desc: "Explore pro-curated itineraries or start from scratch. Copy any itinerary as your own starting point.",
              },
              {
                step: "2",
                title: "Drag, Drop & Customize",
                desc: "Add spots, rearrange your schedule with drag-and-drop. See everything on a map in real time.",
              },
              {
                step: "3",
                title: "Save & Share",
                desc: "Save your plan, share it with travel companions via a simple link, or publish it for the community.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-accent-light rounded-2xl flex items-center justify-center text-accent text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY JOURNEY JAPAN ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-xl font-bold text-center mb-3">Why Journey Japan?</h2>
        <p className="text-sm text-gray-500 text-center max-w-2xl mx-auto mb-10">
          The only Japan trip planner built by professional travel agents, designed for travelers who want more than a generic guide.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-accent-light rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
              ✋
            </div>
            <h3 className="text-base font-semibold mb-2">Drag &amp; Drop Customization</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              Intuitively rearrange your itinerary with drag-and-drop. Add or remove spots, adjust timing, and see changes instantly on an interactive map.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-accent-light rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
              🧳
            </div>
            <h3 className="text-base font-semibold mb-2">Curated by Travel Professionals</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              Every itinerary is crafted by professional travel agents who specialize in Japan. Get insider tips and optimized routes that only experts know.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-accent-light rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
              🎫
            </div>
            <h3 className="text-base font-semibold mb-2">Book Directly from Your Plan</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              Found the perfect itinerary? Book recommended tours and experiences right from your planner — no need to switch between multiple sites.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <details className="group bg-white rounded-lg border border-gray-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                Is Journey Japan free to use?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600">
                Yes, Journey Japan is completely free. You can browse professional itineraries, customize them with drag-and-drop, and save your plans without any cost or credit card.
              </div>
            </details>
            <details className="group bg-white rounded-lg border border-gray-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                Who creates the itineraries?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600">
                Our itineraries are curated by professional travel agents who specialize in Japan travel. Each itinerary is crafted based on years of expertise to help you make the most of your trip.
              </div>
            </details>
            <details className="group bg-white rounded-lg border border-gray-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                Can I customize the itineraries?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600">
                Use our intuitive drag-and-drop editor to add, remove, or rearrange spots in any itinerary. You can also start from scratch and build your own plan.
              </div>
            </details>
            <details className="group bg-white rounded-lg border border-gray-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                Can I book tours directly from Journey Japan?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600">
                Yes. You can browse and book recommended tours and experiences directly from your itinerary page, making it easy to go from planning to booking in one place.
              </div>
            </details>
            <details className="group bg-white rounded-lg border border-gray-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                What areas of Japan are covered?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600">
                We currently cover major destinations including Tokyo, Kyoto, Osaka, Hakone, Nikko, Kamakura, Nara, and Hiroshima, with more areas being added regularly.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="bg-gradient-to-br from-accent to-green-700 rounded-2xl py-12 px-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">
            Ready to plan your Japan trip?
          </h2>
          <p className="text-base opacity-85 mb-7">
            It&apos;s free. No credit card required.
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
