import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { validateSpot } from "@/lib/security";

async function verifyAdmin(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return null;

  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return null;

  const { data: profile } = await getSupabaseAdmin()
    .from("profiles")
    .select("is_pro")
    .eq("id", user.id)
    .single();

  if (!profile?.is_pro) return null;
  return user;
}

export async function POST(request: NextRequest) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const error = validateSpot({
    nameEn: body.name_en || "",
    nameJa: body.name_ja || "",
    description: body.description || "",
    category: body.category || "",
    area: body.area || "",
    lat: body.lat,
    lng: body.lng,
    address: body.address || "",
    photoUrls: body.photo_urls || [],
    avgDurationMin: body.avg_duration_min,
    admissionFee: body.admission_fee,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const { data, error: dbError } = await getSupabaseAdmin()
    .from("spots")
    .insert({
      name_en: body.name_en.trim(),
      name_ja: body.name_ja.trim(),
      description: body.description.trim(),
      category: body.category,
      area: body.area,
      lat: body.lat,
      lng: body.lng,
      address: body.address.trim(),
      photo_urls: (body.photo_urls || []).filter((u: string) => u.trim()),
      admission_fee: body.admission_fee ?? null,
      admission_fee_currency: body.admission_fee_currency || "JPY",
      avg_duration_min: body.avg_duration_min,
      google_place_id: body.google_place_id?.trim() || null,
      opening_hours: body.opening_hours || null,
      meta_title: body.meta_title?.trim() || null,
      meta_description: body.meta_description?.trim() || null,
      slug: body.slug?.trim() || null,
    })
    .select("id")
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id });
}
