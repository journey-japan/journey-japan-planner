-- Add featured flag to spots table
ALTER TABLE spots ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;

-- Index for quick featured spot queries
CREATE INDEX IF NOT EXISTS spots_is_featured_idx ON spots (is_featured) WHERE is_featured = true;
