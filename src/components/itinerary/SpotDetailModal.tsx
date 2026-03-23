"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Spot } from "@/types";

interface SpotDetailModalProps {
  spot: Spot | null;
  onClose: () => void;
}

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

export default function SpotDetailModal({ spot, onClose }: SpotDetailModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (spot) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [spot, onClose]);

  if (!spot) return null;

  const fee = spot.admissionFee != null && spot.admissionFee > 0
    ? `${spot.admissionFeeCurrency === "JPY" ? "¥" : "$"}${spot.admissionFee.toLocaleString()}`
    : "Free";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-52 bg-gray-100">
          {spot.photoUrls?.[0] ? (
            <Image
              src={spot.photoUrls[0]}
              alt={spot.nameEn}
              fill
              className="object-cover"
              sizes="(max-width: 448px) 100vw, 448px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-lg transition-colors"
          >
            ×
          </button>

          {/* Category badge */}
          <div className="absolute bottom-3 left-4">
            <span className="text-xs font-medium text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {CATEGORY_LABELS[spot.category] || spot.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto" style={{ maxHeight: "calc(85vh - 208px)" }}>
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 leading-tight">{spot.nameEn}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{spot.nameJa}</p>

          {/* Quick info pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
              <span>⏱</span>
              <span>~{spot.avgDurationMin} min</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
              <span>🎫</span>
              <span>{fee}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
              <span>📍</span>
              <span>{spot.area.charAt(0).toUpperCase() + spot.area.slice(1)}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mt-4">
            {spot.description}
          </p>

          {/* Address */}
          {spot.address && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-start gap-2">
                <span className="text-gray-400 text-sm mt-px">📍</span>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Address</p>
                  <p className="text-sm text-gray-700 mt-0.5">{spot.address}</p>
                </div>
              </div>
            </div>
          )}

          {/* Opening hours */}
          {spot.openingHours && Object.keys(spot.openingHours).length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-start gap-2">
                <span className="text-gray-400 text-sm mt-px">🕐</span>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Hours</p>
                  <div className="mt-1 space-y-0.5">
                    {Object.entries(spot.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between text-sm gap-4">
                        <span className="text-gray-500 capitalize">{day}</span>
                        <span className="text-gray-700">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Google Maps link */}
          <div className="mt-5">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${spot.lat},${spot.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-gray-200 hover:border-accent hover:text-accent text-sm font-medium text-gray-600 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
