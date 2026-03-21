import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ItineraryCard from "@/components/itinerary/ItineraryCard";
import { AREAS } from "@/types";
import { SAMPLE_ITINERARIES } from "@/lib/sample-data";

export default function HomePage() {
  return (
    <>
      <Header />

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-gray-50 via-accent-light to-blue-50/30 py-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full text-[13px] text-gray-500 mb-6">
          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
          Japan-focused trip planner
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Plan your perfect{" "}
          <span className="text-accent">Japan</span> trip
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
          Browse curated itineraries from travel professionals, or build your
          own day-by-day plan with our intuitive drag-and-drop editor.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/editor/new"
            className="bg-accent hover:bg-accent-hover text-white font-medium px-7 py-3 rounded-xl transition-colors shadow-md shadow-accent/25"
          >
            Start Planning
          </Link>
          <Link
            href="#itineraries"
            className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-7 py-3 rounded-xl transition-colors hover:bg-gray-50"
          >
            Browse Itineraries
          </Link>
        </div>
      </section>

      {/* ===== AREA SELECTOR ===== */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-bold">Explore by Area</h2>
          <Link href="#" className="text-sm text-accent font-medium hover:underline">
            View all areas
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {AREAS.map((area, i) => (
            <button
              key={area.value}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                i === 0
                  ? "bg-accent text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-accent-light hover:text-accent border border-transparent hover:border-accent"
              }`}
            >
              <span className="text-lg">{area.emoji}</span>
              {area.label}
            </button>
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
          {SAMPLE_ITINERARIES.map((itinerary, index) => (
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

      <Footer />
    </>
  );
}
