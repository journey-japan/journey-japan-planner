import { MetadataRoute } from "next";
import { getItineraries } from "@/lib/db";

const SITE_URL = "https://plan.journeyjpn.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Dynamic itinerary pages
  let itineraryPages: MetadataRoute.Sitemap = [];
  try {
    const itineraries = await getItineraries();
    itineraryPages = itineraries.map((itinerary) => ({
      url: `${SITE_URL}/itineraries/${itinerary.id}`,
      lastModified: new Date(itinerary.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // If DB is unavailable, return only static pages
  }

  return [...staticPages, ...itineraryPages];
}
