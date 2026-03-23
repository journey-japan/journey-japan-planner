import { supabase } from "./supabase";
import type { Spot, Itinerary, ItineraryDay, ItineraryItem } from "@/types";

// ===== SPOTS =====

export async function getSpots(area?: string): Promise<Spot[]> {
  let query = supabase.from("spots").select("*");
  if (area) query = query.eq("area", area);
  query = query.order("name_en");

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching spots:", error);
    return [];
  }

  return (data || []).map(mapSpot);
}

export async function getSpotById(id: string): Promise<Spot | null> {
  const { data, error } = await supabase
    .from("spots")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapSpot(data);
}

// ===== ITINERARIES =====

export async function getItineraries(area?: string): Promise<Itinerary[]> {
  let query = supabase
    .from("itineraries")
    .select(`
      *,
      author:profiles!itineraries_user_id_fkey(id, email, display_name, avatar_url, is_pro)
    `)
    .eq("status", "published");

  if (area) query = query.eq("area", area);
  query = query.order("view_count", { ascending: false });

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching itineraries:", error);
    return [];
  }

  return (data || []).map(mapItinerary);
}

export async function getUserItineraries(userId: string): Promise<Itinerary[]> {
  const { data, error } = await supabase
    .from("itineraries")
    .select(`
      *,
      author:profiles!itineraries_user_id_fkey(id, email, display_name, avatar_url, is_pro)
    `)
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching user itineraries:", error);
    return [];
  }

  return (data || []).map(mapItinerary);
}

export async function getItineraryWithDetails(id: string): Promise<Itinerary | null> {
  // Fetch itinerary with author
  const { data: itinData, error: itinError } = await supabase
    .from("itineraries")
    .select(`
      *,
      author:profiles!itineraries_user_id_fkey(id, email, display_name, avatar_url, is_pro)
    `)
    .eq("id", id)
    .single();

  if (itinError || !itinData) return null;

  // Fetch days
  const { data: daysData } = await supabase
    .from("itinerary_days")
    .select("*")
    .eq("itinerary_id", id)
    .order("day_number");

  // Fetch items with spot data
  const dayIds = (daysData || []).map((d: { id: string }) => d.id);
  let itemsData: Record<string, unknown>[] = [];

  if (dayIds.length > 0) {
    const { data } = await supabase
      .from("itinerary_items")
      .select(`
        *,
        spot:spots!itinerary_items_spot_id_fkey(*)
      `)
      .in("day_id", dayIds)
      .order("order_index");

    itemsData = data || [];
  }

  // Assemble the full itinerary
  const days: ItineraryDay[] = (daysData || []).map((day: Record<string, unknown>) => ({
    id: day.id as string,
    itineraryId: day.itinerary_id as string,
    dayNumber: day.day_number as number,
    date: day.date as string | undefined,
    title: day.title as string | undefined,
    items: itemsData
      .filter((item: Record<string, unknown>) => item.day_id === day.id)
      .map((item: Record<string, unknown>) => mapItem(item)),
  }));

  const itinerary = mapItinerary(itinData);
  itinerary.days = days;
  return itinerary;
}

// ===== PUBLISH ITINERARY =====

export async function publishItinerary({
  userId,
  title,
  description,
  area,
  days,
  tags,
}: {
  userId: string;
  title: string;
  description: string;
  area: string;
  days: ItineraryDay[];
  tags: string[];
}): Promise<{ id: string } | { error: string }> {
  // 1. Insert itinerary
  const { data: itinData, error: itinError } = await supabase
    .from("itineraries")
    .insert({
      user_id: userId,
      title,
      description,
      area,
      duration_days: days.length,
      status: "published",
      is_pro: false,
      tags,
      view_count: 0,
    })
    .select("id")
    .single();

  if (itinError || !itinData) {
    console.error("Error inserting itinerary:", itinError);
    return { error: itinError?.message || "Failed to create itinerary" };
  }

  const itineraryId = itinData.id as string;

  // 2. Insert days
  for (const day of days) {
    const { data: dayData, error: dayError } = await supabase
      .from("itinerary_days")
      .insert({
        itinerary_id: itineraryId,
        day_number: day.dayNumber,
        date: day.date || null,
        title: day.title || null,
      })
      .select("id")
      .single();

    if (dayError || !dayData) {
      console.error("Error inserting day:", dayError);
      continue;
    }

    const dayId = dayData.id as string;

    // 3. Insert items for this day (skip sample data spots with non-UUID IDs)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const dbItems = day.items.filter((item) => uuidRegex.test(item.spotId));

    if (dbItems.length > 0) {
      const itemRows = dbItems.map((item, idx) => ({
        day_id: dayId,
        spot_id: item.spotId,
        order_index: idx,
        start_time: item.startTime || null,
        duration_minutes: item.durationMinutes || item.spot.avgDurationMin,
        note: item.note || null,
        transport_to_next: item.transportToNext
          ? {
              mode: item.transportToNext.mode,
              durationMinutes: item.transportToNext.durationMinutes,
              distance: item.transportToNext.distance || null,
              detail: item.transportToNext.detail || null,
            }
          : null,
      }));

      const { error: itemsError } = await supabase
        .from("itinerary_items")
        .insert(itemRows);

      if (itemsError) {
        console.error("Error inserting items:", itemsError);
      }
    }
  }

  return { id: itineraryId };
}

// ===== UPDATE ITINERARY =====

export async function updateItinerary({
  itineraryId,
  userId,
  title,
  description,
  area,
  days,
  tags,
}: {
  itineraryId: string;
  userId: string;
  title: string;
  description: string;
  area: string;
  days: ItineraryDay[];
  tags: string[];
}): Promise<{ id: string } | { error: string }> {
  // 1. Update itinerary metadata
  const { error: updateError } = await supabase
    .from("itineraries")
    .update({
      title,
      description,
      area,
      duration_days: days.length,
      tags,
      updated_at: new Date().toISOString(),
    })
    .eq("id", itineraryId)
    .eq("user_id", userId);

  if (updateError) {
    console.error("Error updating itinerary:", updateError);
    return { error: updateError.message };
  }

  // 2. Fetch existing day IDs to delete their items
  const { data: existingDays } = await supabase
    .from("itinerary_days")
    .select("id")
    .eq("itinerary_id", itineraryId);

  if (existingDays && existingDays.length > 0) {
    const existingDayIds = existingDays.map((d: { id: string }) => d.id);

    // 3. Delete existing items
    await supabase
      .from("itinerary_items")
      .delete()
      .in("day_id", existingDayIds);

    // 4. Delete existing days
    await supabase
      .from("itinerary_days")
      .delete()
      .eq("itinerary_id", itineraryId);
  }

  // 5. Re-insert days and items
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  for (const day of days) {
    const { data: dayData, error: dayError } = await supabase
      .from("itinerary_days")
      .insert({
        itinerary_id: itineraryId,
        day_number: day.dayNumber,
        date: day.date || null,
        title: day.title || null,
      })
      .select("id")
      .single();

    if (dayError || !dayData) {
      console.error("Error inserting day:", dayError);
      continue;
    }

    const dayId = dayData.id as string;
    const dbItems = day.items.filter((item) => uuidRegex.test(item.spotId));

    if (dbItems.length > 0) {
      const itemRows = dbItems.map((item, idx) => ({
        day_id: dayId,
        spot_id: item.spotId,
        order_index: idx,
        start_time: item.startTime || null,
        duration_minutes: item.durationMinutes || item.spot.avgDurationMin,
        note: item.note || null,
        transport_to_next: item.transportToNext
          ? {
              mode: item.transportToNext.mode,
              durationMinutes: item.transportToNext.durationMinutes,
              distance: item.transportToNext.distance || null,
              detail: item.transportToNext.detail || null,
            }
          : null,
      }));

      const { error: itemsError } = await supabase
        .from("itinerary_items")
        .insert(itemRows);

      if (itemsError) {
        console.error("Error inserting items:", itemsError);
      }
    }
  }

  return { id: itineraryId };
}

// ===== MAPPERS =====

function mapSpot(row: Record<string, unknown>): Spot {
  return {
    id: row.id as string,
    googlePlaceId: row.google_place_id as string | undefined,
    nameEn: row.name_en as string,
    nameJa: row.name_ja as string,
    description: row.description as string,
    category: row.category as Spot["category"],
    area: row.area as Spot["area"],
    lat: row.lat as number,
    lng: row.lng as number,
    address: row.address as string,
    photoUrls: (row.photo_urls as string[]) || [],
    openingHours: row.opening_hours as Record<string, string> | undefined,
    admissionFee: row.admission_fee as number | undefined,
    admissionFeeCurrency: row.admission_fee_currency as string | undefined,
    avgDurationMin: row.avg_duration_min as number,
  };
}

function mapItinerary(row: Record<string, unknown>): Itinerary {
  const author = row.author as Record<string, unknown> | null;
  return {
    id: row.id as string,
    userId: row.user_id as string,
    title: row.title as string,
    description: row.description as string,
    area: row.area as Itinerary["area"],
    durationDays: row.duration_days as number,
    startDate: row.start_date as string | undefined,
    status: row.status as "draft" | "published",
    isPro: row.is_pro as boolean,
    coverImageUrl: row.cover_image_url as string | undefined,
    tags: (row.tags as string[]) || [],
    copiedFrom: row.copied_from as string | undefined,
    viewCount: row.view_count as number,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    days: [],
    author: author
      ? {
          id: author.id as string,
          email: author.email as string,
          displayName: author.display_name as string,
          avatarUrl: author.avatar_url as string | undefined,
          isPro: author.is_pro as boolean,
        }
      : undefined,
  };
}

function mapItem(row: Record<string, unknown>): ItineraryItem {
  const spotRow = row.spot as Record<string, unknown> | null;
  const transport = row.transport_to_next as Record<string, unknown> | null;
  return {
    id: row.id as string,
    dayId: row.day_id as string,
    spotId: row.spot_id as string,
    spot: spotRow ? mapSpot(spotRow) : ({} as Spot),
    orderIndex: row.order_index as number,
    startTime: row.start_time as string | undefined,
    durationMinutes: row.duration_minutes as number | undefined,
    note: row.note as string | undefined,
    transportToNext: transport
      ? {
          mode: transport.mode as ItineraryItem["transportToNext"] extends undefined ? never : NonNullable<ItineraryItem["transportToNext"]>["mode"],
          durationMinutes: transport.durationMinutes as number,
          distance: transport.distance as string | undefined,
          detail: transport.detail as string | undefined,
        }
      : undefined,
  };
}
