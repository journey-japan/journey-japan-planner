"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BLOG_CATEGORIES } from "@/types";

export default function BlogCategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("category") || "all";

  function handleClick(category: string) {
    if (category === "all") {
      router.push("/blog");
    } else {
      router.push(`/blog?category=${category}`);
    }
  }

  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
      <button
        onClick={() => handleClick("all")}
        className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
          current === "all"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        All
      </button>
      {BLOG_CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleClick(cat.value)}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            current === cat.value
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
