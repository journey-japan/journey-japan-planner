"use client";

import { useState } from "react";
import { Spot } from "@/types";

const CATEGORY_EMOJIS: Record<string, string> = {
  shrine: "⛩️",
  temple: "⛩️",
  museum: "🎨",
  park: "🌳",
  observation: "🌆",
  shopping: "🛍️",
  food: "🍣",
  restaurant: "🍜",
  landmark: "📍",
  onsen: "♨️",
  nature: "🏔️",
  entertainment: "🎮",
  market: "🐟",
};

interface SpotSearchPanelProps {
  spots: Spot[];
  isOpen: boolean;
  onClose: () => void;
  onAddSpot: (spot: Spot) => void;
  excludeSpotIds?: string[];
}

export default function SpotSearchPanel({
  spots,
  isOpen,
  onClose,
  onAddSpot,
  excludeSpotIds = [],
}: SpotSearchPanelProps) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filteredSpots = spots.filter(
    (spot) =>
      !excludeSpotIds.includes(spot.id) &&
      (query === "" ||
        spot.nameEn.toLowerCase().includes(query.toLowerCase()) ||
        spot.nameJa.includes(query) ||
        spot.category.includes(query.toLowerCase()))
  );

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-semibold">Add a Spot</span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ×
          </button>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2.5">
          <svg
            className="w-4 h-4 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Search spots in Tokyo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            className="flex gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => onAddSpot(spot)}
          >
            <div
              className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl"
              style={{ background: "var(--accent-light, #EEF5F0)" }}
            >
              {CATEGORY_EMOJIS[spot.category] || "📍"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold">{spot.nameEn}</div>
              <div className="text-xs text-gray-400">
                {spot.category.charAt(0).toUpperCase() + spot.category.slice(1)} ·{" "}
                {spot.nameJa} · ~{spot.avgDurationMin} min
              </div>
            </div>
            <div className="flex items-center text-accent text-xl font-light">
              +
            </div>
          </div>
        ))}
        {filteredSpots.length === 0 && (
          <div className="text-center text-sm text-gray-400 py-10">
            No spots found. Try a different search term.
          </div>
        )}
      </div>
    </div>
  );
}
