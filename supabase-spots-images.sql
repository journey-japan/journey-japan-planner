-- ============================================
-- Journey Japan Planner - Spot Images (Unsplash)
-- Run this in Supabase SQL Editor
-- Updates photo_urls for all 50 Tokyo spots
-- ============================================

-- 1. Meiji Jingu Shrine
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1583766395091-2eb9994ed094?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000001';

-- 2. Takeshita Street
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000002';

-- 3. Shibuya Crossing
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1532236204992-f5e85c024202?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000003';

-- 4. Shibuya Sky
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000004';

-- 5. Fuunji Tsukemen
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000005';

-- 6. teamLab Borderless
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000006';

-- 7. Senso-ji Temple
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000007';

-- 8. Akihabara
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000008';

-- 9. Tsukiji Outer Market
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000009';

-- 10. Tokyo Skytree
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000010';

-- 11. Shinjuku Gyoen
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1522623349500-de288e5604e4?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000011';

-- 12. Imperial Palace Gardens
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000012';

-- 13. Nezu Shrine
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000013';

-- 14. Zojo-ji Temple
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000014';

-- 15. Gotokuji Temple
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000015';

-- 16. Meiji Jingu Outer Garden (Ginkgo Avenue)
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000016';

-- 17. Tokyo Tower
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000017';

-- 18. Tokyo Metropolitan Government Building
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000018';

-- 19. Rainbow Bridge
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000019';

-- 20. Roppongi Hills Mori Tower
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000020';

-- 21. Toyosu Fish Market
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1580442151529-343f2f6e0e27?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000021';

-- 22. Omoide Yokocho
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1554797589-7241bb691973?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000022';

-- 23. Hoppy Street
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000023';

-- 24. Yanaka Ginza
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000024';

-- 25. Golden Gai
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000025';

-- 26. Ameyoko
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000026';

-- 27. Ghibli Museum
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1565618754154-c8011e5df2a6?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000027';

-- 28. Edo-Tokyo Museum
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000028';

-- 29. National Museum of Nature and Science
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000029';

-- 30. Tokyo National Museum
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1528164344885-47b1492b7ccd?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000030';

-- 31. Robot Restaurant
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000031';

-- 32. Samurai Museum
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1528164344885-47b1492b7ccd?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000032';

-- 33. Ueno Park
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1522623349500-de288e5604e4?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000033';

-- 34. Yoyogi Park
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000034';

-- 35. Rikugien Garden
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000035';

-- 36. Inokashira Park
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000036';

-- 37. Hamarikyu Gardens
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000037';

-- 38. Ginza
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000038';

-- 39. Nakamise Shopping Street
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000039';

-- 40. Shimokitazawa
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1554797589-7241bb691973?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000040';

-- 41. Kichijoji
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000041';

-- 42. Odaiba
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000042';

-- 43. Ikebukuro Sunshine City
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000043';

-- 44. Owl Cafe
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1557997666-3809c6fd6e79?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000044';

-- 45. Mario Kart
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000045';

-- 46. Oedo Onsen Monogatari
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000046';

-- 47. Kabukicho Tower
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000047';

-- 48. teamLab Planets
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000048';

-- 49. Sumo Wrestling
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1528164344885-47b1492b7ccd?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000049';

-- 50. Nihonbashi
UPDATE public.spots SET photo_urls = ARRAY[
  'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&h=400&fit=crop'
] WHERE id = 'a1000000-0000-0000-0000-000000000050';
