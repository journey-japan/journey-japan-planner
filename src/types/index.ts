// ===== Core Data Types =====

export interface Spot {
  id: string;
  googlePlaceId?: string;
  nameEn: string;
  nameJa: string;
  description: string;
  category: SpotCategory;
  area: Area;
  lat: number;
  lng: number;
  address: string;
  photoUrls: string[];
  openingHours?: Record<string, string>;
  admissionFee?: number;
  admissionFeeCurrency?: string;
  avgDurationMin: number;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  isFeatured?: boolean;
}

export interface ItineraryItem {
  id: string;
  dayId: string;
  spotId: string;
  spot: Spot;
  orderIndex: number;
  startTime?: string;      // "09:00"
  durationMinutes?: number;
  note?: string;
  transportToNext?: Transport;
}

export interface Transport {
  mode: "walk" | "train" | "bus" | "taxi" | "car";
  durationMinutes: number;
  distance?: string;
  detail?: string;           // e.g., "JR Yamanote Line"
}

export interface ItineraryDay {
  id: string;
  itineraryId: string;
  dayNumber: number;
  date?: string;             // "2026-03-25"
  title?: string;            // "Harajuku & Shibuya"
  items: ItineraryItem[];
}

export interface Itinerary {
  id: string;
  userId: string;
  title: string;
  description: string;
  area: Area;
  durationDays: number;
  startDate?: string;
  status: "draft" | "published";
  isPro: boolean;
  coverImageUrl?: string;
  tags: string[];
  copiedFrom?: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  days: ItineraryDay[];
  author?: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  isPro: boolean;
}

// ===== Enums =====

export type Area =
  | "tokyo"
  | "kyoto"
  | "osaka"
  | "nara"
  | "hiroshima"
  | "hakone"
  | "nikko"
  | "kamakura"
  | "yokohama"
  | "fukuoka";

export type SpotCategory =
  | "shrine"
  | "temple"
  | "museum"
  | "park"
  | "observation"
  | "shopping"
  | "food"
  | "restaurant"
  | "landmark"
  | "onsen"
  | "nature"
  | "entertainment"
  | "market";

// ===== Blog Types =====

export type BlogCategory = "guides" | "news" | "tips";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  featuredImageUrl?: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  authorId?: string;
  author?: UserProfile;
  status: "draft" | "published";
  viewCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const SPOT_CATEGORIES: { value: SpotCategory; label: string }[] = [
  { value: "shrine", label: "Shrine" },
  { value: "temple", label: "Temple" },
  { value: "museum", label: "Museum" },
  { value: "park", label: "Park" },
  { value: "observation", label: "Observation" },
  { value: "shopping", label: "Shopping" },
  { value: "food", label: "Food" },
  { value: "restaurant", label: "Restaurant" },
  { value: "landmark", label: "Landmark" },
  { value: "onsen", label: "Onsen" },
  { value: "nature", label: "Nature" },
  { value: "entertainment", label: "Entertainment" },
  { value: "market", label: "Market" },
];

export const BLOG_CATEGORIES: { value: BlogCategory; label: string }[] = [
  { value: "guides", label: "Guides" },
  { value: "news", label: "News" },
  { value: "tips", label: "Tips" },
];

// ===== UI Types =====

export interface AreaOption {
  value: Area;
  label: string;
  emoji: string;
}

export const AREAS: AreaOption[] = [
  { value: "tokyo", label: "Tokyo", emoji: "🗼" },
  { value: "kyoto", label: "Kyoto", emoji: "⛩️" },
  { value: "osaka", label: "Osaka", emoji: "🏯" },
  { value: "nara", label: "Nara", emoji: "🦌" },
  { value: "hiroshima", label: "Hiroshima", emoji: "🕊️" },
  { value: "hakone", label: "Hakone", emoji: "♨️" },
  { value: "nikko", label: "Nikko", emoji: "🏔️" },
  { value: "kamakura", label: "Kamakura", emoji: "🌸" },
  { value: "yokohama", label: "Yokohama", emoji: "🚢" },
  { value: "fukuoka", label: "Fukuoka", emoji: "🍜" },
];
