-- ============================================================
-- Osaka 2-Day Food & Nightlife Itinerary — Production Data
-- "Osaka: Street Food, Neon Nights & Japan's Kitchen"
-- ============================================================
-- Pro itinerary by Ken Ninomiya (info@journeyjpn.com)
-- Covers: Kuromon Market, Dotonbori, Shinsekai, Shinsaibashi,
--         Osaka Castle Park, Tenjinbashi-suji, nightlife
-- ============================================================

-- 1) Insert the itinerary
INSERT INTO itineraries (id, user_id, title, description, area, duration_days, status, is_pro, cover_image_url, tags, view_count, created_at, updated_at)
VALUES (
  'b3000000-1000-0000-0000-000000000001',
  'c47927b5-adce-4c0d-b46d-596eb50e61f7',
  'Osaka: Street Food, Neon Nights & Japan''s Kitchen',
  'The ultimate 2-day Osaka itinerary for food lovers and nightlife seekers. From the sizzling griddles of Dotonbori to the retro kushikatsu alleys of Shinsekai, this route is a non-stop culinary adventure through Japan''s most delicious city. Every stop is chosen to maximize your eating and keep you immersed in Osaka''s infectious energy.',
  'osaka',
  2,
  'published',
  true,
  NULL,
  '["Food", "Nightlife", "Street Food", "Culture", "Photography"]',
  0,
  NOW(),
  NOW()
);

-- 2) Insert the 2 days
INSERT INTO itinerary_days (id, itinerary_id, day_number, title, created_at) VALUES
  ('b3000000-1000-0000-0001-000000000001', 'b3000000-1000-0000-0000-000000000001', 1, 'Minami: Osaka''s Kitchen & Neon Nights', NOW()),
  ('b3000000-1000-0000-0001-000000000002', 'b3000000-1000-0000-0000-000000000001', 2, 'Shinsekai, Retro Osaka & Late-Night Bites', NOW());

-- 3) Insert itinerary items

-- ===== DAY 1: Minami — Osaka's Kitchen & Neon Nights =====
INSERT INTO itinerary_items (id, day_id, spot_id, order_index, start_time, duration_minutes, note, transport_to_next, created_at) VALUES
(
  'b3000000-1000-0000-0002-000000010001',
  'b3000000-1000-0000-0001-000000000001',
  'b3000000-0000-0000-0000-000000000010', -- Kuromon Market
  0,
  '09:00',
  90,
  'Start your Osaka food journey at the city''s legendary kitchen. Arrive early when vendors are setting up and the seafood is freshest. Must-eat: giant grilled scallops, sashimi platters you eat standing at the counter, wagyu beef skewers, tamago-yaki (sweet rolled omelet), and seasonal fruits. Pace yourself — this is a marathon, not a sprint. Tip: the stalls deeper in the market are less crowded and often better value.',
  '{"mode": "walk", "durationMinutes": 10, "detail": "Walk west through Sennichimae-dori to Hozen-ji"}',
  NOW()
),
(
  'b3000000-1000-0000-0002-000000010002',
  'b3000000-1000-0000-0001-000000000001',
  'b3000000-0000-0000-0000-000000000008', -- Hozen-ji Temple
  1,
  '10:45',
  15,
  'Duck into this hidden gem tucked in a narrow alley — a moss-covered Buddhist statue in the middle of Osaka''s busiest entertainment district. Splash water on the Fudo Myo-o statue and make a wish. The surrounding Hozen-ji Yokocho alley is lined with atmospheric old-school bars and restaurants that come alive at night. A perfect palate cleanser between eating sessions.',
  '{"mode": "walk", "durationMinutes": 3, "detail": "Walk north to Dotonbori canal"}',
  NOW()
),
(
  'b3000000-1000-0000-0002-000000010003',
  'b3000000-1000-0000-0001-000000000001',
  'b3000000-0000-0000-0000-000000000009', -- Dotonbori
  2,
  '11:15',
  120,
  'The main event. Osaka''s neon-lit food paradise stretches along the Dotonbori canal and is best experienced as a slow-paced food crawl. The essentials: takoyaki (octopus balls) from Kukuru or Wanaka, okonomiyaki (savory pancake) at Mizuno or Fukutaro, kushikatsu (deep-fried skewers) at Daruma — look for the angry chef statue outside. Snap a photo with the Glico Running Man, then cross the Ebisubashi Bridge for the classic canal view. The golden rule: never double-dip your kushikatsu!',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Walk south to Namba Yasaka Shrine"}',
  NOW()
),
(
  'b3000000-1000-0000-0002-000000010004',
  'b3000000-1000-0000-0001-000000000001',
  'b3000000-0000-0000-0000-000000000007', -- Namba Yasaka Shrine
  3,
  '13:30',
  20,
  'A quick but unforgettable stop. The massive lion-head stage (Ema-den) is 12 meters tall with its mouth wide open — believed to swallow evil spirits and bring victory and good fortune. It''s one of Osaka''s most Instagram-worthy spots and locals come here to pray before big business deals or exams. The open mouth is said to "bite down on victory" (katsura).',
  '{"mode": "walk", "durationMinutes": 10, "detail": "Walk north to Shinsaibashi-suji"}',
  NOW()
),
(
  'b3000000-1000-0000-0002-000000010005',
  'b3000000-1000-0000-0001-000000000001',
  'b3000000-0000-0000-0000-000000000012', -- Shinsaibashi-suji Shopping Street
  4,
  '14:15',
  90,
  'Walk off lunch along Osaka''s premier covered shopping arcade. Besides the retail therapy, this is prime snacking territory: try Pablo''s famous cheese tart, Rikuro Ojisan''s jiggly cheesecake (watch for the line — it''s worth it), and matcha soft serve from Tsujiri. Detour into Amerikamura (America Village) on the west side for vintage clothing, street art, and more casual food stalls.',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Walk back south to Dotonbori for the evening scene"}',
  NOW()
),
(
  'b3000000-1000-0000-0002-000000010006',
  'b3000000-1000-0000-0001-000000000001',
  'b3000000-0000-0000-0000-000000000021', -- Tombori River Cruise
  5,
  '18:00',
  30,
  'End your first day with a nighttime boat cruise along the Dotonbori canal. As the sun sets, the neon signs ignite and the entire strip transforms. From the water, you get a completely different view of the famous signs — the Glico Man, the giant mechanical crab, the pufferfish lanterns — all reflecting off the canal. After the cruise, circle back to Dotonbori for round two of eating. Osaka locals say "kuidaore" (eat until you drop) — tonight is the night to live it.',
  NULL,
  NOW()
);

-- ===== DAY 2: Shinsekai, Retro Osaka & Late-Night Bites =====
INSERT INTO itinerary_items (id, day_id, spot_id, order_index, start_time, duration_minutes, note, transport_to_next, created_at) VALUES
(
  'b3000000-1000-0000-0002-000000020001',
  'b3000000-1000-0000-0001-000000000002',
  'b3000000-0000-0000-0000-000000000001', -- Osaka Castle
  0,
  '09:00',
  90,
  'Start day two with a dose of culture before diving back into food. Osaka Castle is spectacular in the morning light, and the surrounding park is ideal for a peaceful walk. Inside the castle museum, learn the dramatic story of Toyotomi Hideyoshi — the peasant who unified Japan and made Osaka the nation''s commercial capital (which is why the food culture is so incredible here). Grab a coffee at the park''s Jo-Terrace complex before heading out.',
  '{"mode": "train", "durationMinutes": 15, "detail": "Osaka Metro Tanimachi Line from Tanimachi 4-chome to Minami-Morimachi, walk 5 min"}',
  NOW()
),
(
  'b3000000-1000-0000-0002-000000020002',
  'b3000000-1000-0000-0001-000000000002',
  'b3000000-0000-0000-0000-000000000015', -- Tenjinbashi-suji Shopping Street
  1,
  '11:00',
  90,
  'Japan''s longest shopping street at 2.6 kilometers, and the antidote to tourist-heavy Dotonbori. This is where Osakans actually eat. Wander through and follow your nose — you''ll find okonomiyaki joints with decades-old griddles, tiny ramen counters with only 8 seats, and old-school kissaten (coffee shops) serving thick toast with butter. Try korokke (croquettes) from the street vendors and negiyaki (green onion pancake), Osaka''s underrated cousin to okonomiyaki.',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Located along the same street near Tenjinbashi 6-chome"}',
  NOW()
),
(
  'b3000000-1000-0000-0002-000000020003',
  'b3000000-1000-0000-0001-000000000002',
  'b3000000-0000-0000-0000-000000000016', -- Osaka Museum of Housing and Living
  2,
  '12:45',
  60,
  'Step back in time to Edo-period Osaka in this unique rooftop museum. Walk through a full-scale recreation of 1830s streets, merchant houses, and shops — and rent a kimono (¥500 extra) to fully immerse yourself. The museum gives fascinating context to Osaka''s merchant culture and why food became so central to the city''s identity. Osaka was historically called "tenka no daidokoro" (the nation''s kitchen).',
  '{"mode": "train", "durationMinutes": 20, "detail": "Osaka Metro Sakaisuji Line from Tenjinbashi-suji 6-chome to Ebisucho"}',
  NOW()
),
(
  'b3000000-1000-0000-0002-000000020004',
  'b3000000-1000-0000-0001-000000000002',
  'b3000000-0000-0000-0000-000000000011', -- Shinsekai
  3,
  '14:15',
  60,
  'Welcome to retro Osaka. Shinsekai was built in 1912 as a futuristic entertainment district modeled after New York (north) and Paris (south) — today it''s a delightfully old-school neighborhood that hasn''t changed in decades. This is the birthplace of kushikatsu, and you''ll see the "no double-dipping" signs everywhere. Try Yaekatsu or Kushikatsu Daruma for the classic experience. The colorful signage, game arcades, and old men playing shogi on the street make this feel like a time capsule.',
  '{"mode": "walk", "durationMinutes": 3, "detail": "Walk to Tsutenkaku Tower in the center of Shinsekai"}',
  NOW()
),
(
  'b3000000-1000-0000-0002-000000020005',
  'b3000000-1000-0000-0001-000000000002',
  'b3000000-0000-0000-0000-000000000002', -- Tsutenkaku Tower
  4,
  '15:30',
  45,
  'Climb Shinsekai''s landmark tower for sunset views over southern Osaka. At the top, rub the feet of Billiken — the "God of Things as They Ought to Be" — for good luck. The tower is wonderfully retro and unapologetically kitschy, much like the neighborhood it watches over. On a clear day you can see all the way to the mountains surrounding the Kansai plain.',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Walk south to Spa World in Shinsekai"}',
  NOW()
),
(
  'b3000000-1000-0000-0002-000000020006',
  'b3000000-1000-0000-0001-000000000002',
  'b3000000-0000-0000-0000-000000000022', -- Spa World
  5,
  '17:00',
  180,
  'The ultimate Osaka finale — a massive onsen theme park right in Shinsekai. Soak in baths themed after countries around the world, from ancient Roman columns to Balinese gardens. There are saunas, pools, and relaxation rooms across multiple floors. This is the most Osaka way to end a trip: over-the-top, fun, and completely unapologetic about it. Afterwards, step back into the neon glow of Shinsekai for one last round of kushikatsu and draft beer. Kuidaore complete.',
  NULL,
  NOW()
);
