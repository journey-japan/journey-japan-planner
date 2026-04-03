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
import { useParams, useRouter } from "next/navigation";
import { ItineraryItem, ItineraryDay, Spot, Area, AREAS } from "@/types";
import { SAMPLE_ITINERARIES, SAMPLE_SPOTS } from "@/lib/sample-data";
import { getSpots, getItineraryWithDetails, publishItinerary, updateItinerary } from "@/lib/db";
import SortableSpotCard from "@/components/itinerary/SortableSpotCard";
import SpotSearchPanel from "@/components/itinerary/SpotSearchPanel";
import RecommendedSpots from "@/components/itinerary/RecommendedSpots";
import GoogleMap from "@/components/map/GoogleMap";
import SpotDetailModal from "@/components/itinerary/SpotDetailModal";
import LoginModal from "@/components/auth/LoginModal";
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

// Default empty day for new itineraries
function createEmptyDay(dayNumber: number): ItineraryDay {
  return {
    id: `new-day-${dayNumber}-${Date.now()}`,
    itineraryId: "",
    dayNumber,
    items: [],
  };
}

export default function EditorPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const urlId = params.id as string; // "new" or existing itinerary UUID

  const isNewItinerary = urlId === "new";
  const isExistingItinerary = !isNewItinerary;

  // Core state
  const [title, setTitle] = useState(isNewItinerary ? "My Japan Trip" : "");
  const [description, setDescription] = useState(isNewItinerary ? "" : "");
  const [area, setArea] = useState<Area>("tokyo");
  const [tags, setTags] = useState<string[]>([]);
  const [days, setDays] = useState<ItineraryDay[]>(
    isNewItinerary ? [createEmptyDay(1)] : []
  );
  const [existingItineraryId, setExistingItineraryId] = useState<string | null>(
    isExistingItinerary ? urlId : null
  );

  // UI state
  const [activeDay, setActiveDay] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [draggingSpot, setDraggingSpot] = useState<Spot | null>(null);
  const [isOverItinerary, setIsOverItinerary] = useState(false);
  const [spots, setSpots] = useState<Spot[]>(SAMPLE_SPOTS);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loadingItinerary, setLoadingItinerary] = useState(isExistingItinerary);
  const [detailSpot, setDetailSpot] = useState<Spot | null>(null);
  const [mobileTab, setMobileTab] = useState<"itinerary" | "spots" | "map">("itinerary");

  // Load existing itinerary from DB when editing
  useEffect(() => {
    if (!isExistingItinerary) return;

    setLoadingItinerary(true);
    getItineraryWithDetails(urlId).then((itinerary) => {
      if (itinerary) {
        setTitle(itinerary.title);
        setDescription(itinerary.description);
        setArea(itinerary.area);
        setTags(itinerary.tags);
        setExistingItineraryId(itinerary.id);

        if (itinerary.days.length > 0) {
          setDays(itinerary.days);
        } else {
          setDays([createEmptyDay(1)]);
        }
      } else {
        // Itinerary not found — redirect to new editor
        router.replace("/editor/new");
      }
      setLoadingItinerary(false);
    });
  }, [urlId, isExistingItinerary, router]);

  // Fetch spots from DB on mount, fall back to sample data
  useEffect(() => {
    getSpots(area).then((dbSpots) => {
      if (dbSpots.length > 0) {
        setSpots(dbSpots);
      }
    });
  }, [area]);

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

  // Update note on a spot
  const handleNoteChange = useCallback(
    (itemId: string, note: string) => {
      setDays((prev) => {
        const newDays = [...prev];
        newDays[activeDay] = {
          ...newDays[activeDay],
          items: newDays[activeDay].items.map((item) =>
            item.id === itemId ? { ...item, note: note || undefined } : item
          ),
        };
        return newDays;
      });
    },
    [activeDay]
  );

  // Update start/end time on a spot
  const handleTimeChange = useCallback(
    (itemId: string, startTime: string, endTime: string) => {
      setDays((prev) => {
        const newDays = [...prev];
        newDays[activeDay] = {
          ...newDays[activeDay],
          items: newDays[activeDay].items.map((item) =>
            item.id === itemId
              ? { ...item, startTime: startTime || undefined, endTime: endTime || undefined }
              : item
          ),
        };
        return newDays;
      });
    },
    [activeDay]
  );

  // Clear all spots from current day
  const handleClearAll = useCallback(() => {
    setDays((prev) => {
      const newDays = [...prev];
      newDays[activeDay] = {
        ...newDays[activeDay],
        items: [],
      };
      return newDays;
    });
  }, [activeDay]);

  // Add a new day
  const handleAddDay = useCallback(() => {
    setDays((prev) => {
      const newDayNumber = prev.length + 1;
      return [...prev, createEmptyDay(newDayNumber)];
    });
  }, []);

  // Publish or Update itinerary
  const handlePublish = useCallback(async () => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }

    const totalSpots = days.reduce((sum, d) => sum + d.items.length, 0);
    if (totalSpots === 0) {
      alert("Add at least one spot before publishing.");
      return;
    }

    setIsPublishing(true);

    let result: { id: string } | { error: string };

    if (existingItineraryId) {
      // Update existing itinerary
      result = await updateItinerary({
        itineraryId: existingItineraryId,
        userId: user.id,
        title,
        description,
        area,
        days,
        tags,
      });
    } else {
      // Create new itinerary
      result = await publishItinerary({
        userId: user.id,
        title,
        description,
        area,
        days,
        tags,
      });
    }

    setIsPublishing(false);

    if ("error" in result) {
      alert("Failed to publish: " + result.error);
      return;
    }

    setExistingItineraryId(result.id);
    router.push(`/itineraries/${result.id}`);
  }, [user, title, description, area, days, tags, existingItineraryId, router]);

  // Copy share link
  const handleShareLink = useCallback(() => {
    if (existingItineraryId) {
      navigator.clipboard.writeText(
        `https://plan.journeyjpn.com/itineraries/${existingItineraryId}`
      );
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  }, [existingItineraryId]);

  const usedSpotIds = items.map((i) => i.spotId);

  // Custom collision detection: prefer itinerary items and drop zone
  const collisionDetection = useCallback(
    (args: Parameters<typeof closestCenter>[0]) => {
      const pointerCollisions = pointerWithin(args);
      if (pointerCollisions.length > 0) return pointerCollisions;
      return rectIntersection(args);
    },
    []
  );

  // Get area label for display
  const areaLabel = AREAS.find((a) => a.value === area)?.label || area;

  // Loading state for existing itinerary
  if (loadingItinerary) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading itinerary...</p>
        </div>
      </div>
    );
  }

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
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-3 md:px-5 flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-all flex-shrink-0"
            >
              ←<span className="hidden sm:inline ml-1">Back</span>
            </Link>
            <input
              className="text-sm md:text-base font-semibold border-none outline-none bg-transparent hover:bg-gray-100 focus:bg-gray-100 px-2 py-1 rounded-md min-w-0 flex-1 md:max-w-[280px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 hidden sm:inline ${existingItineraryId ? "text-accent bg-accent-light font-medium" : "text-gray-400 bg-gray-100"}`}>
              {existingItineraryId ? "Published" : "Draft"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2.5 relative flex-shrink-0">
            <button className="text-sm text-gray-500 hover:text-gray-700 px-3 md:px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-all hidden md:block">
              Preview
            </button>
            <button
              onClick={handleShareLink}
              className="text-gray-600 border border-gray-300 hover:border-gray-400 p-2 md:px-4 md:py-1.5 rounded-lg transition-all"
              title="Share Link"
            >
              <svg className="w-4 h-4 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              <span className="hidden md:inline text-sm">Share Link</span>
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="text-sm text-white bg-accent hover:bg-accent-hover px-3 md:px-5 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPublishing
                ? "..."
                : existingItineraryId
                ? <><span className="hidden md:inline">Save Changes</span><span className="md:hidden">Save</span></>
                : "Save"}
            </button>
            {showShareToast && (
              <div className="absolute top-full right-0 mt-2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-50">
                Link copied!
              </div>
            )}
          </div>
        </div>

        {/* ===== MOBILE TAB BAR ===== */}
        <div className="md:hidden flex border-b border-gray-200 bg-white flex-shrink-0">
          {([
            { key: "itinerary", label: "Itinerary", icon: "📋" },
            { key: "spots", label: "Spots", icon: "📍" },
            { key: "map", label: "Map", icon: "🗺️" },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setMobileTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors ${
                mobileTab === tab.key
                  ? "text-accent border-b-2 border-accent bg-accent-light/30"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.key === "itinerary" && items.length > 0 && (
                <span className="bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ===== MAIN LAYOUT ===== */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[380px_1fr_50vw] overflow-hidden">
          {/* SIDEBAR — Itinerary */}
          <div className={`bg-white md:border-r border-gray-200 flex flex-col overflow-hidden relative ${mobileTab !== "itinerary" ? "hidden md:flex" : "flex"}`}>
            {/* Trip info bar */}
            <div className="px-4 md:px-5 py-3 border-b border-gray-200 flex items-center gap-3 text-[13px] text-gray-500 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <span>📍</span>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value as Area)}
                  className="bg-transparent border-none outline-none text-[13px] text-gray-500 cursor-pointer hover:text-gray-700"
                >
                  {AREAS.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>
              <span>📅 {days.length} days</span>
            </div>

            {/* Day tabs */}
            <div className="flex gap-1 px-4 md:px-5 py-3 border-b border-gray-100 overflow-x-auto flex-shrink-0">
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
              <button
                onClick={handleAddDay}
                className="flex-shrink-0 text-gray-300 hover:text-gray-500 text-base px-2"
              >
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
                    <div className="flex items-center gap-2">
                      {currentDay.date && (
                        <span className="text-xs text-gray-400">
                          {currentDay.date}
                        </span>
                      )}
                      {items.length > 0 && (
                        <button
                          onClick={handleClearAll}
                          className="text-xs text-gray-400 hover:text-red-500 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
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
                        onSpotClick={setDetailSpot}
                        onNoteChange={handleNoteChange}
                        onTimeChange={handleTimeChange}
                      />
                    ))}
                  </SortableContext>

                  <button
                    onClick={() => {
                      setIsSearchOpen(true);
                      setMobileTab("spots");
                    }}
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
          <div className={`overflow-hidden ${mobileTab !== "spots" ? "hidden md:flex" : "flex"}`}>
            <RecommendedSpots spots={spots} onAddSpot={(spot) => { handleAddSpot(spot); setMobileTab("itinerary"); }} usedSpotIds={usedSpotIds} />
          </div>

          {/* MAP AREA (right column) */}
          <div className={`${mobileTab !== "map" ? "hidden md:block" : "block"}`}>
            {user ? (
              <GoogleMap items={items} />
            ) : (
              <div className="relative overflow-hidden h-full min-h-[300px]">
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
                      onClick={() => setLoginModalOpen(true)}
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

      <SpotDetailModal
        spot={detailSpot}
        onClose={() => setDetailSpot(null)}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </DndContext>
  );
}
