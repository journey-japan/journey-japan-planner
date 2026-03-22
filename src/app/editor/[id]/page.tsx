"use client";

import { useState, useCallback, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Link from "next/link";
import { ItineraryItem, ItineraryDay, Spot } from "@/types";
import { SAMPLE_ITINERARIES, SAMPLE_SPOTS } from "@/lib/sample-data";
import { getSpots } from "@/lib/db";
import SortableSpotCard from "@/components/itinerary/SortableSpotCard";
import SpotSearchPanel from "@/components/itinerary/SpotSearchPanel";
import RecommendedSpots from "@/components/itinerary/RecommendedSpots";
import GoogleMap from "@/components/map/GoogleMap";
import { useAuth } from "@/lib/auth-context";

// Droppable wrapper for the itinerary list
function ItineraryDropZone({ children, isOver }: { children: React.ReactNode; isOver: boolean }) {
  const { setNodeRef } = useDroppable({ id: "itinerary-drop-zone" });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 overflow-y-auto p-4 transition-colors ${
        isOver ? "bg-accent-light/50" : ""
      }`}
    >
      {children}
      {isOver && (
        <div className="border-2 border-dashed border-accent rounded-lg p-4 text-center text-sm text-accent font-medium bg-accent-light/30 mt-2 animate-pulse">
          Drop here to add to itinerary
        </div>
      )}
    </div>
  );
}

export default function EditorPage() {
  const { user } = useAuth();
  const itinerary = SAMPLE_ITINERARIES[0];
  const [days, setDays] = useState<ItineraryDay[]>(
    itinerary.days.filter((d) => d.items.length > 0)
  );
  const [activeDay, setActiveDay] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [title, setTitle] = useState(itinerary.title);
  const [draggingSpot, setDraggingSpot] = useState<Spot | null>(null);
  const [isOverItinerary, setIsOverItinerary] = useState(false);
  const [spots, setSpots] = useState<Spot[]>(SAMPLE_SPOTS);

  // Fetch spots from DB on mount, fall back to sample data
  useEffect(() => {
    getSpots("tokyo").then((dbSpots) => {
      if (dbSpots.length > 0) {
        setSpots(dbSpots);
      }
    });
  }, []);

  const currentDay = days[activeDay];
  const items = currentDay?.items || [];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start — track what's being dragged
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    if (String(active.id).startsWith("rec-")) {
      const spot = active.data?.current?.spot as Spot | undefined;
      if (spot) setDraggingSpot(spot);
    }
  }, []);

  // Handle drag over — show drop indicator
  const handleDragOver = useCallback((event: { over: { id: string | number } | null }) => {
    if (!event.over) {
      setIsOverItinerary(false);
      return;
    }
    const overId = String(event.over.id);
    // Over the drop zone or over an existing itinerary item
    const isOverItin =
      overId === "itinerary-drop-zone" ||
      items.some((i) => i.id === overId);
    setIsOverItinerary(isOverItin);
  }, [items]);

  // Handle drag end
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setDraggingSpot(null);
      setIsOverItinerary(false);

      if (!over) return;

      const activeId = String(active.id);
      const overId = String(over.id);

      // Case 1: Dropping a recommended spot into the itinerary
      if (activeId.startsWith("rec-")) {
        const spot = active.data?.current?.spot as Spot | undefined;
        if (!spot) return;

        // Determine insert position
        const overItemIndex = items.findIndex((i) => i.id === overId);
        const insertIndex = overItemIndex >= 0 ? overItemIndex + 1 : items.length;

        const newItem: ItineraryItem = {
          id: `new-${Date.now()}`,
          dayId: currentDay.id,
          spotId: spot.id,
          spot,
          orderIndex: insertIndex,
          durationMinutes: spot.avgDurationMin,
        };

        setDays((prev) => {
          const newDays = [...prev];
          const dayItems = [...newDays[activeDay].items];
          dayItems.splice(insertIndex, 0, newItem);
          newDays[activeDay] = {
            ...newDays[activeDay],
            items: dayItems.map((item, idx) => ({ ...item, orderIndex: idx })),
          };
          return newDays;
        });
        return;
      }

      // Case 2: Reordering within the itinerary
      if (activeId === overId) return;

      setDays((prev) => {
        const newDays = [...prev];
        const day = { ...newDays[activeDay] };
        const oldIndex = day.items.findIndex((i) => i.id === activeId);
        const newIndex = day.items.findIndex((i) => i.id === overId);
        if (oldIndex === -1 || newIndex === -1) return prev;
        day.items = arrayMove(day.items, oldIndex, newIndex).map(
          (item, idx) => ({ ...item, orderIndex: idx })
        );
        newDays[activeDay] = day;
        return newDays;
      });
    },
    [activeDay, currentDay, items]
  );

  // Add spot via button click
  const handleAddSpot = useCallback(
    (spot: Spot) => {
      const newItem: ItineraryItem = {
        id: `new-${Date.now()}`,
        dayId: currentDay.id,
        spotId: spot.id,
        spot,
        orderIndex: items.length,
        durationMinutes: spot.avgDurationMin,
      };
      setDays((prev) => {
        const newDays = [...prev];
        newDays[activeDay] = {
          ...newDays[activeDay],
          items: [...newDays[activeDay].items, newItem],
        };
        return newDays;
      });
      setIsSearchOpen(false);
    },
    [activeDay, currentDay, items.length]
  );

  // Remove spot from itinerary
  const handleRemoveSpot = useCallback(
    (itemId: string) => {
      setDays((prev) => {
        const newDays = [...prev];
        const dayItems = newDays[activeDay].items.filter((i) => i.id !== itemId);
        newDays[activeDay] = {
          ...newDays[activeDay],
          items: dayItems.map((item, idx) => ({ ...item, orderIndex: idx })),
        };
        return newDays;
      });
    },
    [activeDay]
  );

  const usedSpotIds = items.map((i) => i.spotId);

  // Custom collision detection: prefer itinerary items and drop zone
  const collisionDetection = useCallback(
    (args: Parameters<typeof closestCenter>[0]) => {
      // First check if pointer is within any droppable
      const pointerCollisions = pointerWithin(args);
      if (pointerCollisions.length > 0) return pointerCollisions;
      // Fall back to rect intersection
      return rectIntersection(args);
    },
    []
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col overflow-hidden">
        {/* ===== EDITOR HEADER ===== */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 flex-shrink-0">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-gray-100 transition-all"
            >
              ← Back
            </Link>
            <input
              className="text-base font-semibold border-none outline-none bg-transparent hover:bg-gray-100 focus:bg-gray-100 px-2 py-1 rounded-md min-w-[280px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded">
              Draft
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="text-sm text-gray-500 hover:text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-all">
              Preview
            </button>
            <button className="text-sm text-gray-600 border border-gray-300 hover:border-gray-400 px-4 py-1.5 rounded-lg transition-all">
              Share Link
            </button>
            <button className="text-sm text-white bg-accent hover:bg-accent-hover px-5 py-1.5 rounded-lg transition-colors">
              Publish
            </button>
          </div>
        </div>

        {/* ===== MAIN LAYOUT (3 columns) ===== */}
        <div className="flex-1 grid grid-cols-[340px_400px_1fr] overflow-hidden">
          {/* SIDEBAR — Itinerary */}
          <div className="bg-white border-r border-gray-200 flex flex-col overflow-hidden relative">
            {/* Trip info bar */}
            <div className="px-5 py-3 border-b border-gray-200 flex items-center gap-3 text-[13px] text-gray-500 flex-shrink-0">
              <span>📍 Tokyo</span>
              <span>📅 {days.length} days</span>
              <span>🏷️ Culture, Food</span>
            </div>

            {/* Day tabs */}
            <div className="flex gap-1 px-5 py-3 border-b border-gray-100 overflow-x-auto flex-shrink-0">
              {days.map((day, i) => (
                <button
                  key={day.id}
                  onClick={() => setActiveDay(i)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                    i === activeDay
                      ? "text-accent bg-accent-light font-semibold"
                      : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Day {day.dayNumber}
                </button>
              ))}
              <button className="flex-shrink-0 text-gray-300 hover:text-gray-500 text-base px-2">
                +
              </button>
            </div>

            {/* Spot list (droppable + scrollable) */}
            <ItineraryDropZone isOver={isOverItinerary && !!draggingSpot}>
              {currentDay && (
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-700">
                      Day {currentDay.dayNumber}
                      {currentDay.title && ` — ${currentDay.title}`}
                    </h3>
                    {currentDay.date && (
                      <span className="text-xs text-gray-400">
                        {currentDay.date}
                      </span>
                    )}
                  </div>

                  <SortableContext
                    items={items.map((i) => i.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {items.map((item, index) => (
                      <SortableSpotCard
                        key={item.id}
                        item={item}
                        index={index}
                        onRemove={handleRemoveSpot}
                      />
                    ))}
                  </SortableContext>

                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm font-medium hover:border-accent hover:text-accent hover:bg-accent-light transition-all mt-2"
                  >
                    + Add a spot
                  </button>
                </div>
              )}
            </ItineraryDropZone>

            {/* Search panel overlay */}
            <SpotSearchPanel
              spots={spots}
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onAddSpot={handleAddSpot}
              excludeSpotIds={usedSpotIds}
            />
          </div>

          {/* RECOMMENDED SPOTS (center column) */}
          <RecommendedSpots spots={spots} onAddSpot={handleAddSpot} usedSpotIds={usedSpotIds} />

          {/* MAP AREA (right column) */}
          {user ? (
            <GoogleMap items={items} />
          ) : (
            <div className="relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 40%, #d4e4d8 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, #c8d8cc 0%, transparent 50%), linear-gradient(135deg, #e4ece6 0%, #d8e4dc 100%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg p-8 max-w-xs text-center">
                  <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Log in to see your spots on an interactive Google Map
                  </p>
                  <button
                    onClick={() => {
                      // Trigger login modal via a custom event
                      window.dispatchEvent(new CustomEvent("open-login-modal"));
                    }}
                    className="w-full py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
                  >
                    Log in to unlock
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drag overlay — shows a floating preview of the dragged recommended card */}
      <DragOverlay dropAnimation={null}>
        {draggingSpot && (
          <div className="w-64 bg-white border-2 border-accent rounded-lg shadow-xl p-3 opacity-90 rotate-2">
            <div className="text-sm font-semibold">{draggingSpot.nameEn}</div>
            <div className="text-xs text-gray-400 mt-0.5">{draggingSpot.nameJa}</div>
            <div className="text-xs text-gray-500 mt-1">
              {draggingSpot.category.charAt(0).toUpperCase() + draggingSpot.category.slice(1)} · ~{draggingSpot.avgDurationMin} min
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
