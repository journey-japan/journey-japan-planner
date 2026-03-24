"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { BLOG_CATEGORIES } from "@/types";
import type { BlogCategory } from "@/types";
import { validateBlogPost } from "@/lib/security";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export default function BlogEditorPage() {
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<BlogCategory>("guides");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user || !profile?.is_pro) {
      router.push("/");
      return;
    }

    if (!isNew) {
      fetchPost();
    }
  }, [user, profile, authLoading, isNew, router]);

  async function fetchPost() {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      router.push("/admin/blog");
      return;
    }

    setTitle(data.title || "");
    setSlug(data.slug || "");
    setExcerpt(data.excerpt || "");
    setContent(data.content || "");
    setCategory((data.category as BlogCategory) || "guides");
    setFeaturedImageUrl(data.featured_image_url || "");
    setTags((data.tags as string[])?.join(", ") || "");
    setMetaTitle(data.meta_title || "");
    setMetaDescription(data.meta_description || "");
    setStatus(data.status as "draft" | "published");
    setSlugManuallyEdited(true);
    setLoading(false);
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugManuallyEdited) {
      setSlug(generateSlug(value));
    }
  }

  async function handleSave(publishStatus: "draft" | "published") {
    const validationError = validateBlogPost({
      title,
      slug,
      excerpt,
      content,
      category,
      featuredImageUrl: featuredImageUrl || undefined,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
    });

    if (validationError) {
      alert(validationError);
      return;
    }

    setSaving(true);

    const row: Record<string, unknown> = {
      slug: slug.trim(),
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content,
      category,
      featured_image_url: featuredImageUrl.trim() || null,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      meta_title: metaTitle.trim() || null,
      meta_description: metaDescription.trim() || null,
      author_id: user!.id,
      status: publishStatus,
      updated_at: new Date().toISOString(),
    };

    // Set published_at on first publish
    if (publishStatus === "published") {
      if (isNew || status === "draft") {
        row.published_at = new Date().toISOString();
      }
    }

    let result;
    if (isNew) {
      result = await supabase
        .from("blog_posts")
        .insert(row)
        .select("id")
        .single();
    } else {
      result = await supabase
        .from("blog_posts")
        .update(row)
        .eq("id", id)
        .select("id")
        .single();
    }

    setSaving(false);

    if (result.error) {
      alert(`Error: ${result.error.message}`);
      return;
    }

    router.push("/admin/blog");
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
      <main className="min-h-screen bg-gray-50">
        <section className="max-w-4xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link
                href="/admin/blog"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                &larr; Back to Blog Management
              </Link>
              <h1 className="text-2xl font-bold mt-2">
                {isNew ? "New Article" : "Edit Article"}
              </h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSave("draft")}
                disabled={saving}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                Save Draft
              </button>
              <button
                onClick={() => handleSave("published")}
                disabled={saving}
                className="text-sm font-medium text-white bg-accent hover:bg-accent-hover px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Publish"}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Article title..."
                className="w-full text-lg font-medium border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              />

              <label className="block text-sm font-semibold text-gray-700 mt-4 mb-2">
                Slug (URL)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugManuallyEdited(true);
                  }}
                  placeholder="article-slug"
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                />
              </div>
            </div>

            {/* Category & Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BlogCategory)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary shown on the blog list page..."
                rows={3}
                className="w-full text-sm border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
              />
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content (Markdown)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article in Markdown format..."
                rows={20}
                className="w-full text-sm font-mono border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-y"
              />
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                SEO Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Custom title for search engines (optional)"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Custom description for search engines (optional)"
                    rows={2}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="baseball, NPB, sports, Tokyo"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end gap-2 pb-10">
              <button
                onClick={() => handleSave("draft")}
                disabled={saving}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                Save Draft
              </button>
              <button
                onClick={() => handleSave("published")}
                disabled={saving}
                className="text-sm font-medium text-white bg-accent hover:bg-accent-hover px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Publish"}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
