"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { ItineraryItem } from "@/types";

const TRANSPORT_ICONS: Record<string, string> = {
  walk: "🚶",
  train: "🚃",
  bus: "🚌",
  taxi: "🚕",
  car: "🚗",
};

interface SortableSpotCardProps {
  item: ItineraryItem;
  index: number;
  onRemove?: (itemId: string) => void;
}

export default function SortableSpotCard({ item, index, onRemove }: SortableSpotCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`flex gap-3 p-3 border rounded-lg mb-2 bg-white cursor-grab active:cursor-grabbing transition-all group ${
          isDragging
            ? "border-accent bg-accent-light opacity-50 shadow-lg"
            : "border-gray-200 hover:border-accent hover:shadow-sm"
        }`}
        {...attributes}
        {...listeners}
      >
        {/* Drag handle */}
        <div className="flex flex-col justify-center text-gray-300 text-sm select-none">
          ⠿
        </div>

        {/* Thumbnail + Number badge */}
        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          {item.spot.photoUrls?.[0] ? (
            <Image
              src={item.spot.photoUrls[0]}
              alt={item.spot.nameEn}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">
              📍
            </div>
          )}
          <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
            {index + 1}
          </div>
        </div>

        {/* Spot info */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold leading-tight">{item.spot.nameEn}</div>
          <div className="text-xs text-gray-400 mt-0.5">
            {item.spot.category.charAt(0).toUpperCase() + item.spot.category.slice(1)} ·{" "}
            {item.spot.area.charAt(0).toUpperCase() + item.spot.area.slice(1)}
          </div>
          {item.startTime && (
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded inline-block mt-1">
              {item.startTime} — {item.durationMinutes} min
            </div>
          )}
        </div>

        {/* Action buttons (visible on hover) */}
        <div className="flex flex-col justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 flex items-center justify-center text-sm">
            ✎
          </button>
          <button
            className="w-7 h-7 rounded-md bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 flex items-center justify-center text-sm"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.(item.id);
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Transport line to next spot */}
      {item.transportToNext && (
        <div className="flex items-center gap-2 py-1 pl-11 mb-2 text-xs text-gray-400">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded whitespace-nowrap">
            {TRANSPORT_ICONS[item.transportToNext.mode] || "→"}
            {" "}
            {item.transportToNext.detail || item.transportToNext.mode}
            {" · "}
            {item.transportToNext.durationMinutes} min
          </div>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      )}
    </>
  );
}
