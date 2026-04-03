"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

interface DashboardStats {
  spotCount: number;
  spotsByArea: Record<string, number>;
  spotsWithoutPhotos: number;
  blogCount: number;
  blogPublished: number;
  blogDraft: number;
  itineraryCount: number;
}

export default function AdminDashboardPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !profile?.is_pro) {
      router.push("/");
      return;
    }
    if (!initialized) {
      setInitialized(true);
      fetchStats();
    }
  }, [user, profile, authLoading, router, initialized]);

  async function fetchStats() {
    setLoading(true);

    const [spotsRes, blogsRes, itinerariesRes] = await Promise.all([
      supabase.from("spots").select("area, photo_urls"),
      supabase.from("blog_posts").select("status"),
      supabase.from("itineraries").select("id").eq("status", "published"),
    ]);

    const spots = spotsRes.data || [];
    const blogs = blogsRes.data || [];
    const itineraries = itinerariesRes.data || [];

    const spotsByArea: Record<string, number> = {};
    let spotsWithoutPhotos = 0;
    for (const s of spots) {
      const area = s.area as string;
      spotsByArea[area] = (spotsByArea[area] || 0) + 1;
      const photos = s.photo_urls as string[] | null;
      if (!photos || photos.length === 0) {
        spotsWithoutPhotos++;
      }
    }

    setStats({
      spotCount: spots.length,
      spotsByArea,
      spotsWithoutPhotos,
      blogCount: blogs.length,
      blogPublished: blogs.filter((b) => b.status === "published").length,
      blogDraft: blogs.filter((b) => b.status === "draft").length,
      itineraryCount: itineraries.length,
    });

    setLoading(false);
  }

  if (authLoading || loading || !initialized) {
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
      <main className="min-h-screen bg-gray-50">
        <section className="max-w-5xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Journey Japan management console
            </p>
          </div>

          {/* Stats Overview */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-2xl font-bold text-gray-900">{stats.spotCount}</p>
                <p className="text-xs text-gray-500 mt-1">Total Spots</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-2xl font-bold text-gray-900">{stats.blogPublished}</p>
                <p className="text-xs text-gray-500 mt-1">Published Articles</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-2xl font-bold text-gray-900">{stats.itineraryCount}</p>
                <p className="text-xs text-gray-500 mt-1">Published Itineraries</p>
              </div>
              <Link
                href="/admin/spots?photos=missing"
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-accent/30 transition-all"
              >
                <p className={`text-2xl font-bold ${stats.spotsWithoutPhotos > 0 ? "text-amber-500" : "text-green-600"}`}>
                  {stats.spotsWithoutPhotos}
                </p>
                <p className="text-xs text-gray-500 mt-1">Spots Missing Photos</p>
              </Link>
            </div>
          )}

          {/* Menu Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Spots */}
            <Link
              href="/admin/spots"
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-accent/30 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-accent transition-colors">
                    Spot Management
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    View, edit, and add travel spots. Review and replace photos.
                  </p>
                </div>
                <span className="text-2xl">📍</span>
              </div>
              {stats && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {Object.entries(stats.spotsByArea)
                    .sort(([, a], [, b]) => b - a)
                    .map(([area, count]) => (
                      <span
                        key={area}
                        className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
                      >
                        {area.charAt(0).toUpperCase() + area.slice(1)} {count}
                      </span>
                    ))}
                </div>
              )}
              <div className="mt-4 text-xs font-medium text-accent">
                Open Spot Manager &rarr;
              </div>
            </Link>

            {/* Blog */}
            <Link
              href="/admin/blog"
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-accent/30 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-accent transition-colors">
                    Blog Management
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Create, edit, and publish blog articles.
                  </p>
                </div>
                <span className="text-2xl">📝</span>
              </div>
              {stats && (
                <div className="flex gap-3 mt-4">
                  <span className="text-[11px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                    {stats.blogPublished} published
                  </span>
                  {stats.blogDraft > 0 && (
                    <span className="text-[11px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                      {stats.blogDraft} draft
                    </span>
                  )}
                </div>
              )}
              <div className="mt-4 text-xs font-medium text-accent">
                Open Blog Manager &rarr;
              </div>
            </Link>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Frequently used shortcuts.
                  </p>
                </div>
                <span className="text-2xl">⚡</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Link
                  href="/admin/spots/edit/new"
                  className="text-sm text-center font-medium text-gray-700 bg-gray-50 hover:bg-accent hover:text-white px-4 py-2.5 rounded-lg transition-colors"
                >
                  + New Spot
                </Link>
                <Link
                  href="/admin/blog/edit/new"
                  className="text-sm text-center font-medium text-gray-700 bg-gray-50 hover:bg-accent hover:text-white px-4 py-2.5 rounded-lg transition-colors"
                >
                  + New Article
                </Link>
              </div>
            </div>

            {/* External Links */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">External Tools</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Supabase, Vercel, and other services.
                  </p>
                </div>
                <span className="text-2xl">🔗</span>
              </div>
              <div className="space-y-2 mt-4">
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-gray-600 hover:text-accent px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span>Supabase Dashboard</span>
                  <span className="text-gray-300">↗</span>
                </a>
                <a
                  href="https://vercel.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-gray-600 hover:text-accent px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span>Vercel Dashboard</span>
                  <span className="text-gray-300">↗</span>
                </a>
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-gray-600 hover:text-accent px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span>Google Search Console</span>
                  <span className="text-gray-300">↗</span>
                </a>
                <a
                  href="https://analytics.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-gray-600 hover:text-accent px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span>Google Analytics</span>
                  <span className="text-gray-300">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
