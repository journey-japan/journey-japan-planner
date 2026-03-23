-- ============================================
-- Journey Japan - Blog Posts Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. BLOG_POSTS テーブル
CREATE TABLE public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'guides' CHECK (category IN ('guides', 'news', 'tips')),
  featured_image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  view_count INTEGER NOT NULL DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Published posts are viewable by everyone
CREATE POLICY "Published blog posts are viewable by everyone"
  ON public.blog_posts FOR SELECT
  USING (status = 'published' OR auth.uid() = author_id);

-- Only pro users (admin) can insert
CREATE POLICY "Only admins can insert blog posts"
  ON public.blog_posts FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_pro = true)
  );

-- Only pro users (admin) can update
CREATE POLICY "Only admins can update blog posts"
  ON public.blog_posts FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_pro = true)
  );

-- Only pro users (admin) can delete
CREATE POLICY "Only admins can delete blog posts"
  ON public.blog_posts FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_pro = true)
  );
