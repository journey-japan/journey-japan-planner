import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SAMPLE_ITINERARIES } from "@/lib/sample-data";

const TRANSPORT_ICONS: Record<string, string> = {
  walk: "🚶",
  train: "🚃",
  bus: "🚌",
  taxi: "🚕",
  car: "🚗",
};

export default function ItineraryDetailPage() {
  // For now, always show the first (Pro) itinerary
  const itinerary = SAMPLE_ITINERARIES[0];
  const daysWithItems = itinerary.days.filter((d) => d.items.length > 0);
  const emptyDays = itinerary.days.filter((d) => d.items.length === 0);

  return (
    <>
      <Header />

      {/* ===== HERO ===== */}
      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-green-200/60 via-green-300/40 to-emerald-200/30">
        <div className="absolute inset-0 flex items-center justify-center text-[100px] opacity-15">
          🌸
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 max-w-3xl mx-auto text-white">
          {itinerary.isPro && (
            <span className="inline-block bg-accent text-white text-[11px] font-bold px-3 py-1 rounded tracking-wide mb-3">
              PRO ITINERARY
            </span>
          )}
          <h1 className="text-3xl font-bold mb-2">{itinerary.title}</h1>
          <div className="flex gap-4 text-sm opacity-90">
            <span>📍 {itinerary.area.charAt(0).toUpperCase() + itinerary.area.slice(1)}</span>
            <span>📅 {itinerary.durationDays} days</span>
            <span>👁️ {itinerary.viewCount.toLocaleString()} views</span>
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-3xl mx-auto px-6">
        {/* Author bar */}
        <div className="flex items-center justify-between py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">
              K
            </div>
            <div>
              <div className="text-[15px] font-semibold">
                {itinerary.author?.displayName}
              </div>
              <div className="text-[13px] text-gray-400">
                Travel Agent · 9 years in Japan tourism
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="text-sm border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg transition-all">
              Share
            </button>
            <Link
              href="/editor/new"
              className="text-sm text-white bg-accent hover:bg-accent-hover px-4 py-2 rounded-lg transition-colors"
            >
              Copy & Customize
            </Link>
          </div>
        </div>

        {/* Description */}
        <p className="text-[15px] text-gray-600 py-6 border-b border-gray-200">
          {itinerary.description}
        </p>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap py-6">
          {itinerary.tags.map((tag) => (
            <span
              key={tag}
              className="text-[13px] text-accent bg-accent-light font-medium px-3.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Map placeholder */}
        <div
          className="h-72 rounded-xl mb-8 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #e4ece6 0%, #d8e4dc 100%)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
            Interactive Google Map will be here
          </div>
        </div>

        {/* ===== DAY BLOCKS ===== */}
        {daysWithItems.map((day) => (
          <div key={day.id} className="py-8 border-b border-gray-100 last:border-none">
            {/* Day title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {day.dayNumber}
              </div>
              <div>
                <h2 className="text-lg font-bold">{day.title}</h2>
                <span className="text-[13px] text-gray-400">
                  Day {day.dayNumber}
                  {day.date && ` · ${day.date}`}
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-9">
              {/* Vertical line */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />

              {day.items.map((item, itemIdx) => (
                <div key={item.id}>
                  {/* Timeline item */}
                  <div className="relative pb-6 last:pb-0">
                    {/* Dot */}
                    <div className="absolute -left-9 top-0.5 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-[11px] font-bold z-10">
                      {itemIdx + 1}
                    </div>

                    {/* Card */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all">
                      <div className="flex items-start justify-between mb-1">
                        <div className="text-base font-semibold">
                          {item.spot.nameEn}
                        </div>
                        {item.startTime && (
                          <div className="text-[13px] text-gray-400 whitespace-nowrap">
                            {item.startTime}
                            {item.durationMinutes &&
                              ` — ${item.durationMinutes} min`}
                          </div>
                        )}
                      </div>
                      <div className="text-[13px] text-gray-400 mb-2">
                        {item.spot.category.charAt(0).toUpperCase() +
                          item.spot.category.slice(1)}{" "}
                        · {item.spot.nameJa}
                        {item.durationMinutes &&
                          ` · ${item.durationMinutes} min`}
                      </div>
                      {item.note && (
                        <div className="bg-white rounded-md border border-gray-200 p-3 mt-2">
                          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            Pro Tip
                          </div>
                          <div className="text-sm text-gray-600">
                            {item.note}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transport between items */}
                  {item.transportToNext && (
                    <div className="py-2 text-xs text-gray-400 flex items-center gap-2">
                      {TRANSPORT_ICONS[item.transportToNext.mode] || "→"}
                      {item.transportToNext.detail ||
                        item.transportToNext.mode}{" "}
                      · {item.transportToNext.durationMinutes} min
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Collapsed days */}
        {emptyDays.map((day) => (
          <div key={day.id} className="py-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {day.dayNumber}
              </div>
              <div>
                <h2 className="text-lg font-bold">{day.title}</h2>
                <span className="text-[13px] text-gray-400">
                  Day {day.dayNumber}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
              Click to expand Day {day.dayNumber}
            </div>
          </div>
        ))}

        {/* ===== CTA ===== */}
        <div className="text-center py-12 border-t border-gray-200 mt-6">
          <h3 className="text-xl font-bold mb-2">Like this itinerary?</h3>
          <p className="text-[15px] text-gray-500 mb-5">
            Copy it to your account and customize it to fit your style.
          </p>
          <Link
            href="/editor/new"
            className="inline-block bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-md shadow-accent/25"
          >
            Copy & Customize This Trip
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
