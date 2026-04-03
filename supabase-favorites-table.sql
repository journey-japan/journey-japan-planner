-- Favorites table: users can bookmark spots for later
CREATE TABLE IF NOT EXISTS favorites (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  spot_id uuid NOT NULL REFERENCES spots(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, spot_id)
);

-- RLS: users can only manage their own favorites
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON favorites (user_id);
CREATE INDEX IF NOT EXISTS favorites_spot_id_idx ON favorites (spot_id);
