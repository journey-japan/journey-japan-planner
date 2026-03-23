import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getBlogPostBySlug } from "@/lib/db";
import BlogContent from "@/components/blog/BlogContent";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.featuredImageUrl ? [{ url: post.featuredImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImageUrl ? [post.featuredImageUrl] : undefined,
    },
  };
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  // JSON-LD for article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.featuredImageUrl,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.displayName,
        }
      : {
          "@type": "Organization",
          name: "Journey Japan",
        },
    publisher: {
      "@type": "Organization",
      name: "Journey Japan",
      url: "https://plan.journeyjpn.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto px-6 pt-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-600 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-600 truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>
        </div>

        {/* Article Header */}
        <article className="max-w-3xl mx-auto px-6 py-8">
          <div className="mb-6">
            <span className="text-xs font-semibold text-accent bg-accent-light px-2.5 py-1 rounded-full">
              {categoryLabel(post.category)}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatarUrl ? (
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.displayName}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-medium">
                    {post.author.displayName[0]?.toUpperCase() || "J"}
                  </div>
                )}
                <span className="font-medium text-gray-700">
                  {post.author.displayName}
                </span>
              </div>
            )}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            )}
            <span>{post.viewCount.toLocaleString()} views</span>
          </div>

          {/* Featured Image */}
          {post.featuredImageUrl && (
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10">
              <Image
                src={post.featuredImageUrl}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Article Body */}
          <BlogContent content={post.content} />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-200">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="text-sm text-accent font-medium hover:underline"
            >
              &larr; Back to Blog
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
