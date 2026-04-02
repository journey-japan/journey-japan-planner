-- ============================================
-- Journey Japan - Osaka Image Quality Fixes
-- Generated: 2026-03-30T03:17:58.863Z
-- Run this AFTER the original images SQL in Supabase SQL Editor
-- ============================================

-- Abeno Harukas (INSUFFICIENT_COUNT: Only 1 image, need 3)
-- Photo by Clark Gu on Unsplash (original, kept)
-- https://unsplash.com/photos/a-view-of-a-city-at-night-from-the-top-of-a-building-xN7VxA9caKE
-- Photo by Michael Myers on Unsplash (new)
-- https://unsplash.com/photos/a-building-with-a-blue-sky-AmhgcwrTonw
-- Photo by Artem Labunsky on Unsplash (new)
-- https://unsplash.com/photos/tall-modern-tower-with-antenna-against-clear-sky-eUNe6INDjWk
UPDATE public.spots SET photo_urls = ARRAY['https://images.unsplash.com/photo-1672492636238-422d4703930f?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwxfHxBYmVubyUyMEhhcnVrYXMlMjBvc2FrYSUyMGphcGFufGVufDF8MHx8fDE3NzQ4MzUxMTl8MA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1662307413953-22ec4099384b?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1756328061495-b2113af2f24e?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'] WHERE id = 'b3000000-0000-0000-0000-000000000004';

-- Shitenno-ji (WRONG_SUBJECT: All 3 photos are generic Osaka city/station photos, not the temple)
-- Photo by note thanun on Unsplash
-- https://unsplash.com/photos/brown-wooden-tower-under-blue-sky-during-daytime-L1vuGS3Nur8
-- Photo by Sarmat Batagov on Unsplash
-- https://unsplash.com/photos/a-tall-red-pagoda-against-a-blue-sky-t-rg9pBhYHE
-- Photo by Sarmat Batagov on Unsplash
-- https://unsplash.com/photos/traditional-japanese-temple-with-red-and-white-accents-MK4l2Kq5Cbw
UPDATE public.spots SET photo_urls = ARRAY['https://images.unsplash.com/photo-1594623639664-082d614c3627?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1764070611337-7f0673ddaec9?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1764070611387-1c81bb9c447a?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'] WHERE id = 'b3000000-0000-0000-0000-000000000006';

-- Shinsaibashi-suji Shopping Street (DUPLICATE: Photos 2-3 duplicated from Kuromon Market (same photographer/URL))
-- Photo by Senad Palic on Unsplash
-- https://unsplash.com/photos/cars-parked-in-front-of-store-during-night-time-WuTqnIS3--0
-- Photo by masahiro miyagi on Unsplash
-- https://unsplash.com/photos/a-crowd-of-people-walking-through-a-city-RZu_evuOLhk
UPDATE public.spots SET photo_urls = ARRAY['https://images.unsplash.com/photo-1759466752889-5774bc433fea?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwxfHxTaGluc2FpYmFzaGktc3VqaSUyMFNob3BwaW5nJTIwU3RyZWV0JTIwb3Nha2ElMjBqYXBhbnxlbnwxfDB8fHwxNzc0ODM5NTIyfDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1601328281102-cf8ae51f94c9?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1652440177115-947dd1e0d577?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'] WHERE id = 'b3000000-0000-0000-0000-000000000012';

-- Namba Grand Kagetsu (WRONG_SUBJECT: Photo 1 is 'Osaka Station sign', not comedy theater)
-- Photo by Julien on Unsplash
-- https://unsplash.com/photos/two-japanese-restaurants-glowing-at-night-wxNLEzIsj9c
UPDATE public.spots SET photo_urls = ARRAY['https://images.unsplash.com/photo-1741464126297-d0b1bffe80d5?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1731758832047-8363e8eed735?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwyfHxOYW1iYSUyMEdyYW5kJTIwS2FnZXRzdSUyMG9zYWthJTIwamFwYW58ZW58MXwwfHx8MTc3NDgzOTUyNXww&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1773798438246-599a1f10fb56?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwzfHxOYW1iYSUyMEdyYW5kJTIwS2FnZXRzdSUyMG9zYWthJTIwamFwYW58ZW58MXwwfHx8MTc3NDgzOTUyNXww&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'] WHERE id = 'b3000000-0000-0000-0000-000000000013';

-- Den Den Town (WRONG_SUBJECT: Photo 1 is Osaka Station sign, Photos 2-3 are river views — not electronics district)
-- Photo by Julien on Unsplash
-- https://unsplash.com/photos/nighttime-street-in-a-bustling-city-35Zt7v3JoR0
-- Photo by Jaden William on Unsplash
-- https://unsplash.com/photos/a-crowd-of-people-standing-in-front-of-a-building-at-night-2DpRM8sZHE0
-- Photo by silversea on Unsplash
-- https://unsplash.com/photos/a-river-running-through-a-city-next-to-tall-buildings-7en7fLJtcfI
UPDATE public.spots SET photo_urls = ARRAY['https://images.unsplash.com/photo-1741534860198-6ac86155224f?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1739100711452-ea6bca5e80c5?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1647334933038-4cb684cd9a7e?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'] WHERE id = 'b3000000-0000-0000-0000-000000000014';

-- Tenjinbashi-suji Shopping Street (ALL_DUPLICATES: All 3 photos duplicated from Kuromon/Shinsaibashi/Dotonbori)
-- Photo by Johnny Ho on Unsplash (new)
-- https://unsplash.com/photos/two-people-cycling-down-a-long-covered-marketplace-armrXbSCmvQ
-- Photo by Johnny Ho on Unsplash (new)
-- https://unsplash.com/photos/people-cycle-through-a-covered-shopping-arcade-6chLF0irqBI
-- Photo by Rebecca Clarke on Unsplash (new)
-- https://unsplash.com/photos/a-group-of-people-walking-down-a-long-hallway-71U-ui-U3aw
UPDATE public.spots SET photo_urls = ARRAY['https://images.unsplash.com/photo-1759300632433-f4566d91865d?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1759300632424-e449efe62aca?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1701001909948-8048598fbc92?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'] WHERE id = 'b3000000-0000-0000-0000-000000000015';

-- Osaka Museum of Housing and Living (WRONG_SUBJECT: Photo 1 is Osaka Station sign, Photos 2-3 generic street views — not museum)
-- Photo by Avi Varma on Unsplash
-- https://unsplash.com/photos/traditional-japanese-house-with-wooden-exterior-and-tiled-roof-Wuub1cWJGLE
-- Photo by Vien Dinh on Unsplash
-- https://unsplash.com/photos/a-view-of-a-city-from-a-rooftop-RaVT02vL6ZU
-- Photo by Bruna Santos on Unsplash
-- https://unsplash.com/photos/a-street-corner-with-a-yellow-building-and-a-crosswalk-ahVxSUHBejU
UPDATE public.spots SET photo_urls = ARRAY['https://images.unsplash.com/photo-1763312223638-5fb9f05ce4c0?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1645967008535-142abfa4985e?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1732906364920-4708eacfc9ab?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'] WHERE id = 'b3000000-0000-0000-0000-000000000016';

-- National Museum of Art Osaka (WRONG_SUBJECT: Photo 1 is ferris wheel, Photo 2 is Osaka Station sign — not the museum)
-- Photo by Azimbek Assarov on Unsplash
-- https://unsplash.com/photos/a-group-of-cars-parked-in-front-of-a-building-4cZ_1utni_0
-- Photo by Leongsan on Unsplash
-- https://unsplash.com/photos/illuminated-glass-blocks-spell-out-tut-RuwfGYUk_y0
UPDATE public.spots SET photo_urls = ARRAY['https://images.unsplash.com/photo-1716324211904-65699746b4dc?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1750694625694-9050594e20f1?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1762245751404-1ed86d34f495?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwzfHxOYXRpb25hbCUyME11c2V1bSUyMG9mJTIwQXJ0JTIwT3Nha2ElMjBvc2FrYSUyMGphcGFufGVufDF8MHx8fDE3NzQ4Mzk1MzJ8MA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'] WHERE id = 'b3000000-0000-0000-0000-000000000017';

-- Osaka Tenmangu (WRONG_SUBJECT: Photo 2 is Osaka Station sign — not the shrine)
-- Photo by Steven Marcellino on Unsplash
-- https://unsplash.com/photos/a-group-of-people-standing-around-a-building-at-night-QjMQsdLxQlI
UPDATE public.spots SET photo_urls = ARRAY['https://images.unsplash.com/photo-1764643682871-582237139e96?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMFRlbm1hbmd1JTIwb3Nha2ElMjBqYXBhbnxlbnwxfDB8fHwxNzc0ODM5NTM0fDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1690210684306-521cdb9990a9?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1734537055934-dafc55785973?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwzfHxPc2FrYSUyMFRlbm1hbmd1JTIwb3Nha2ElMjBqYXBhbnxlbnwxfDB8fHwxNzc0ODM5NTM0fDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'] WHERE id = 'b3000000-0000-0000-0000-000000000018';

-- Osaka Castle Park (DUPLICATE: Photo 1 same as Osaka Castle (ID 001) — both use Jeremy Santana photo)
-- Photo by Yasuto Takeuchi on Unsplash (new — cherry blossom path by moat)
-- https://unsplash.com/photos/a-path-lined-with-cherry-blossom-trees-next-to-a-body-of-water-A9bMRQ4IfqY
-- Photo by Ken Cheung on Unsplash (kept)
-- Photo by Nomadic Julien on Unsplash (kept)
UPDATE public.spots SET photo_urls = ARRAY['https://images.unsplash.com/photo-1648945741044-4dfc68dc38f2?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1629569320448-a5504a24d384?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwyfHxPc2FrYSUyMENhc3RsZSUyMFBhcmslMjBvc2FrYSUyMGphcGFufGVufDF8MHx8fDE3NzQ4Mzk1MzZ8MA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80', 'https://images.unsplash.com/photo-1589451814294-26d36298ac22?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwzfHxPc2FrYSUyMENhc3RsZSUyMFBhcmslMjBvc2FrYSUyMGphcGFufGVufDF8MHx8fDE3NzQ4Mzk1MzZ8MA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80'] WHERE id = 'b3000000-0000-0000-0000-000000000019';

-- ============================================
-- Summary: 10 fixed, 0 failed
-- ============================================
