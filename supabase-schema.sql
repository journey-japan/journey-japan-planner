-- ============================================
-- Journey Japan Planner - Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. USERS (profiles) テーブル
-- auth.users と連携するプロフィールテーブル
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  is_pro BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SPOTS テーブル
CREATE TABLE public.spots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  google_place_id TEXT,
  name_en TEXT NOT NULL,
  name_ja TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL,
  area TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  photo_urls TEXT[] DEFAULT '{}',
  opening_hours JSONB,
  admission_fee TEXT,
  avg_duration_min INTEGER NOT NULL DEFAULT 60,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. ITINERARIES テーブル
CREATE TABLE public.itineraries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  area TEXT NOT NULL DEFAULT 'tokyo',
  duration_days INTEGER NOT NULL DEFAULT 1,
  start_date DATE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  is_pro BOOLEAN NOT NULL DEFAULT FALSE,
  cover_image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  copied_from UUID REFERENCES public.itineraries(id) ON DELETE SET NULL,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. ITINERARY_DAYS テーブル
CREATE TABLE public.itinerary_days (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  itinerary_id UUID REFERENCES public.itineraries(id) ON DELETE CASCADE NOT NULL,
  day_number INTEGER NOT NULL,
  date DATE,
  title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. ITINERARY_ITEMS テーブル
CREATE TABLE public.itinerary_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day_id UUID REFERENCES public.itinerary_days(id) ON DELETE CASCADE NOT NULL,
  spot_id UUID REFERENCES public.spots(id) ON DELETE CASCADE NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  start_time TEXT,
  duration_minutes INTEGER,
  note TEXT,
  transport_to_next JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_itineraries_user_id ON public.itineraries(user_id);
CREATE INDEX idx_itineraries_area ON public.itineraries(area);
CREATE INDEX idx_itineraries_status ON public.itineraries(status);
CREATE INDEX idx_itinerary_days_itinerary_id ON public.itinerary_days(itinerary_id);
CREATE INDEX idx_itinerary_items_day_id ON public.itinerary_items(day_id);
CREATE INDEX idx_spots_area ON public.spots(area);
CREATE INDEX idx_spots_category ON public.spots(category);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Spots (everyone can read, only admin can modify)
ALTER TABLE public.spots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Spots are viewable by everyone"
  ON public.spots FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert spots"
  ON public.spots FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_pro = true)
  );

-- Itineraries
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published itineraries are viewable by everyone"
  ON public.itineraries FOR SELECT
  USING (status = 'published' OR auth.uid() = user_id);

CREATE POLICY "Users can create itineraries"
  ON public.itineraries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own itineraries"
  ON public.itineraries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own itineraries"
  ON public.itineraries FOR DELETE
  USING (auth.uid() = user_id);

-- Itinerary Days
ALTER TABLE public.itinerary_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Days viewable if itinerary is viewable"
  ON public.itinerary_days FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.itineraries
      WHERE id = itinerary_days.itinerary_id
      AND (status = 'published' OR auth.uid() = user_id)
    )
  );

CREATE POLICY "Users can manage days of own itineraries"
  ON public.itinerary_days FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.itineraries
      WHERE id = itinerary_days.itinerary_id AND auth.uid() = user_id
    )
  );

CREATE POLICY "Users can update days of own itineraries"
  ON public.itinerary_days FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.itineraries
      WHERE id = itinerary_days.itinerary_id AND auth.uid() = user_id
    )
  );

CREATE POLICY "Users can delete days of own itineraries"
  ON public.itinerary_days FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.itineraries
      WHERE id = itinerary_days.itinerary_id AND auth.uid() = user_id
    )
  );

-- Itinerary Items
ALTER TABLE public.itinerary_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Items viewable if day's itinerary is viewable"
  ON public.itinerary_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.itinerary_days d
      JOIN public.itineraries i ON i.id = d.itinerary_id
      WHERE d.id = itinerary_items.day_id
      AND (i.status = 'published' OR auth.uid() = i.user_id)
    )
  );

CREATE POLICY "Users can manage items of own itineraries"
  ON public.itinerary_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.itinerary_days d
      JOIN public.itineraries i ON i.id = d.itinerary_id
      WHERE d.id = itinerary_items.day_id AND auth.uid() = i.user_id
    )
  );

CREATE POLICY "Users can update items of own itineraries"
  ON public.itinerary_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.itinerary_days d
      JOIN public.itineraries i ON i.id = d.itinerary_id
      WHERE d.id = itinerary_items.day_id AND auth.uid() = i.user_id
    )
  );

CREATE POLICY "Users can delete items of own itineraries"
  ON public.itinerary_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.itinerary_days d
      JOIN public.itineraries i ON i.id = d.itinerary_id
      WHERE d.id = itinerary_items.day_id AND auth.uid() = i.user_id
    )
  );

-- ============================================
-- FUNCTION: Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- SEED DATA: Sample Spots (Tokyo)
-- ============================================
INSERT INTO public.spots (id, name_en, name_ja, description, category, area, lat, lng, address, admission_fee, avg_duration_min) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Meiji Jingu Shrine', '明治神宮', 'A serene Shinto shrine in the heart of Tokyo, surrounded by a lush forest. Dedicated to Emperor Meiji and Empress Shoken.', 'shrine', 'tokyo', 35.6764, 139.6993, '1-1 Yoyogikamizonocho, Shibuya City, Tokyo', 'Free', 60),
  ('a1000000-0000-0000-0000-000000000002', 'Takeshita Street', '竹下通り', 'A vibrant pedestrian street in Harajuku famous for trendy shops, quirky fashion, crepe stands, and youth culture.', 'shopping', 'tokyo', 35.6702, 139.7026, 'Jingumae, Shibuya City, Tokyo', NULL, 75),
  ('a1000000-0000-0000-0000-000000000003', 'Shibuya Crossing & Hachiko', '渋谷スクランブル交差点', 'The world''s busiest pedestrian crossing and the iconic Hachiko dog statue. A must-see Tokyo landmark.', 'landmark', 'tokyo', 35.6595, 139.7004, 'Shibuya, Tokyo', NULL, 30),
  ('a1000000-0000-0000-0000-000000000004', 'Shibuya Sky', '渋谷スカイ', 'An open-air observation deck on the 46th floor of Shibuya Scramble Square, offering 360-degree views of Tokyo.', 'observation', 'tokyo', 35.6580, 139.7022, 'Shibuya Scramble Square, 2-24-12 Shibuya, Tokyo', '¥2,000', 60),
  ('a1000000-0000-0000-0000-000000000005', 'Fuunji Tsukemen', '風雲児', 'One of Tokyo''s most famous tsukemen (dipping ramen) shops. Known for rich, flavorful broth and thick noodles.', 'restaurant', 'tokyo', 35.6904, 139.6977, 'Yoyogi, Shibuya City, Tokyo', NULL, 45),
  ('a1000000-0000-0000-0000-000000000006', 'teamLab Borderless', 'チームラボ ボーダレス', 'An immersive digital art museum where artworks move, flow, and blend into one another. A must-visit for art lovers.', 'museum', 'tokyo', 35.6585, 139.7380, 'Azabudai Hills, Minato City, Tokyo', '¥3,800', 120),
  ('a1000000-0000-0000-0000-000000000007', 'Senso-ji Temple', '浅草寺', 'Tokyo''s oldest temple, featuring the iconic Kaminarimon gate and Nakamise shopping street.', 'temple', 'tokyo', 35.7148, 139.7967, '2-3-1 Asakusa, Taito City, Tokyo', 'Free', 60),
  ('a1000000-0000-0000-0000-000000000008', 'Akihabara Electric Town', '秋葉原', 'The epicenter of anime, manga, and electronics culture. Endless shops for otaku goods and tech gadgets.', 'shopping', 'tokyo', 35.7023, 139.7745, 'Sotokanda, Chiyoda City, Tokyo', NULL, 120),
  ('a1000000-0000-0000-0000-000000000009', 'Tsukiji Outer Market', '築地場外市場', 'A bustling food market with fresh sushi, tamagoyaki, seafood snacks, and kitchen supplies.', 'market', 'tokyo', 35.6654, 139.7707, 'Tsukiji, Chuo City, Tokyo', NULL, 90),
  ('a1000000-0000-0000-0000-000000000010', 'Tokyo Skytree', '東京スカイツリー', 'At 634m, it''s the tallest tower in the world. Two observation decks offer breathtaking views of the city.', 'observation', 'tokyo', 35.7101, 139.8107, '1-1-2 Oshiage, Sumida City, Tokyo', '¥2,100', 60),
  ('a1000000-0000-0000-0000-000000000011', 'Shinjuku Gyoen', '新宿御苑', 'A beautiful park with Japanese, English, and French gardens. One of Tokyo''s best cherry blossom spots.', 'park', 'tokyo', 35.6852, 139.7100, '11 Naitocho, Shinjuku City, Tokyo', '¥500', 90),
  ('a1000000-0000-0000-0000-000000000012', 'Imperial Palace Gardens', '皇居外苑', 'The grounds surrounding the Imperial Palace, with beautiful gardens and historic stone walls.', 'park', 'tokyo', 35.6852, 139.7528, '1-1 Chiyoda, Chiyoda City, Tokyo', 'Free', 60);
