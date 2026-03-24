"use client";

import { useEffect, useRef } from "react";

/**
 * Renders blog post content as HTML.
 * Content is stored as markdown-style text in the DB.
 * This component converts basic markdown to HTML for display.
 * All user input is escaped first, then markdown syntax is converted.
 */
export default function BlogContent({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = markdownToHtml(content);
  }, [content]);

  return (
    <div
      ref={ref}
      className="blog-content max-w-none"
    />
  );
}

/**
 * Escape all HTML entities to prevent XSS.
 * This is ALWAYS applied first, before any markdown conversion.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Validate a URL is safe (no javascript:, data:, vbscript: etc.)
 */
function isSafeUrl(url: string): boolean {
  const trimmed = url.trim().toLowerCase();
  if (
    trimmed.startsWith("javascript:") ||
    trimmed.startsWith("vbscript:") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return false;
  }
  return true;
}

/**
 * Validate a URL is a safe image source
 */
function isSafeImageUrl(url: string): boolean {
  if (!isSafeUrl(url)) return false;
  const trimmed = url.trim().toLowerCase();
  // Only allow http(s) and relative paths
  return (
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("/")
  );
}

function markdownToHtml(md: string): string {
  // Step 1: ALWAYS escape HTML first to prevent XSS
  let html = escapeHtml(md);

  // Step 2: Convert markdown syntax to HTML (operating on escaped text)

  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links — validate URL safety
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, text: string, url: string) => {
      // Unescape the URL for validation (it was escaped above)
      const rawUrl = url
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");

      if (!isSafeUrl(rawUrl)) {
        return text; // Return plain text, strip the link
      }
      // Re-escape for safe attribute value
      const safeUrl = escapeHtml(rawUrl);
      return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
  );

  // Images — validate URL safety
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (_match, alt: string, url: string) => {
      const rawUrl = url
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");

      if (!isSafeImageUrl(rawUrl)) {
        return alt; // Return alt text only, strip the image
      }
      const safeUrl = escapeHtml(rawUrl);
      const safeAlt = alt; // Already escaped
      return `<img src="${safeUrl}" alt="${safeAlt}" loading="lazy" class="rounded-lg" />`;
    }
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, "<blockquote><p>$1</p></blockquote>");

  // Paragraphs — wrap remaining text blocks
  html = html
    .split("\n\n")
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      if (
        block.startsWith("<h") ||
        block.startsWith("<ul") ||
        block.startsWith("<ol") ||
        block.startsWith("<blockquote") ||
        block.startsWith("<hr") ||
        block.startsWith("<img") ||
        block.startsWith("<div")
      ) {
        return block;
      }
      return `<p>${block}</p>`;
    })
    .join("\n");

  // Clean up stray newlines within paragraphs
  html = html.replace(/<p>\n/g, "<p>");
  html = html.replace(/\n<\/p>/g, "</p>");

  return html;
}
