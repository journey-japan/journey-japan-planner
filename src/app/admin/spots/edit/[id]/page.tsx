"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { AREAS, SPOT_CATEGORIES } from "@/types";
import type { Area, SpotCategory } from "@/types";
import { validateSpot } from "@/lib/security";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export default function SpotEditorPage() {
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
      <SpotEditorContent />
    </Suspense>
  );
}

function SpotEditorContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const isNew = id === "new";
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();

  // Preserve list page filters for back navigation
  const backUrl = "/admin/spots" + (searchParams.get("back") ? `?${searchParams.get("back")}` : "");

  const [nameEn, setNameEn] = useState("");
  const [nameJa, setNameJa] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<SpotCategory>("landmark");
  const [area, setArea] = useState<Area>("tokyo");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [address, setAddress] = useState("");
  const [googlePlaceId, setGooglePlaceId] = useState("");
  const [photoUrls, setPhotoUrls] = useState<string[]>([""]);
  const [admissionFee, setAdmissionFee] = useState("");
  const [admissionFeeCurrency, setAdmissionFeeCurrency] = useState("JPY");
  const [avgDurationMin, setAvgDurationMin] = useState("");
  const [openingHoursJson, setOpeningHoursJson] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [photoErrors, setPhotoErrors] = useState<Record<number, boolean>>({});
  const [uploading, setUploading] = useState(false);
  const [generatingDesc, setGeneratingDesc] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !profile?.is_pro) {
      router.push("/");
      return;
    }
    if (!isNew) {
      fetchSpot();
    }
  }, [user, profile, authLoading, isNew, router]);

  async function fetchSpot() {
    setLoading(true);
    const { data, error } = await supabase
      .from("spots")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      router.push(backUrl);
      return;
    }

    setNameEn(data.name_en || "");
    setNameJa(data.name_ja || "");
    setDescription(data.description || "");
    setCategory((data.category as SpotCategory) || "landmark");
    setArea((data.area as Area) || "tokyo");
    setLat(String(data.lat ?? ""));
    setLng(String(data.lng ?? ""));
    setAddress(data.address || "");
    setGooglePlaceId(data.google_place_id || "");
    const urls = (data.photo_urls as string[]) || [];
    setPhotoUrls(urls.length > 0 ? urls : [""]);
    setAdmissionFee(data.admission_fee != null ? String(data.admission_fee) : "");
    setAdmissionFeeCurrency(data.admission_fee_currency || "JPY");
    setAvgDurationMin(data.avg_duration_min != null ? String(data.avg_duration_min) : "");
    setOpeningHoursJson(
      data.opening_hours ? JSON.stringify(data.opening_hours, null, 2) : ""
    );
    setSlug(data.slug || "");
    setMetaTitle(data.meta_title || "");
    setMetaDescription(data.meta_description || "");
    if (data.slug) setSlugManuallyEdited(true);
    setLoading(false);
  }

  async function handleSave() {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    const durationNum = parseInt(avgDurationMin, 10);
    const feeNum = admissionFee.trim() ? parseFloat(admissionFee) : undefined;

    const validationError = validateSpot({
      nameEn,
      nameJa,
      description,
      category,
      area,
      lat: latNum,
      lng: lngNum,
      address,
      photoUrls: photoUrls.filter((u) => u.trim()),
      avgDurationMin: durationNum,
      admissionFee: feeNum,
    });

    if (validationError) {
      alert(validationError);
      return;
    }

    let openingHours = null;
    if (openingHoursJson.trim()) {
      try {
        openingHours = JSON.parse(openingHoursJson);
      } catch {
        alert("Opening Hours JSON is invalid.");
        return;
      }
    }

    setSaving(true);

    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    const body = {
      name_en: nameEn,
      name_ja: nameJa,
      description,
      category,
      area,
      lat: latNum,
      lng: lngNum,
      address,
      google_place_id: googlePlaceId || null,
      photo_urls: photoUrls.filter((u) => u.trim()),
      admission_fee: feeNum ?? null,
      admission_fee_currency: admissionFeeCurrency,
      avg_duration_min: durationNum,
      opening_hours: openingHours,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      slug: slug || null,
    };

    const url = isNew ? "/api/admin/spots" : `/api/admin/spots/${id}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      alert(`Error: ${data.error}`);
      return;
    }

    router.push(backUrl);
  }

  async function handleGenerateDescription() {
    if (!nameEn.trim()) {
      alert("Enter the English name first.");
      return;
    }

    setGeneratingDesc(true);

    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    const res = await fetch("/api/admin/spots/generate-description", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name_en: nameEn,
        name_ja: nameJa,
        category,
        area,
        address,
        admission_fee: admissionFee ? parseFloat(admissionFee) : null,
        avg_duration_min: avgDurationMin ? parseInt(avgDurationMin) : null,
        existing_description: description,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setDescription(data.description);
    } else {
      const data = await res.json();
      alert(`Error: ${data.error}`);
    }

    setGeneratingDesc(false);
  }

  async function handleDelete() {
    if (!confirm(`Delete "${nameEn}"? This cannot be undone.`)) return;

    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    const res = await fetch(`/api/admin/spots/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      router.push(backUrl);
    } else {
      const data = await res.json();
      alert(`Error: ${data.error}`);
    }
  }

  async function handleUploadPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      // Generate a unique path: area/spot-name/timestamp-filename
      const safeName = nameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "spot";
      const timestamp = Date.now();
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${area}/${safeName}/${timestamp}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error } = await supabase.storage
        .from("spot-images")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (error) {
        alert(`Upload failed for ${file.name}: ${error.message}`);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("spot-images")
        .getPublicUrl(path);

      newUrls.push(urlData.publicUrl);
    }

    if (newUrls.length > 0) {
      // Replace empty entries or append
      const cleaned = photoUrls.filter((u) => u.trim());
      setPhotoUrls([...cleaned, ...newUrls]);
    }

    setUploading(false);
    // Reset file input
    e.target.value = "";
  }

  function addPhotoUrl() {
    setPhotoUrls([...photoUrls, ""]);
  }

  function removePhotoUrl(index: number) {
    setPhotoUrls(photoUrls.filter((_, i) => i !== index));
    setPhotoErrors((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  }

  function updatePhotoUrl(index: number, value: string) {
    const updated = [...photoUrls];
    updated[index] = value;
    setPhotoUrls(updated);
    // Reset error state when URL changes
    setPhotoErrors((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  }

  function movePhoto(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= photoUrls.length) return;
    const updated = [...photoUrls];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setPhotoUrls(updated);
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

  const inputClass =
    "w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="max-w-4xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link
                href={backUrl}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                &larr; Back to Spot Management
              </Link>
              <h1 className="text-2xl font-bold mt-2">
                {isNew ? "New Spot" : "Edit Spot"}
              </h1>
              {!isNew && (
                <p className="text-xs text-gray-400 mt-1">{nameEn}</p>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="text-sm font-medium text-white bg-accent hover:bg-accent-hover px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Name (English) *
                  </label>
                  <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => {
                      setNameEn(e.target.value);
                      if (!slugManuallyEdited) {
                        setSlug(generateSlug(e.target.value));
                      }
                    }}
                    placeholder="Meiji Jingu Shrine"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Name (Japanese) *
                  </label>
                  <input
                    type="text"
                    value={nameJa}
                    onChange={(e) => setNameJa(e.target.value)}
                    placeholder="明治神宮"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-gray-500">
                    Description *
                  </label>
                  <button
                    onClick={handleGenerateDescription}
                    disabled={generatingDesc}
                    className={`text-xs font-medium transition-colors ${
                      generatingDesc
                        ? "text-gray-400"
                        : "text-accent hover:text-accent-hover"
                    }`}
                  >
                    {generatingDesc ? "Generating..." : "AI Generate"}
                  </button>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief description of this spot..."
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
                <p className={`text-xs mt-1 ${
                  description.length < 80
                    ? "text-red-500"
                    : description.length < 120
                    ? "text-amber-500"
                    : "text-green-600"
                }`}>
                  {description.length} chars
                  {description.length < 80
                    ? " — Too short for SEO"
                    : description.length < 120
                    ? " — Acceptable"
                    : " — Good"}
                </p>
              </div>
            </div>

            {/* Location & Category */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Location & Category
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Area *
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value as Area)}
                    className={inputClass}
                  >
                    {AREAS.map((a) => (
                      <option key={a.value} value={a.value}>
                        {a.emoji} {a.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SpotCategory)}
                    className={inputClass}
                  >
                    {SPOT_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="1-1 Yoyogikamizonocho, Shibuya City, Tokyo"
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Latitude *
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="35.6764"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Longitude *
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    placeholder="139.6993"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Google Place ID
                  </label>
                  <input
                    type="text"
                    value={googlePlaceId}
                    onChange={(e) => setGooglePlaceId(e.target.value)}
                    placeholder="ChIJ..."
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700">
                  Photos ({photoUrls.filter((u) => u.trim()).length})
                </h2>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://unsplash.com/s/photos/${encodeURIComponent(nameEn + " " + area + " Japan")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
                  >
                    Search Unsplash <span className="text-gray-300">↗</span>
                  </a>
                  <label className={`text-xs font-medium text-white bg-accent hover:bg-accent-hover px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                    {uploading ? "Uploading..." : "Upload Photos"}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleUploadPhotos}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  <button
                    onClick={addPhotoUrl}
                    className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    + Add URL
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {photoUrls.map((url, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    {/* Preview */}
                    <div
                      className={`w-40 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border-2 ${
                        photoErrors[index]
                          ? "border-red-300"
                          : "border-transparent"
                      }`}
                    >
                      {url.trim() ? (
                        <img
                          src={url}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={() =>
                            setPhotoErrors((prev) => ({ ...prev, [index]: true }))
                          }
                          onLoad={() =>
                            setPhotoErrors((prev) => {
                              const next = { ...prev };
                              delete next[index];
                              return next;
                            })
                          }
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                          Paste URL
                        </div>
                      )}
                    </div>

                    {/* URL input + controls */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-4 flex-shrink-0">
                          {index + 1}.
                        </span>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => updatePhotoUrl(index, e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className={`flex-1 text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all ${
                            photoErrors[index]
                              ? "border-red-300 bg-red-50"
                              : "border-gray-200"
                          }`}
                        />
                      </div>
                      {photoErrors[index] && (
                        <p className="text-xs text-red-500 mt-1 ml-6">
                          Image failed to load — check the URL
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2 ml-6">
                        <button
                          onClick={() => movePhoto(index, -1)}
                          disabled={index === 0}
                          className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30 px-1.5 py-0.5 rounded hover:bg-gray-100"
                        >
                          ↑ Up
                        </button>
                        <button
                          onClick={() => movePhoto(index, 1)}
                          disabled={index === photoUrls.length - 1}
                          className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30 px-1.5 py-0.5 rounded hover:bg-gray-100"
                        >
                          ↓ Down
                        </button>
                        <button
                          onClick={() => removePhotoUrl(index)}
                          className="text-xs text-red-400 hover:text-red-600 px-1.5 py-0.5 rounded hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700">
                  SEO Settings
                </h2>
                <button
                  onClick={() => {
                    if (!nameEn.trim()) {
                      alert("Enter the English name first.");
                      return;
                    }
                    const areaLabel = area.charAt(0).toUpperCase() + area.slice(1);
                    // Slug
                    setSlug(generateSlug(nameEn));
                    setSlugManuallyEdited(true);
                    // Meta Title (under 60 chars)
                    const fullTitle = `${nameEn.trim()} — ${areaLabel} Guide | Journey Japan`;
                    setMetaTitle(
                      fullTitle.length <= 60
                        ? fullTitle
                        : `${nameEn.trim()} | Journey Japan`
                    );
                    // Meta Description (120-160 chars)
                    const desc = description.trim();
                    if (desc.length >= 120 && desc.length <= 160) {
                      setMetaDescription(desc);
                    } else if (desc.length > 160) {
                      // Truncate at last sentence/word boundary before 157 chars + "..."
                      const truncated = desc.slice(0, 157);
                      const lastSpace = truncated.lastIndexOf(" ");
                      setMetaDescription(truncated.slice(0, lastSpace > 100 ? lastSpace : 157) + "...");
                    } else if (desc) {
                      // Short description — append area context
                      const suffix = ` Plan your ${areaLabel} visit with Journey Japan.`;
                      const combined = desc.endsWith(".") ? desc + suffix : desc + "." + suffix;
                      setMetaDescription(combined.length <= 160 ? combined : combined.slice(0, 157) + "...");
                    }
                  }}
                  className="text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                >
                  Auto-generate
                </button>
              </div>

              {/* Slug */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(generateSlug(e.target.value));
                    setSlugManuallyEdited(true);
                  }}
                  placeholder="meiji-jingu-shrine"
                  className={inputClass}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Preview: /spots/{slug || "..."}
                </p>
              </div>

              {/* Meta Title */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={nameEn || "Page title for search engines"}
                  className={inputClass}
                />
                <p className={`text-xs mt-1 ${
                  metaTitle.length > 60 ? "text-amber-500" : "text-gray-400"
                }`}>
                  {metaTitle.length}/60 chars
                  {metaTitle.length > 60 ? " — Consider shortening" : ""}
                </p>
              </div>

              {/* Meta Description */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Meta Description
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="A concise summary for search engine results..."
                  rows={2}
                  className={`${inputClass} resize-none`}
                />
                <p className={`text-xs mt-1 ${
                  metaDescription.length === 0
                    ? "text-gray-400"
                    : metaDescription.length < 120
                    ? "text-amber-500"
                    : metaDescription.length <= 160
                    ? "text-green-600"
                    : "text-amber-500"
                }`}>
                  {metaDescription.length}/160 chars
                  {metaDescription.length > 0 && metaDescription.length < 120
                    ? " — Too short"
                    : metaDescription.length > 160
                    ? " — Consider shortening"
                    : metaDescription.length >= 120
                    ? " — Good"
                    : " — Recommended: 120-160 chars"}
                </p>
              </div>

              {/* Google Search Preview */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Google Search Preview
                </label>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <p className="text-lg text-blue-700 leading-snug truncate">
                    {metaTitle || nameEn || "Spot Title"}
                  </p>
                  <p className="text-sm text-green-700 mt-0.5 truncate">
                    plan.journeyjpn.com/spots/{slug || "..."}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {metaDescription || (description ? description.slice(0, 160) : "No description available.")}
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Avg Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    value={avgDurationMin}
                    onChange={(e) => setAvgDurationMin(e.target.value)}
                    placeholder="60"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Admission Fee
                  </label>
                  <input
                    type="number"
                    value={admissionFee}
                    onChange={(e) => setAdmissionFee(e.target.value)}
                    placeholder="0 = Free, empty = N/A"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Currency
                  </label>
                  <input
                    type="text"
                    value={admissionFeeCurrency}
                    onChange={(e) => setAdmissionFeeCurrency(e.target.value)}
                    placeholder="JPY"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Opening Hours (JSON, optional)
                </label>
                <textarea
                  value={openingHoursJson}
                  onChange={(e) => setOpeningHoursJson(e.target.value)}
                  placeholder='{"mon": "9:00-17:00", "tue": "9:00-17:00", ...}'
                  rows={4}
                  className={`${inputClass} font-mono text-xs resize-y`}
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center pb-10">
              <Link
                href={backUrl}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                &larr; Cancel
              </Link>
              <div className="flex items-center gap-3">
                {!isNew && (
                  <button
                    onClick={handleDelete}
                    className="text-sm font-medium text-red-500 hover:text-red-700 px-4 py-2.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                  >
                    Delete Spot
                  </button>
                )}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="text-sm font-medium text-white bg-accent hover:bg-accent-hover px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Spot"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
