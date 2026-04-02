/**
 * Security utilities for input validation and sanitization.
 */

/**
 * Escape HTML entities to prevent XSS when inserting into HTML context.
 */
export function escapeHtml(str: string | undefined | null): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Validate blog post input fields.
 * Returns null if valid, or an error message string.
 */
export function validateBlogPost(fields: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImageUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
}): string | null {
  // Title
  if (!fields.title.trim()) return "Title is required.";
  if (fields.title.length > 200) return "Title must be under 200 characters.";

  // Slug
  if (!fields.slug.trim()) return "Slug is required.";
  if (fields.slug.length > 100) return "Slug must be under 100 characters.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fields.slug)) {
    return "Slug must contain only lowercase letters, numbers, and hyphens.";
  }

  // Category
  const validCategories = ["guides", "news", "tips"];
  if (!validCategories.includes(fields.category)) {
    return "Invalid category.";
  }

  // Content
  if (!fields.content.trim()) return "Content is required.";
  if (fields.content.length > 100000) return "Content is too long (max 100,000 characters).";

  // Excerpt
  if (fields.excerpt.length > 500) return "Excerpt must be under 500 characters.";

  // Featured image URL
  if (fields.featuredImageUrl) {
    const url = fields.featuredImageUrl.trim().toLowerCase();
    if (
      !url.startsWith("https://") &&
      !url.startsWith("http://") &&
      !url.startsWith("/")
    ) {
      return "Featured image URL must start with https:// or http://";
    }
    if (
      url.startsWith("javascript:") ||
      url.startsWith("data:") ||
      url.startsWith("vbscript:")
    ) {
      return "Invalid featured image URL.";
    }
  }

  // Meta title
  if (fields.metaTitle && fields.metaTitle.length > 70) {
    return "Meta title should be under 70 characters for optimal SEO.";
  }

  // Meta description
  if (fields.metaDescription && fields.metaDescription.length > 160) {
    return "Meta description should be under 160 characters for optimal SEO.";
  }

  return null; // Valid
}

/**
 * Validate spot input fields.
 * Returns null if valid, or an error message string.
 */
export function validateSpot(fields: {
  nameEn: string;
  nameJa: string;
  description: string;
  category: string;
  area: string;
  lat: number;
  lng: number;
  address: string;
  photoUrls: string[];
  avgDurationMin: number;
  admissionFee?: number;
}): string | null {
  if (!fields.nameEn.trim()) return "English name is required.";
  if (fields.nameEn.length > 200) return "English name must be under 200 characters.";

  if (!fields.nameJa.trim()) return "Japanese name is required.";
  if (fields.nameJa.length > 200) return "Japanese name must be under 200 characters.";

  if (!fields.description.trim()) return "Description is required.";
  if (fields.description.length > 2000) return "Description must be under 2000 characters.";

  const validCategories = [
    "shrine", "temple", "museum", "park", "observation", "shopping",
    "food", "restaurant", "landmark", "onsen", "nature", "entertainment", "market",
  ];
  if (!validCategories.includes(fields.category)) return "Invalid category.";

  const validAreas = [
    "tokyo", "kyoto", "osaka", "nara", "hiroshima",
    "hakone", "nikko", "kamakura", "yokohama", "fukuoka",
  ];
  if (!validAreas.includes(fields.area)) return "Invalid area.";

  if (typeof fields.lat !== "number" || fields.lat < -90 || fields.lat > 90) {
    return "Latitude must be between -90 and 90.";
  }
  if (typeof fields.lng !== "number" || fields.lng < -180 || fields.lng > 180) {
    return "Longitude must be between -180 and 180.";
  }

  if (!fields.address.trim()) return "Address is required.";

  for (const url of fields.photoUrls) {
    const trimmed = url.trim().toLowerCase();
    if (trimmed && !trimmed.startsWith("https://") && !trimmed.startsWith("http://")) {
      return "Photo URLs must start with https:// or http://";
    }
    if (trimmed.startsWith("javascript:") || trimmed.startsWith("data:")) {
      return "Invalid photo URL.";
    }
  }

  if (typeof fields.avgDurationMin !== "number" || fields.avgDurationMin < 1) {
    return "Average duration must be at least 1 minute.";
  }

  if (fields.admissionFee !== undefined && fields.admissionFee !== null) {
    if (typeof fields.admissionFee !== "number" || fields.admissionFee < 0) {
      return "Admission fee must be a non-negative number.";
    }
  }

  return null;
}
