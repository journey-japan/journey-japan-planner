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
