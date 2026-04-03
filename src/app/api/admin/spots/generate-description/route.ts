import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabase-server";

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

const CATEGORY_CONTEXT: Record<string, { type: string; activities: string[]; vibe: string }> = {
  shrine: {
    type: "Shinto shrine",
    activities: ["pray at the main hall", "walk through torii gates", "purchase omamori charms", "admire the sacred architecture"],
    vibe: "spiritual and serene",
  },
  temple: {
    type: "Buddhist temple",
    activities: ["explore the temple grounds", "admire traditional architecture", "experience Zen meditation", "view Buddhist statues and art"],
    vibe: "peaceful and contemplative",
  },
  museum: {
    type: "museum",
    activities: ["browse fascinating exhibits", "learn about Japanese history and culture", "see rare artifacts", "enjoy interactive displays"],
    vibe: "educational and inspiring",
  },
  park: {
    type: "park",
    activities: ["take a leisurely stroll", "enjoy cherry blossoms in spring", "relax by the pond", "have a picnic under the trees"],
    vibe: "refreshing and relaxing",
  },
  observation: {
    type: "observation deck",
    activities: ["take in panoramic city views", "capture stunning photos", "visit at sunset for golden hour", "spot famous landmarks from above"],
    vibe: "breathtaking and memorable",
  },
  shopping: {
    type: "shopping district",
    activities: ["browse unique shops and boutiques", "hunt for souvenirs", "sample local street food", "soak in the vibrant atmosphere"],
    vibe: "lively and exciting",
  },
  food: {
    type: "food destination",
    activities: ["taste authentic Japanese cuisine", "try local specialties", "explore food stalls and restaurants", "discover hidden culinary gems"],
    vibe: "delicious and unforgettable",
  },
  restaurant: {
    type: "restaurant",
    activities: ["savor expertly prepared dishes", "experience Japanese dining culture", "try seasonal specialties", "enjoy the unique atmosphere"],
    vibe: "flavorful and authentic",
  },
  landmark: {
    type: "landmark",
    activities: ["admire the iconic architecture", "take memorable photos", "learn about its history", "explore the surrounding area"],
    vibe: "iconic and impressive",
  },
  onsen: {
    type: "hot spring",
    activities: ["soak in natural hot spring waters", "relax and rejuvenate", "experience traditional bathing culture", "enjoy the therapeutic benefits"],
    vibe: "soothing and rejuvenating",
  },
  nature: {
    type: "natural attraction",
    activities: ["hike scenic trails", "enjoy stunning natural scenery", "photograph beautiful landscapes", "connect with nature"],
    vibe: "awe-inspiring and tranquil",
  },
  entertainment: {
    type: "entertainment venue",
    activities: ["enjoy unique performances", "experience Japanese pop culture", "try interactive activities", "create unforgettable memories"],
    vibe: "fun and exciting",
  },
  market: {
    type: "market",
    activities: ["browse fresh seafood and produce", "sample local delicacies", "experience the bustling atmosphere", "find unique food souvenirs"],
    vibe: "vibrant and sensory",
  },
};

const AREA_CONTEXT: Record<string, string> = {
  tokyo: "Japan's dynamic capital city",
  kyoto: "Japan's ancient cultural capital",
  osaka: "Japan's kitchen and entertainment hub",
  nara: "a historic city famous for its friendly deer and ancient temples",
  hiroshima: "a city of peace and resilience",
  hakone: "a scenic hot spring resort town near Mount Fuji",
  nikko: "a mountain town known for its ornate shrines and stunning nature",
  kamakura: "a coastal city with the iconic Great Buddha",
  yokohama: "Japan's vibrant port city",
  fukuoka: "the gateway to Kyushu with incredible food culture",
};

function pick<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function generateDescription(body: {
  name_en: string;
  name_ja: string;
  category: string;
  area: string;
  address: string;
  admission_fee: number | null;
  avg_duration_min: number | null;
  existing_description: string;
}): string {
  const { name_en, name_ja, category, area, admission_fee, avg_duration_min, existing_description } = body;

  const cat = CATEGORY_CONTEXT[category] || CATEGORY_CONTEXT.landmark;
  const areaDesc = AREA_CONTEXT[area] || area;
  const areaLabel = area.charAt(0).toUpperCase() + area.slice(1);
  const activities = pick(cat.activities, 2);

  const feeText = admission_fee === 0 || admission_fee === null
    ? "free to visit"
    : `with admission starting at ¥${admission_fee.toLocaleString()}`;

  const durationText = avg_duration_min
    ? `Allow around ${avg_duration_min} minutes to fully enjoy the experience.`
    : "";

  // Build a rich, SEO-friendly description (200-300 chars target)
  const templates = [
    `${name_en} (${name_ja}) is a must-visit ${cat.type} located in ${areaLabel}, ${areaDesc}. This ${cat.vibe} destination invites visitors to ${activities[0]} and ${activities[1]}. The site is ${feeText}, making it a perfect addition to any ${areaLabel} itinerary. ${durationText} Whether you're a first-time visitor or a returning traveler, ${name_en} offers an authentic glimpse into Japan's rich cultural heritage.`,

    `Discover ${name_en} (${name_ja}), one of ${areaLabel}'s most beloved ${cat.type}s. Nestled in the heart of ${areaDesc}, this ${cat.vibe} spot is where you can ${activities[0]} and ${activities[1]}. ${durationText} The attraction is ${feeText}. From cultural enthusiasts to casual travelers, ${name_en} delivers an experience that captures the essence of ${areaLabel} and leaves a lasting impression.`,

    `${name_en} (${name_ja}) stands as one of the highlights of any trip to ${areaLabel}, ${areaDesc}. As a renowned ${cat.type}, it offers visitors the chance to ${activities[0]} and ${activities[1]} in a truly ${cat.vibe} setting. The venue is ${feeText}. ${durationText} Add ${name_en} to your ${areaLabel} itinerary for an unforgettable experience that blends tradition with discovery.`,
  ];

  // If existing description is very short, generate from scratch
  // If it exists and is reasonable, enhance it
  if (existing_description && existing_description.length >= 100) {
    // Enhance: keep existing and add SEO-friendly suffix
    const suffix = ` Located in ${areaLabel}, ${areaDesc}, this ${cat.type} is ${feeText}. ${durationText} A must-visit destination for travelers exploring ${areaLabel}.`;
    const enhanced = existing_description.trim() + suffix;
    return enhanced;
  }

  return templates[Math.floor(Math.random() * templates.length)];
}

export async function POST(request: NextRequest) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.name_en?.trim()) {
    return NextResponse.json({ error: "English name is required" }, { status: 400 });
  }

  const description = generateDescription(body);

  return NextResponse.json({ description });
}
