"use client";

import { useState } from "react";
import { Spot } from "@/types";
import DraggableRecommendedCard from "./DraggableRecommendedCard";

type FilterTab = "all" | "sightseeing" | "food" | "shopping" | "nature";

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "sightseeing", label: "Sightseeing" },
  { value: "food", label: "Food & Drink" },
  { value: "shopping", label: "Shopping" },
  { value: "nature", label: "Nature" },
];

const FILTER_MAP: Record<FilterTab, string[]> = {
  all: [],
  sightseeing: ["shrine", "temple", "museum", "landmark", "observation", "entertainment"],
  food: ["food", "restaurant", "market"],
  shopping: ["shopping"],
  nature: ["park", "nature", "onsen"],
};

interface RecommendedSpotsProps {
  spots: Spot[];
  onAddSpot: (spot: Spot) => void;
  usedSpotIds: string[];
}

export default function RecommendedSpots({ spots, onAddSpot, usedSpotIds }: RecommendedSpotsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const filteredSpots = spots.filter((spot) => {
    if (activeFilter !== "all" && !FILTER_MAP[activeFilter].includes(spot.category)) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-200 flex-shrink-0">
        <h3 className="text-sm font-bold text-gray-800 mb-1">Must Visit in Tokyo</h3>
        <p className="text-xs text-gray-400">Drag a card to the left panel, or click +</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 px-3 py-2.5 border-b border-gray-100 overflow-x-auto flex-shrink-0">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeFilter === tab.value
                ? "text-accent bg-accent-light font-semibold"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Spot cards */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredSpots.map((spot) => (
          <DraggableRecommendedCard
            key={spot.id}
            spot={spot}
            isAdded={usedSpotIds.includes(spot.id)}
            onAddSpot={onAddSpot}
          />
        ))}
      </div>
    </div>
  );
}
