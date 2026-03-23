"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/types";

function formatDate(dateStr?: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
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

export default function AdminBlogPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !profile?.is_pro)) {
      router.push("/");
      return;
    }
    if (user && profile?.is_pro) {
      fetchPosts();
    }
  }, [user, profile, authLoading, router]);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("updated_at", { ascending: false });

    if (!error && data) {
      setPosts(
        data.map((row: Record<string, unknown>) => ({
          id: row.id as string,
          slug: row.slug as string,
          title: row.title as string,
          excerpt: row.excerpt as string,
          content: row.content as string,
          category: row.category as BlogPost["category"],
          featuredImageUrl: row.featured_image_url as string | undefined,
          tags: (row.tags as string[]) || [],
          metaTitle: row.meta_title as string | undefined,
          metaDescription: row.meta_description as string | undefined,
          authorId: row.author_id as string | undefined,
          status: row.status as "draft" | "published",
          viewCount: row.view_count as number,
          publishedAt: row.published_at as string | undefined,
          createdAt: row.created_at as string,
          updatedAt: row.updated_at as string,
        }))
      );
    }
    setLoading(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (!error) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  if (authLoading || loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  if (!user || !profile?.is_pro) return null;

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="max-w-5xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Blog Management</h1>
              <p className="text-sm text-gray-500 mt-1">
                {posts.length} article{posts.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Link
              href="/admin/blog/edit/new"
              className="bg-accent hover:bg-accent-hover text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              + New Article
            </Link>
          </div>

          {/* Posts Table */}
          {posts.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                      Title
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                      Category
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                      Status
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                      Date
                    </th>
                    <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {post.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            /blog/{post.slug}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                          {categoryLabel(post.category)}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            post.status === "published"
                              ? "text-green-700 bg-green-50"
                              : "text-amber-700 bg-amber-50"
                          }`}
                        >
                          {post.status === "published" ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-xs text-gray-500">
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/blog/edit/${post.id}`}
                            className="text-xs font-medium text-accent hover:underline"
                          >
                            Edit
                          </Link>
                          {post.status === "published" && (
                            <Link
                              href={`/blog/${post.slug}`}
                              className="text-xs font-medium text-gray-500 hover:underline"
                              target="_blank"
                            >
                              View
                            </Link>
                          )}
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="text-xs font-medium text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-400 text-lg mb-2">No articles yet</p>
              <p className="text-gray-400 text-sm mb-6">
                Create your first blog post to get started.
              </p>
              <Link
                href="/admin/blog/edit/new"
                className="bg-accent hover:bg-accent-hover text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                + New Article
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
