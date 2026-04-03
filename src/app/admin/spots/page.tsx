"use client";

import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { AREAS, SPOT_CATEGORIES } from "@/types";
import type { Spot, Area, SpotCategory } from "@/types";

function mapSpot(row: Record<string, unknown>): Spot {
  return {
    id: row.id as string,
    googlePlaceId: row.google_place_id as string | undefined,
    nameEn: row.name_en as string,
    nameJa: row.name_ja as string,
    description: row.description as string,
    category: row.category as SpotCategory,
    area: row.area as Area,
    lat: row.lat as number,
    lng: row.lng as number,
    address: row.address as string,
    photoUrls: (row.photo_urls as string[]) || [],
    admissionFee: row.admission_fee as number | undefined,
    admissionFeeCurrency: row.admission_fee_currency as string | undefined,
    avgDurationMin: row.avg_duration_min as number,
    metaTitle: row.meta_title as string | undefined,
    metaDescription: row.meta_description as string | undefined,
    slug: row.slug as string | undefined,
    isFeatured: row.is_featured as boolean | undefined,
  };
}

function getSeoQuality(spot: Spot): "green" | "yellow" | "red" {
  const descLen = (spot.description || "").length;
  const photoCount = spot.photoUrls?.length || 0;
  const hasName = !!spot.nameEn;

  if (descLen < 50 || photoCount === 0) return "red";
  if (descLen >= 120 && photoCount >= 2 && hasName) return "green";
  return "yellow";
}

const SEO_DOT_COLORS = {
  green: "bg-green-500",
  yellow: "bg-amber-400",
  red: "bg-red-500",
} as const;

export default function AdminSpotsPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    }>
      <AdminSpotsContent />
    </Suspense>
  );
}

function AdminSpotsContent() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [filterArea, setFilterArea] = useState<string>(searchParams.get("area") || "all");
  const [filterCategory, setFilterCategory] = useState<string>(searchParams.get("category") || "all");
  const [filterPhotos, setFilterPhotos] = useState<string>(searchParams.get("photos") || "all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [viewMode, setViewMode] = useState<"grid" | "table">((searchParams.get("view") as "grid" | "table") || "grid");

  // Build current filter query string for passing to edit page
  const currentFilterQs = useMemo(() => {
    const params = new URLSearchParams();
    if (filterArea !== "all") params.set("area", filterArea);
    if (filterCategory !== "all") params.set("category", filterCategory);
    if (filterPhotos !== "all") params.set("photos", filterPhotos);
    if (searchQuery) params.set("q", searchQuery);
    if (viewMode !== "grid") params.set("view", viewMode);
    return params.toString();
  }, [filterArea, filterCategory, filterPhotos, searchQuery, viewMode]);

  function editUrl(spotId: string) {
    const back = currentFilterQs ? `?back=${encodeURIComponent(currentFilterQs)}` : "";
    return `/admin/spots/edit/${spotId}${back}`;
  }

  const updateUrl = useCallback((area: string, category: string, photos: string, q: string, view: string) => {
    const params = new URLSearchParams();
    if (area !== "all") params.set("area", area);
    if (category !== "all") params.set("category", category);
    if (photos !== "all") params.set("photos", photos);
    if (q) params.set("q", q);
    if (view !== "grid") params.set("view", view);
    const qs = params.toString();
    router.replace(`/admin/spots${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [router]);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !profile?.is_pro) {
      router.push("/");
      return;
    }
    if (!initialized) {
      setInitialized(true);
      fetchSpots();
    }
  }, [user, profile, authLoading, router, initialized]);

  async function fetchSpots() {
    setLoading(true);
    const { data, error } = await supabase
      .from("spots")
      .select("*")
      .order("area")
      .order("name_en");

    if (!error && data) {
      setSpots(data.map(mapSpot));
    }
    setLoading(false);
  }

  async function toggleFeatured(e: React.MouseEvent, spotId: string, current: boolean) {
    e.preventDefault();
    e.stopPropagation();

    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    // Optimistic update
    setSpots((prev) =>
      prev.map((s) => (s.id === spotId ? { ...s, isFeatured: !current } : s))
    );

    const res = await fetch(`/api/admin/spots/${spotId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(
        // Send full spot data - get from current spots
        (() => {
          const spot = spots.find((s) => s.id === spotId)!;
          return {
            name_en: spot.nameEn,
            name_ja: spot.nameJa,
            description: spot.description,
            category: spot.category,
            area: spot.area,
            lat: spot.lat,
            lng: spot.lng,
            address: spot.address,
            photo_urls: spot.photoUrls,
            admission_fee: spot.admissionFee,
            admission_fee_currency: spot.admissionFeeCurrency,
            avg_duration_min: spot.avgDurationMin,
            google_place_id: spot.googlePlaceId,
            meta_title: spot.metaTitle,
            meta_description: spot.metaDescription,
            slug: spot.slug,
            is_featured: !current,
          };
        })()
      ),
    });

    if (!res.ok) {
      // Revert on failure
      setSpots((prev) =>
        prev.map((s) => (s.id === spotId ? { ...s, isFeatured: current } : s))
      );
    }
  }

  const filteredSpots = useMemo(() => {
    let result = spots;
    if (filterArea !== "all") {
      result = result.filter((s) => s.area === filterArea);
    }
    if (filterCategory !== "all") {
      result = result.filter((s) => s.category === filterCategory);
    }
    if (filterPhotos === "missing") {
      result = result.filter((s) => !s.photoUrls || s.photoUrls.length === 0);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.nameEn.toLowerCase().includes(q) ||
          s.nameJa.includes(searchQuery) ||
          s.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [spots, filterArea, filterCategory, searchQuery]);

  // Area counts for stats
  const areaCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of spots) {
      counts[s.area] = (counts[s.area] || 0) + 1;
    }
    return counts;
  }, [spots]);

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
        <section className="max-w-7xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link
                href="/admin"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                &larr; Dashboard
              </Link>
              <h1 className="text-2xl font-bold mt-1">Spot Management</h1>
              <p className="text-sm text-gray-500">
                {spots.length} spots total —{" "}
                {AREAS.filter((a) => areaCounts[a.value])
                  .map((a) => `${a.label} ${areaCounts[a.value]}`)
                  .join(", ")}
              </p>
            </div>
            <Link
              href="/admin/spots/edit/new"
              className="bg-accent hover:bg-accent-hover text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              + New Spot
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap gap-3 items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); updateUrl(filterArea, filterCategory, filterPhotos, e.target.value, viewMode); }}
              placeholder="Search spots..."
              className="flex-1 min-w-[200px] text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
            <select
              value={filterArea}
              onChange={(e) => { setFilterArea(e.target.value); updateUrl(e.target.value, filterCategory, filterPhotos, searchQuery, viewMode); }}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            >
              <option value="all">All Areas</option>
              {AREAS.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.emoji} {a.label} ({areaCounts[a.value] || 0})
                </option>
              ))}
            </select>
            <select
              value={filterCategory}
              onChange={(e) => { setFilterCategory(e.target.value); updateUrl(filterArea, e.target.value, filterPhotos, searchQuery, viewMode); }}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            >
              <option value="all">All Categories</option>
              {SPOT_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <select
              value={filterPhotos}
              onChange={(e) => { setFilterPhotos(e.target.value); updateUrl(filterArea, filterCategory, e.target.value, searchQuery, viewMode); }}
              className={`text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent ${
                filterPhotos === "missing" ? "border-amber-300 bg-amber-50" : "border-gray-200"
              }`}
            >
              <option value="all">All Photos</option>
              <option value="missing">Missing Photos</option>
            </select>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => { setViewMode("grid"); updateUrl(filterArea, filterCategory, filterPhotos, searchQuery, "grid"); }}
                className={`px-3 py-2 text-sm ${
                  viewMode === "grid"
                    ? "bg-accent text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => { setViewMode("table"); updateUrl(filterArea, filterCategory, filterPhotos, searchQuery, "table"); }}
                className={`px-3 py-2 text-sm ${
                  viewMode === "table"
                    ? "bg-accent text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                Table
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-4">
            Showing {filteredSpots.length} of {spots.length} spots
          </p>

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSpots.map((spot) => (
                <Link
                  key={spot.id}
                  href={editUrl(spot.id)}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-accent/30 transition-all group block"
                >
                  {/* Main photo */}
                  <div className="relative h-40 bg-gray-100">
                    {spot.photoUrls?.[0] ? (
                      <img
                        src={spot.photoUrls[0]}
                        alt={spot.nameEn}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
                        No Photo
                      </div>
                    )}
                    {/* Photo count badge */}
                    <span className="absolute top-2 right-2 text-[10px] font-medium bg-black/50 text-white px-2 py-0.5 rounded-full">
                      {spot.photoUrls?.length || 0} photos
                    </span>
                    {/* Area badge */}
                    <span className="absolute top-2 left-2 text-[10px] font-medium bg-white/90 text-gray-700 px-2 py-0.5 rounded-full">
                      {spot.area.charAt(0).toUpperCase() + spot.area.slice(1)}
                    </span>
                  </div>

                  {/* Photo strip - show all photos small */}
                  {spot.photoUrls && spot.photoUrls.length > 1 && (
                    <div className="flex gap-1 p-1 bg-gray-50">
                      {spot.photoUrls.map((url, i) => (
                        <div key={i} className="relative w-1/3 h-12 rounded overflow-hidden">
                          <img
                            src={url}
                            alt={`${spot.nameEn} ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                          {spot.nameEn}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">{spot.nameJa}</p>
                      </div>
                      <button
                        onClick={(e) => toggleFeatured(e, spot.id, !!spot.isFeatured)}
                        className={`flex-shrink-0 text-lg leading-none transition-colors ${
                          spot.isFeatured ? "text-amber-400" : "text-gray-200 hover:text-amber-300"
                        }`}
                        title={spot.isFeatured ? "Remove from Popular" : "Mark as Popular"}
                      >
                        ★
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        {spot.category}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        ~{spot.avgDurationMin} min
                      </span>
                      <span className={`ml-auto w-2 h-2 rounded-full ${SEO_DOT_COLORS[getSeoQuality(spot)]}`} title={`SEO: ${getSeoQuality(spot)}`} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Table View */}
          {viewMode === "table" && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                      Photo
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                      Name
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                      Area
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                      Category
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">
                      Photos
                    </th>
                    <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">
                      Duration
                    </th>
                    <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">
                      SEO
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSpots.map((spot) => (
                    <tr
                      key={spot.id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => router.push(editUrl(spot.id))}
                    >
                      <td className="px-4 py-3">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {spot.photoUrls?.[0] ? (
                            <img
                              src={spot.photoUrls[0]}
                              alt={spot.nameEn}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                              N/A
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">
                          {spot.nameEn}
                        </p>
                        <p className="text-xs text-gray-400">{spot.nameJa}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                          {spot.area.charAt(0).toUpperCase() + spot.area.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-xs text-gray-500">
                          {spot.category.charAt(0).toUpperCase() + spot.category.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className={`text-xs font-medium ${
                          (spot.photoUrls?.length || 0) === 0
                            ? "text-red-500"
                            : (spot.photoUrls?.length || 0) < 3
                            ? "text-amber-500"
                            : "text-green-600"
                        }`}>
                          {spot.photoUrls?.length || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right hidden lg:table-cell">
                        <span className="text-xs text-gray-400">
                          ~{spot.avgDurationMin} min
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center hidden lg:table-cell">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${SEO_DOT_COLORS[getSeoQuality(spot)]}`} title={`SEO: ${getSeoQuality(spot)}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredSpots.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-400 text-lg mb-2">No spots found</p>
              <p className="text-gray-400 text-sm">
                Try adjusting your filters or search query.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
