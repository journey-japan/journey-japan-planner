import Link from "next/link";
import { Itinerary } from "@/types";

const CARD_GRADIENTS = [
  "from-green-200/60 to-green-300/40",
  "from-amber-200/60 to-amber-300/40",
  "from-blue-200/60 to-blue-300/40",
  "from-slate-200/60 to-slate-300/40",
  "from-pink-200/60 to-pink-300/40",
  "from-emerald-200/60 to-emerald-300/40",
];

const CARD_EMOJIS: Record<string, string> = {
  Culture: "🌸",
  Temple: "⛩️",
  Anime: "🎌",
  Sushi: "🍣",
  Family: "🎎",
  Nightlife: "🏃",
  Food: "🍜",
};

interface ItineraryCardProps {
  itinerary: Itinerary;
  index?: number;
}

export default function ItineraryCard({ itinerary, index = 0 }: ItineraryCardProps) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const emoji = CARD_EMOJIS[itinerary.tags[0]] || "🗾";
  const authorInitial = itinerary.author?.displayName?.charAt(0) || "?";

  return (
    <Link href={`/itineraries/${itinerary.id}`}>
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
        {/* Image placeholder */}
        <div className={`relative h-44 bg-gradient-to-br ${gradient}`}>
          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-40">
            {emoji}
          </div>
          {itinerary.isPro && (
            <span className="absolute top-3 left-3 bg-accent text-white text-[11px] font-bold px-2.5 py-1 rounded tracking-wide">
              PRO
            </span>
          )}
          <span className="absolute top-3 right-3 bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded">
            {itinerary.durationDays} days
          </span>
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 className="text-[15px] font-semibold leading-snug mb-1.5">{itinerary.title}</h3>
          <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-2.5">
            <span>{itinerary.area.charAt(0).toUpperCase() + itinerary.area.slice(1)}</span>
            <span>·</span>
            <span>{itinerary.isPro ? "Pro recommended" : "Community"}</span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {itinerary.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-accent bg-accent-light font-medium px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-[13px] text-gray-500">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
                itinerary.isPro ? "bg-accent" : "bg-gray-400"
              }`}
            >
              {authorInitial}
            </div>
            {itinerary.author?.displayName}
            {itinerary.isPro && " — Travel Agent"}
          </div>
          <span className="text-[13px] text-gray-400">
            {itinerary.viewCount >= 1000
              ? `${(itinerary.viewCount / 1000).toFixed(1)}k views`
              : `${itinerary.viewCount} views`}
          </span>
        </div>
      </div>
    </Link>
  );
}
