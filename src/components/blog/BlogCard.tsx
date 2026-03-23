import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types";

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });
}

function categoryLabel(category: string): string {
  const map: Record<string, string> = {
    guides: "Guides",
    news: "News",
    tips: "Tips",
  };
  return map[category] || category;
}

const EDITORIAL_EMAIL = "info@journeyjpn.com";
const EDITORIAL_NAME = "Journey Japan Editorial";

function getAuthorDisplay(author: BlogPost["author"]) {
  if (!author) return null;
  const isEditorial = author.email === EDITORIAL_EMAIL;
  return {
    name: isEditorial ? EDITORIAL_NAME : author.displayName,
    initial: isEditorial ? "J" : (author.displayName[0]?.toUpperCase() || "J"),
    avatarUrl: isEditorial ? undefined : author.avatarUrl,
    showAccentBg: isEditorial,
  };
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const authorDisplay = getAuthorDisplay(post.author);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Featured Image */}
      <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
        {post.featuredImageUrl ? (
          <Image
            src={post.featuredImageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-accent-light">
            <span className="text-accent text-4xl font-bold opacity-30">J</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold text-accent bg-accent-light px-2.5 py-1 rounded-full">
            {categoryLabel(post.category)}
          </span>
          <span className="text-xs text-gray-400">
            {formatDate(post.publishedAt)}
          </span>
        </div>

        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Author */}
        {authorDisplay && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            {authorDisplay.avatarUrl ? (
              <img
                src={authorDisplay.avatarUrl}
                alt={authorDisplay.name}
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                {authorDisplay.initial}
              </div>
            )}
            <span className="text-xs text-gray-500">
              {authorDisplay.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
