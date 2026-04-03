"use client";

import { useState, useMemo, useEffect } from "react";
import { Spot } from "@/types";
import { useAuth } from "@/lib/auth-context";
import { getUserFavoriteSpotIds } from "@/lib/db";
import DraggableRecommendedCard from "./DraggableRecommendedCard";

type FilterTab = "popular" | "favorites" | "all" | "shrines-temples" | "museums" | "food" | "shopping" | "entertainment" | "nature" | "landmarks";

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: "popular", label: "Popular" },
  { value: "favorites", label: "Favorites" },
  { value: "all", label: "All" },
  { value: "shrines-temples", label: "Shrines & Temples" },
  { value: "museums", label: "Museums" },
  { value: "food", label: "Food & Drink" },
  { value: "shopping", label: "Shopping" },
  { value: "entertainment", label: "Entertainment" },
  { value: "nature", label: "Parks & Nature" },
  { value: "landmarks", label: "Landmarks" },
];

const FILTER_MAP: Record<FilterTab, string[]> = {
  popular: [],
  favorites: [],
  all: [],
  "shrines-temples": ["shrine", "temple"],
  museums: ["museum"],
  food: ["food", "restaurant", "market"],
  shopping: ["shopping"],
  entertainment: ["entertainment"],
  nature: ["park", "nature", "onsen"],
  landmarks: ["landmark", "observation"],
};

// --- Fuzzy search ---
function fuzzyScore(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  // Exact substring match → highest score
  if (t.includes(q)) return 100;

  // Word-start match (e.g., "mei" matches "Meiji")
  const words = t.split(/[\s\-,()·]+/);
  for (const word of words) {
    if (word.startsWith(q)) return 90;
  }

  // Fuzzy: check if all query chars appear in order in text
  let qi = 0;
  let consecutiveBonus = 0;
  let score = 0;
  let lastMatchIndex = -2;

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      score += 10;
      // Bonus for consecutive matches
      if (ti === lastMatchIndex + 1) {
        consecutiveBonus += 5;
      }
      // Bonus for matching at word start
      if (ti === 0 || /[\s\-,()]/.test(t[ti - 1])) {
        score += 8;
      }
      lastMatchIndex = ti;
      qi++;
    }
  }

  // All query chars must be found
  if (qi < q.length) return 0;

  return Math.min(score + consecutiveBonus, 89);
}

function fuzzyMatch(query: string, spot: Spot): number {
  if (!query) return 100; // No query = show all

  const scores = [
    fuzzyScore(query, spot.nameEn) * 1.2,       // English name (highest priority)
    fuzzyScore(query, spot.nameJa) * 1.1,        // Japanese name
    fuzzyScore(query, spot.category) * 0.8,      // Category
    fuzzyScore(query, spot.description) * 0.5,   // Description
    fuzzyScore(query, spot.address) * 0.4,       // Address
  ];

  return Math.max(...scores);
}

interface RecommendedSpotsProps {
  spots: Spot[];
  onAddSpot: (spot: Spot) => void;
  usedSpotIds: string[];
}

export default function RecommendedSpots({ spots, onAddSpot, usedSpotIds }: RecommendedSpotsProps) {
  const { user } = useAuth();
  const hasFeatured = spots.some((s) => s.isFeatured);
  const [activeFilter, setActiveFilter] = useState<FilterTab>(hasFeatured ? "popular" : "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) {
      getUserFavoriteSpotIds(user.id).then((ids) => setFavoriteIds(new Set(ids)));
    }
  }, [user]);

  const hasFavorites = favoriteIds.size > 0;

  const filteredSpots = useMemo(() => {
    let result = spots;

    // Category filter
    if (activeFilter === "popular") {
      result = result.filter((spot) => spot.isFeatured);
    } else if (activeFilter === "favorites") {
      result = result.filter((spot) => favoriteIds.has(spot.id));
    } else if (activeFilter !== "all") {
      result = result.filter((spot) => FILTER_MAP[activeFilter].includes(spot.category));
    }

    // Fuzzy search
    if (searchQuery.trim()) {
      const scored = result
        .map((spot) => ({ spot, score: fuzzyMatch(searchQuery.trim(), spot) }))
        .filter(({ score }) => score > 15)
        .sort((a, b) => b.score - a.score);
      result = scored.map(({ spot }) => spot);
    }

    return result;
  }, [spots, activeFilter, searchQuery]);

  return (
    <div className="bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-gray-800">
            {activeFilter === "popular" ? "Popular Spots" : "Recommended Spots"}
          </h3>
          <span className="text-[11px] text-gray-400">{filteredSpots.length} spots</span>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <svg
            className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="flex-1 bg-transparent outline-none text-xs text-gray-700 placeholder-gray-400"
            placeholder="Search spots... (e.g. temple, ramen, shibuya)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-gray-400 hover:text-gray-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 px-3 py-2.5 border-b border-gray-100 overflow-x-auto flex-shrink-0">
        {FILTER_TABS.map((tab) => {
          if (tab.value === "popular" && !hasFeatured) return null;
          if (tab.value === "favorites" && !hasFavorites) return null;
          return (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeFilter === tab.value
                ? tab.value === "popular"
                  ? "text-amber-700 bg-amber-50 font-semibold"
                  : tab.value === "favorites"
                  ? "text-red-600 bg-red-50 font-semibold"
                  : "text-accent bg-accent-light font-semibold"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.value === "popular" ? "★ Popular" : tab.value === "favorites" ? "♥ Favorites" : tab.label}
          </button>
          );
        })}
      </div>

      {/* Spot cards */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredSpots.length > 0 ? (
          filteredSpots.map((spot) => (
            <DraggableRecommendedCard
              key={spot.id}
              spot={spot}
              isAdded={usedSpotIds.includes(spot.id)}
              onAddSpot={onAddSpot}
              isFavorited={favoriteIds.has(spot.id)}
              onFavoriteToggle={(spotId, isFav) => {
                setFavoriteIds((prev) => {
                  const next = new Set(prev);
                  isFav ? next.add(spotId) : next.delete(spotId);
                  return next;
                });
              }}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-sm text-gray-400 mb-1">No spots found</p>
            <p className="text-xs text-gray-300">Try a different keyword</p>
          </div>
        )}
      </div>
    </div>
  );
}
