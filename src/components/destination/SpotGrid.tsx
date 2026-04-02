"use client";

import { useState } from "react";
import Image from "next/image";
import { Spot } from "@/types";
import { formatAdmissionFee } from "@/lib/format";

type FilterTab =
  | "all"
  | "shrines-temples"
  | "museums"
  | "food-drink"
  | "parks-nature"
  | "shopping"
  | "entertainment"
  | "landmarks";

const FILTER_TABS: { value: FilterTab; label: string; categories: string[] }[] = [
  { value: "all", label: "All", categories: [] },
  { value: "shrines-temples", label: "Shrines & Temples", categories: ["shrine", "temple"] },
  { value: "museums", label: "Museums", categories: ["museum"] },
  { value: "food-drink", label: "Food & Drink", categories: ["food", "restaurant", "market"] },
  { value: "parks-nature", label: "Parks & Nature", categories: ["park", "nature", "onsen"] },
  { value: "shopping", label: "Shopping", categories: ["shopping"] },
  { value: "entertainment", label: "Entertainment", categories: ["entertainment"] },
  { value: "landmarks", label: "Landmarks & Observation", categories: ["landmark", "observation"] },
];

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

const CATEGORY_EMOJIS: Record<string, string> = {
  shrine: "\u26E9\uFE0F",
  temple: "\u26E9\uFE0F",
  museum: "\uD83C\uDFA8",
  park: "\uD83C\uDF33",
  observation: "\uD83C\uDF06",
  shopping: "\uD83D\uDECD\uFE0F",
  food: "\uD83C\uDF63",
  restaurant: "\uD83C\uDF5C",
  landmark: "\uD83D\uDCCD",
  onsen: "\u2668\uFE0F",
  nature: "\uD83C\uDFD4\uFE0F",
  entertainment: "\uD83C\uDFAE",
  market: "\uD83D\uDC1F",
};

interface SpotGridProps {
  spots: Spot[];
}

export default function SpotGrid({ spots }: SpotGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const activeCategories = FILTER_TABS.find((t) => t.value === activeFilter)?.categories ?? [];

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
        {FILTER_TABS.map((tab) => {
          const count =
            tab.value === "all"
              ? spots.length
              : spots.filter((s) => tab.categories.includes(s.category)).length;
          if (tab.value !== "all" && count === 0) return null;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === tab.value
                  ? "text-white bg-accent shadow-sm"
                  : "text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-700"
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-xs ${
                activeFilter === tab.value ? "text-white/70" : "text-gray-400"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Spot cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {spots.map((spot) => {
          const matches =
            activeFilter === "all" || activeCategories.includes(spot.category);
          const fee = formatAdmissionFee(spot.admissionFee, spot.admissionFeeCurrency);

          return (
            <article
              key={spot.id}
              className={`rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow bg-white ${
                matches ? "" : "hidden"
              }`}
            >
              {/* Photo */}
              <div className="relative h-44 bg-gray-100">
                {spot.photoUrls?.[0] ? (
                  <Image
                    src={spot.photoUrls[0]}
                    alt={spot.nameEn}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-gray-100 to-gray-50">
                    {CATEGORY_EMOJIS[spot.category] || "\uD83D\uDCCD"}
                  </div>
                )}
                {/* Category badge */}
                <span className="absolute top-3 left-3 text-xs font-medium text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {CATEGORY_LABELS[spot.category] || spot.category}
                </span>
                {/* Fee badge */}
                {fee && (
                  <span className="absolute top-3 right-3 text-xs font-medium text-gray-700 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {fee}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                  {spot.nameEn}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{spot.nameJa}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">
                  {spot.description}
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <span>\u23F1</span>
                    ~{spot.avgDurationMin} min
                  </span>
                  {spot.address && (
                    <span className="truncate flex items-center gap-1">
                      <span>\uD83D\uDCCD</span>
                      {spot.address.split(",").slice(-2).join(",").trim()}
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
