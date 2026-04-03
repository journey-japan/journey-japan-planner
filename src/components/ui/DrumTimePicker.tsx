"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface DrumColumnProps {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  itemHeight: number;
}

function DrumColumn({ items, selectedIndex, onSelect, itemHeight }: DrumColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      top: index * itemHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  }, [itemHeight]);

  useEffect(() => {
    scrollToIndex(selectedIndex, false);
  }, [selectedIndex, scrollToIndex]);

  function handleScroll() {
    if (!containerRef.current) return;
    isScrollingRef.current = true;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight);
      const clamped = Math.max(0, Math.min(items.length - 1, index));
      scrollToIndex(clamped);
      onSelect(clamped);
      isScrollingRef.current = false;
    }, 80);
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="relative overflow-y-auto scrollbar-hide"
      style={{
        height: itemHeight * 5,
        scrollSnapType: "y mandatory",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Padding top/bottom to center selected item */}
      <div style={{ height: itemHeight * 2 }} />
      {items.map((item, i) => (
        <div
          key={i}
          onClick={() => {
            onSelect(i);
            scrollToIndex(i);
          }}
          className={`flex items-center justify-center cursor-pointer transition-all select-none ${
            i === selectedIndex
              ? "text-gray-900 font-bold text-base"
              : "text-gray-300 text-sm"
          }`}
          style={{
            height: itemHeight,
            scrollSnapAlign: "center",
          }}
        >
          {item}
        </div>
      ))}
      <div style={{ height: itemHeight * 2 }} />
    </div>
  );
}

interface DrumTimePickerProps {
  value: string; // "HH:MM" or ""
  onChange: (value: string) => void;
  label?: string;
}

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));

export default function DrumTimePicker({ value, onChange, label }: DrumTimePickerProps) {
  const [hour, minute] = value
    ? [value.split(":")[0], value.split(":")[1]]
    : ["09", "00"];

  const hourIndex = HOURS.indexOf(hour) >= 0 ? HOURS.indexOf(hour) : 9;
  const minuteIndex = MINUTES.indexOf(minute) >= 0 ? MINUTES.indexOf(minute) : 0;

  const ITEM_HEIGHT = 36;

  function handleHourSelect(index: number) {
    onChange(`${HOURS[index]}:${MINUTES[minuteIndex]}`);
  }

  function handleMinuteSelect(index: number) {
    onChange(`${HOURS[hourIndex]}:${MINUTES[index]}`);
  }

  return (
    <div className="flex flex-col items-center">
      {label && (
        <span className="text-[10px] text-gray-400 mb-1">{label}</span>
      )}
      <div className="relative flex items-center bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
        {/* Selection highlight */}
        <div
          className="absolute left-0 right-0 bg-blue-100/50 rounded-lg pointer-events-none"
          style={{ top: ITEM_HEIGHT * 2, height: ITEM_HEIGHT }}
        />
        <DrumColumn
          items={HOURS}
          selectedIndex={hourIndex}
          onSelect={handleHourSelect}
          itemHeight={ITEM_HEIGHT}
        />
        <span className="text-gray-400 font-bold text-sm px-0.5 z-10">:</span>
        <DrumColumn
          items={MINUTES}
          selectedIndex={minuteIndex}
          onSelect={handleMinuteSelect}
          itemHeight={ITEM_HEIGHT}
        />
      </div>
    </div>
  );
}
