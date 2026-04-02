-- ============================================
-- Journey Japan - Kyoto Image Quality Fixes
-- Generated: 2026-03-29
-- Fixes: 6 spots with missing, duplicate, or incorrect images
-- Run this in Supabase SQL Editor AFTER the original images SQL
-- ============================================

-- 1. Teramachi & Shinkyogoku Shopping Streets (寺町通 & 新京極) - NEW (was missing)
-- Photo by Kate Wells on Unsplash - Colorful arched ceiling over a busy street market
-- Photo by Clay Banks on Unsplash - people walking on streets during nighttime
-- Photo by Bruce Tang on Unsplash - people walking on street during daytime
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1763475775262-3d5ef2b1bcc3?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwzfHxUZXJhbWFjaGklMjBTaGlua3lvZ29rdSUyMHNob3BwaW5nJTIwc3RyZWV0JTIwS3lvdG98ZW58MHx8fHwxNzc0ODM0Njg5fDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1498011902480-fb2daedb8123?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwxfHxUZXJhbWFjaGklMjBTaGlua3lvZ29rdSUyMHNob3BwaW5nJTIwc3RyZWV0JTIwS3lvdG98ZW58MHx8fHwxNzc0ODM0Njg5fDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1603245467281-b79c86b148c5?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHw1fHxUZXJhbWFjaGklMjBTaGlua3lvZ29rdSUyMHNob3BwaW5nJTIwc3RyZWV0JTIwS3lvdG98ZW58MHx8fHwxNzc0ODM0Njg5fDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'
] WHERE id = 'b2000000-0000-0000-0000-000000000020';

-- 2. Kitano Tenmangu (北野天満宮) - REPLACED (was generic forest/river photos)
-- Photo by Tom Ru on Unsplash - A japanese shinto shrine stands in an outdoor area
-- Photo by KIBOCK DO on Unsplash - Traditional japanese shrine roof with winter trees
-- Photo by Kazuhiro Yoshimura on Unsplash - A red and green building with a yellow door
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1752338644784-8badb518eefb?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwyfHxLaXRhbm8lMjBUZW5tYW5ndSUyMHNocmluZSUyMGphcGFuJTIwdW1lfGVufDB8fHx8MTc3NDgzNDczMHww&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1759043164235-4611920869e1?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwzfHxLaXRhbm8lMjBUZW5tYW5ndSUyMHNocmluZSUyMGphcGFuJTIwdW1lfGVufDB8fHx8MTc3NDgzNDczMHww&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1727698285403-0f7fd3022a68?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHw1fHxLaXRhbm8lMjBUZW5tYW5ndSUyMHNocmluZSUyMGphcGFuJTIwdW1lfGVufDB8fHx8MTc3NDgzNDczMHww&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'
] WHERE id = 'b2000000-0000-0000-0000-000000000003';

-- 3. Sanjusangen-do (三十三間堂) - REPLACED (was duplicates from Kitano Tenmangu)
-- Photo by Jeremy Huang on Unsplash - Japanese temple with people walking up stairs
-- Photo by Pourya Gohari on Unsplash - a large building with a lot of windows on top of it
-- Photo by Pourya Gohari on Unsplash - a building with a clock on the top of it
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1754672519563-a5f7c26927dd?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwxfHxTYW5qdXNhbmdlbmRvJTIwdGVtcGxlJTIwS3lvdG98ZW58MHx8fHwxNzc0ODM0NjkyfDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1694720366008-66bf073f204a?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwyfHxTYW5qdXNhbmdlbmRvJTIwdGVtcGxlJTIwS3lvdG98ZW58MHx8fHwxNzc0ODM0NjkyfDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1694720854201-675fdc96210a?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwzfHxTYW5qdXNhbmdlbmRvJTIwdGVtcGxlJTIwS3lvdG98ZW58MHx8fHwxNzc0ODM0NjkyfDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'
] WHERE id = 'b2000000-0000-0000-0000-000000000010';

-- 4. Tofuku-ji (東福寺) - REPLACED (was duplicates)
-- Photo by Ryunosuke Kikuno on Unsplash - A small pavilion in the middle of a park
-- Photo by kim yosu on Unsplash - Japanese temple roof covered in autumn leaves
-- Photo by CHEN HENG on Unsplash - A view of a park through a window
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1733149233679-dc77e94b7567?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwxfHxUb2Z1a3VqaSUyMHRlbXBsZSUyMGF1dHVtbiUyMEt5b3RvfGVufDB8fHx8MTc3NDgzNDY5Nnww&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1766044167788-4b64bd9dab38?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwzfHxUb2Z1a3VqaSUyMHRlbXBsZSUyMGF1dHVtbiUyMEt5b3RvfGVufDB8fHx8MTc3NDgzNDY5Nnww&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1739106288400-1192a1a30461?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHw0fHxUb2Z1a3VqaSUyMHRlbXBsZSUyMGF1dHVtbiUyMEt5b3RvfGVufDB8fHx8MTc3NDgzNDY5Nnww&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'
] WHERE id = 'b2000000-0000-0000-0000-000000000011';

-- 5. Kyoto National Museum (京都国立博物館) - REPLACED (was torii gate photos, not museum)
-- Photo by Leongsan on Unsplash - Historic building with ornate domes behind fence
-- Photo by Leongsan on Unsplash - Grand building with ornate architecture beside reflective water
-- Photo by Leongsan on Unsplash - Grand architectural building with arched windows and columns
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1758427776428-01c9d9c65934?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwxfHxLeW90byUyME5hdGlvbmFsJTIwTXVzZXVtJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzc0ODM0Njk3fDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1764996995017-03858d0c6819?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwyfHxLeW90byUyME5hdGlvbmFsJTIwTXVzZXVtJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzc0ODM0Njk3fDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1758531827902-89216d706337?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwzfHxLeW90byUyME5hdGlvbmFsJTIwTXVzZXVtJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzc0ODM0Njk3fDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'
] WHERE id = 'b2000000-0000-0000-0000-000000000022';

-- 6. Ryoan-ji (龍安寺) - ADDED 3rd image (only had 2)
-- Keep existing 2 + add: Photo by Bart Wellens on Unsplash - Zen garden with rocks and raked sand
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1669954808088-53a3082c00d8?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwxfHxSeW9hbi1qaSUyMGt5b3RvJTIwamFwYW58ZW58MXwwfHx8MTc3NDgyNjQ2M3ww&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1669954807964-6e98112a6b86?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwyfHxSeW9hbi1qaSUyMGt5b3RvJTIwamFwYW58ZW58MXwwfHx8MTc3NDgyNjQ2M3ww&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1762876244984-f9d493cf4aa1?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwyfHxSeW9hbmppJTIwemVuJTIwcm9jayUyMGdhcmRlbiUyMEt5b3RvfGVufDB8fHx8MTc3NDgzNDY5OXww&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'
] WHERE id = 'b2000000-0000-0000-0000-000000000007';

-- ============================================
-- Summary: 6 spots corrected
-- - 1 new (Teramachi & Shinkyogoku)
-- - 4 replaced (Kitano Tenmangu, Sanjusangen-do, Tofuku-ji, Kyoto National Museum)
-- - 1 augmented (Ryoan-ji: 2→3 images)
-- All 25 Kyoto spots now have 3 images each
-- ⚠️ Run this in Supabase SQL Editor (anon key does not have UPDATE permissions)
-- ============================================
