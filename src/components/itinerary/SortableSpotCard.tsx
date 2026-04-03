"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { ItineraryItem, Spot } from "@/types";

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
  onSpotClick?: (spot: Spot) => void;
  onNoteChange?: (itemId: string, note: string) => void;
  onStartTimeChange?: (itemId: string, startTime: string) => void;
}

export default function SortableSpotCard({ item, index, onRemove, onSpotClick, onNoteChange, onStartTimeChange }: SortableSpotCardProps) {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(item.note || "");
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [timeText, setTimeText] = useState(item.startTime || "");
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

        {/* Thumbnail + Number badge (click to view details) */}
        <div
          className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 cursor-pointer ring-0 hover:ring-2 hover:ring-accent/40 transition-all"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onSpotClick?.(item.spot);
          }}
        >
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
          <div
            className="text-sm font-semibold leading-tight cursor-pointer hover:text-accent transition-colors"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onSpotClick?.(item.spot);
            }}
          >
            {item.spot.nameEn}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            {item.spot.category.charAt(0).toUpperCase() + item.spot.category.slice(1)} · ~{item.spot.avgDurationMin} min
          </div>
          <div
            className="inline-flex items-center gap-1.5 mt-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded cursor-pointer hover:bg-gray-200 transition-colors"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingTime(true);
            }}
          >
            <span>🕐</span>
            {item.startTime ? (
              <span>{item.startTime}</span>
            ) : (
              <span className="text-gray-400">Set time</span>
            )}
          </div>
        </div>

        {/* Action buttons (visible on hover) */}
        <div className="flex flex-col justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className={`w-7 h-7 rounded-md flex items-center justify-center text-sm transition-colors ${
              item.note || isEditingNote
                ? "bg-amber-50 text-amber-500 hover:bg-amber-100"
                : "bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600"
            }`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingNote(!isEditingNote);
            }}
            title="Add a note"
          >
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

      {/* Note display / edit */}
      {(item.note && !isEditingNote) && (
        <div
          className="ml-[70px] -mt-1 mb-2 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-lg cursor-pointer hover:bg-amber-100/60 transition-colors"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setIsEditingNote(true);
          }}
        >
          <p className="text-xs text-amber-700 leading-relaxed">{item.note}</p>
        </div>
      )}

      {isEditingNote && (
        <div
          className="ml-[70px] -mt-1 mb-2"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <textarea
            autoFocus
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add a note... (e.g. Try the cotton candy!)"
            className="w-full text-xs text-gray-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 resize-none outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-200 placeholder:text-amber-300"
            rows={2}
          />
          <div className="flex justify-end gap-1.5 mt-1">
            <button
              className="text-[11px] text-gray-400 hover:text-gray-600 px-2.5 py-1 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => {
                setNoteText(item.note || "");
                setIsEditingNote(false);
              }}
            >
              Cancel
            </button>
            <button
              className="text-[11px] text-white bg-accent hover:bg-accent-hover px-2.5 py-1 rounded-md transition-colors"
              onClick={() => {
                onNoteChange?.(item.id, noteText.trim());
                setIsEditingNote(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Time edit */}
      {isEditingTime && (
        <div
          className="ml-[70px] -mt-1 mb-2"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <input
              autoFocus
              type="time"
              value={timeText}
              onChange={(e) => setTimeText(e.target.value)}
              className="text-xs text-gray-700 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-200"
            />
            <button
              className="text-[11px] text-gray-400 hover:text-gray-600 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => {
                setTimeText(item.startTime || "");
                setIsEditingTime(false);
              }}
            >
              Cancel
            </button>
            <button
              className="text-[11px] text-white bg-accent hover:bg-accent-hover px-2 py-1 rounded-md transition-colors"
              onClick={() => {
                onStartTimeChange?.(item.id, timeText);
                setIsEditingTime(false);
              }}
            >
              Set
            </button>
            {item.startTime && (
              <button
                className="text-[11px] text-red-400 hover:text-red-600 px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                onClick={() => {
                  setTimeText("");
                  onStartTimeChange?.(item.id, "");
                  setIsEditingTime(false);
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

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
