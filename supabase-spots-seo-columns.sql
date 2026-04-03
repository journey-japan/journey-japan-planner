-- Add SEO columns to spots table
ALTER TABLE spots ADD COLUMN IF NOT EXISTS meta_title text;
ALTER TABLE spots ADD COLUMN IF NOT EXISTS meta_description text;
ALTER TABLE spots ADD COLUMN IF NOT EXISTS slug text;

-- Add unique constraint on slug (allowing nulls)
CREATE UNIQUE INDEX IF NOT EXISTS spots_slug_unique ON spots (slug) WHERE slug IS NOT NULL;
