"use client";

import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
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

interface DraggableRecommendedCardProps {
  spot: Spot;
  isAdded: boolean;
  onAddSpot: (spot: Spot) => void;
}

export default function DraggableRecommendedCard({
  spot,
  isAdded,
  onAddSpot,
}: DraggableRecommendedCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `rec-${spot.id}`,
    data: { type: "recommended", spot },
    disabled: isAdded,
  });

  const [photoIndex, setPhotoIndex] = useState(0);
  const hasPhotos = spot.photoUrls && spot.photoUrls.length > 0;
  const hasMultiplePhotos = hasPhotos && spot.photoUrls.length > 1;

  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg border mb-2.5 overflow-hidden transition-all ${
        isDragging
          ? "border-accent bg-accent-light opacity-50 shadow-lg"
          : isAdded
          ? "border-gray-100 opacity-50"
          : "border-gray-200 hover:border-accent hover:shadow-sm cursor-grab active:cursor-grabbing"
      }`}
      {...(isAdded ? {} : { ...attributes, ...listeners })}
    >
      {/* Image carousel */}
      <div className="h-24 bg-gray-100 relative overflow-hidden group">
        {hasPhotos ? (
          <img
            src={spot.photoUrls[photoIndex]}
            alt={`${spot.nameEn} ${photoIndex + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-gray-100 to-gray-50">
            {CATEGORY_EMOJIS[spot.category] || "📍"}
          </div>
        )}

        {/* Carousel arrows (visible on hover, only if multiple photos) */}
        {hasMultiplePhotos && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setPhotoIndex((prev) => (prev === 0 ? spot.photoUrls.length - 1 : prev - 1));
              }}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/40 text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setPhotoIndex((prev) => (prev === spot.photoUrls.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/40 text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            >
              ›
            </button>
            {/* Dot indicators */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
              {spot.photoUrls.map((_, i) => (
                <span
                  key={i}
                  className={`w-1 h-1 rounded-full transition-colors ${
                    i === photoIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {spot.admissionFee && (
          <span className="absolute top-2 right-2 text-[10px] font-medium text-gray-500 bg-white/90 px-1.5 py-0.5 rounded">
            {spot.admissionFee}
          </span>
        )}
        {!isAdded && (
          <div className="absolute bottom-2 right-2 bg-accent/80 text-white text-[10px] font-medium px-2 py-0.5 rounded">
            Drag to add →
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[13px] font-semibold leading-tight">
              {spot.nameEn}
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              {spot.nameJa}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isAdded) onAddSpot(spot);
            }}
            disabled={isAdded}
            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              isAdded
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-accent-light text-accent hover:bg-accent hover:text-white cursor-pointer"
            }`}
            title={isAdded ? "Already in itinerary" : "Add to itinerary"}
          >
            {isAdded ? "✓" : "+"}
          </button>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
            {spot.category.charAt(0).toUpperCase() + spot.category.slice(1)}
          </span>
          <span className="text-[11px] text-gray-400">
            ~{spot.avgDurationMin} min
          </span>
        </div>

        <p className="text-[11px] text-gray-500 mt-2 leading-relaxed line-clamp-2">
          {spot.description}
        </p>
      </div>
    </div>
  );
}
