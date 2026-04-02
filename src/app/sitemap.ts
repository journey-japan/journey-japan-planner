import { MetadataRoute } from "next";
import { getItineraries, getBlogPosts } from "@/lib/db";
import { DESTINATION_DATA } from "@/lib/destination-data";

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
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Destination pages
  const destinationPages: MetadataRoute.Sitemap = Object.keys(
    DESTINATION_DATA
  ).map((area) => ({
    url: `${SITE_URL}/destinations/${area}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

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

  // Blog pages
  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  let blogPostPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogPostPages = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // If DB is unavailable, skip blog posts
  }

  return [...staticPages, ...destinationPages, ...itineraryPages, ...blogIndex, ...blogPostPages];
}
