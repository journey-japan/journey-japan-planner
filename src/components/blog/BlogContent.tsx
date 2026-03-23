"use client";

import { useEffect, useRef } from "react";

/**
 * Renders blog post content as HTML.
 * Content is stored as markdown-style text in the DB.
 * This component converts basic markdown to HTML for display.
 */
export default function BlogContent({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Convert markdown-like content to HTML
    ref.current.innerHTML = markdownToHtml(content);
  }, [content]);

  return (
    <div
      ref={ref}
      className="blog-content max-w-none"
    />
  );
}

function markdownToHtml(md: string): string {
  let html = md;

  // Escape HTML entities (but preserve existing HTML if any)
  // Only escape if content looks like raw markdown
  if (!html.includes("<h1") && !html.includes("<p>")) {
    html = html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Images
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" loading="lazy" class="rounded-lg" />'
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>");

  // Paragraphs - wrap remaining text blocks
  html = html
    .split("\n\n")
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      // Don't wrap if it's already an HTML block element
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
