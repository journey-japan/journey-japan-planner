import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
import { getBlogPosts } from "@/lib/db";
import type { BlogCategory } from "@/types";

export const metadata: Metadata = {
  title: "Blog — Japan Travel Guides, News & Tips",
  description:
    "Explore travel guides, news, and insider tips about Japan from professional travel agents. Your go-to resource for planning the perfect Japan trip.",
  openGraph: {
    title: "Blog — Japan Travel Guides, News & Tips | Journey Japan",
    description:
      "Explore travel guides, news, and insider tips about Japan from professional travel agents.",
  },
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category as BlogCategory | undefined;
  const validCategories = ["guides", "news", "tips"];
  const filterCategory = category && validCategories.includes(category) ? category : undefined;

  const posts = await getBlogPosts(filterCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gray-50 py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-3">Blog</h1>
            <p className="text-gray-500 max-w-xl">
              Travel guides, latest news, and insider tips about Japan — written
              by professional travel agents.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          {/* Category Filter */}
          <div className="mb-8">
            <Suspense fallback={null}>
              <BlogCategoryFilter />
            </Suspense>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-2">No articles yet</p>
              <p className="text-gray-400 text-sm">
                Check back soon for new content.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
