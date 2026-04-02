-- ============================================================
-- Tokyo Classic 5-Day Itinerary — Production Data
-- "Classic Tokyo: Culture, Food & City Life"
-- ============================================================
-- Pro itinerary by Ken Ninomiya (info@journeyjpn.com)
-- Covers: Harajuku/Shibuya, Asakusa/Akihabara, Tsukiji/Ginza/Odaiba,
--         Shinjuku/Kabukicho, Yanaka/Nezu/Ueno
-- ============================================================

-- 1) Insert the itinerary
INSERT INTO itineraries (id, user_id, title, description, area, duration_days, status, is_pro, cover_image_url, tags, view_count, created_at, updated_at)
VALUES (
  'b1000000-0000-0000-0000-000000000001',
  'c47927b5-adce-4c0d-b46d-596eb50e61f7',
  'Classic Tokyo: Culture, Food & City Life',
  'The ultimate 5-day Tokyo itinerary for first-time visitors. From the serene forests of Meiji Shrine to the neon-lit streets of Shinjuku, this carefully curated route covers Tokyo''s must-see highlights while leaving room for spontaneous exploration. Each day is organized by neighborhood to minimize travel time and maximize your experience.',
  'tokyo',
  5,
  'published',
  true,
  NULL,
  '["Culture", "Food", "Shopping", "First-timers", "Art"]',
  0,
  NOW(),
  NOW()
);

-- 2) Insert the 5 days
INSERT INTO itinerary_days (id, itinerary_id, day_number, title, created_at) VALUES
  ('b1000000-0000-0000-0001-000000000001', 'b1000000-0000-0000-0000-000000000001', 1, 'Harajuku, Shibuya & Digital Art', NOW()),
  ('b1000000-0000-0000-0001-000000000002', 'b1000000-0000-0000-0000-000000000001', 2, 'Asakusa, Skytree & Akihabara', NOW()),
  ('b1000000-0000-0000-0001-000000000003', 'b1000000-0000-0000-0000-000000000001', 3, 'Tsukiji, Ginza & Waterfront Tokyo', NOW()),
  ('b1000000-0000-0000-0001-000000000004', 'b1000000-0000-0000-0000-000000000001', 4, 'Shinjuku, Kabukicho & Golden Gai', NOW()),
  ('b1000000-0000-0000-0001-000000000005', 'b1000000-0000-0000-0000-000000000001', 5, 'Yanaka, Nezu & Hidden Tokyo', NOW());

-- 3) Insert itinerary items

-- ===== DAY 1: Harajuku, Shibuya & Digital Art =====
INSERT INTO itinerary_items (id, day_id, spot_id, order_index, start_time, duration_minutes, note, transport_to_next, created_at) VALUES
(
  'b1000000-0000-0000-0002-000000010001',
  'b1000000-0000-0000-0001-000000000001',
  'a1000000-0000-0000-0000-000000000001', -- Meiji Jingu Shrine
  0,
  '09:00',
  60,
  'Arrive early for a peaceful experience before the crowds. Walk through the towering torii gate and forested approach — it feels like stepping out of the city entirely. Check the schedule for traditional Shinto wedding processions.',
  '{"mode": "walk", "durationMinutes": 10, "detail": "Walk south through Yoyogi Park"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000010002',
  'b1000000-0000-0000-0001-000000000001',
  'a1000000-0000-0000-0000-000000000034', -- Yoyogi Park
  1,
  '10:15',
  45,
  'A quick stroll through one of Tokyo''s largest parks. On weekends, you might catch cosplay groups, street performers, or rockabilly dancers near the entrance. Great spot for cherry blossoms in spring.',
  '{"mode": "walk", "durationMinutes": 8, "detail": "Walk east to Harajuku Station area"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000010003',
  'b1000000-0000-0000-0001-000000000001',
  'a1000000-0000-0000-0000-000000000002', -- Takeshita Street
  2,
  '11:15',
  75,
  'The epicenter of Harajuku''s youth culture. Don''t miss the crepe shops, quirky fashion boutiques, and kawaii accessories. Try a rainbow cotton candy or a Japanese-style crepe from one of the street vendors.',
  '{"mode": "walk", "durationMinutes": 10, "detail": "Walk south toward Shibuya"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000010004',
  'b1000000-0000-0000-0001-000000000001',
  'a1000000-0000-0000-0000-000000000003', -- Shibuya Crossing & Hachiko
  3,
  '12:45',
  30,
  'Stand at the Hachiko exit and watch the world''s busiest pedestrian crossing in action. For the best overhead view, head to the Starbucks on the 2nd floor of the TSUTAYA building, or the Shibuya Sky observation deck next.',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Enter Shibuya Scramble Square building"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000010005',
  'b1000000-0000-0000-0001-000000000001',
  'a1000000-0000-0000-0000-000000000004', -- Shibuya Sky
  4,
  '13:20',
  60,
  'Book tickets online in advance — it''s cheaper and you skip the queue. The open-air rooftop deck on the 46th floor offers stunning 360-degree views. On clear days, you can see Mt. Fuji to the west. Best around sunset, but daytime views are equally impressive.',
  '{"mode": "train", "durationMinutes": 25, "detail": "Ginza Line to Aoyama-itchome, then Oedo Line to Azabu-juban"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000010006',
  'b1000000-0000-0000-0001-000000000001',
  'a1000000-0000-0000-0000-000000000006', -- teamLab Borderless
  5,
  '15:00',
  120,
  'The crown jewel of Tokyo''s art scene. Book tickets well in advance as they sell out quickly. Wear white clothing if possible — the projected art looks incredible on white fabric. Allow at least 2 hours to explore all the rooms. The Crystal Universe and Infinity Mirror rooms are the highlights.',
  NULL,
  NOW()
);

-- ===== DAY 2: Asakusa, Skytree & Akihabara =====
INSERT INTO itinerary_items (id, day_id, spot_id, order_index, start_time, duration_minutes, note, transport_to_next, created_at) VALUES
(
  'b1000000-0000-0000-0002-000000020001',
  'b1000000-0000-0000-0001-000000000002',
  'a1000000-0000-0000-0000-000000000007', -- Senso-ji Temple
  0,
  '08:30',
  60,
  'Tokyo''s oldest and most iconic temple. Arrive early to avoid the crowds and enjoy the peaceful morning atmosphere. Pass through the majestic Kaminarimon (Thunder Gate) with its giant red lantern, then walk along Nakamise shopping street.',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Walk through Nakamise-dori"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000020002',
  'b1000000-0000-0000-0001-000000000002',
  'a1000000-0000-0000-0000-000000000039', -- Nakamise Shopping Street
  1,
  '09:40',
  45,
  'Browse traditional souvenirs, try freshly made senbei (rice crackers), ningyo-yaki (doll-shaped cakes), and melon pan. This is one of the best places to pick up affordable Japanese gifts and snacks.',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Cross Sumida River, walk east toward Skytree"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000020003',
  'b1000000-0000-0000-0001-000000000002',
  'a1000000-0000-0000-0000-000000000023', -- Hoppy Street
  2,
  '10:35',
  50,
  'A lively alley near Senso-ji packed with small izakayas and street food stalls. Perfect for a mid-morning snack — try yakitori (grilled chicken skewers) or nikomi (beef stew). The atmosphere here is authentic old-school Tokyo.',
  '{"mode": "walk", "durationMinutes": 15, "detail": "Walk north along Sumida River toward Tokyo Skytree"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000020004',
  'b1000000-0000-0000-0001-000000000002',
  'a1000000-0000-0000-0000-000000000010', -- Tokyo Skytree
  3,
  '11:45',
  60,
  'At 634 meters, the world''s tallest tower. The Tembo Deck (350m) offers amazing city views. Time your visit to see the city in daylight — save sunset views for Shibuya Sky. The shopping complex at the base (Solamachi) has great lunch options.',
  '{"mode": "train", "durationMinutes": 20, "detail": "Tobu Skytree Line to Asakusa, then Ginza Line to Kanda, JR to Akihabara"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000020005',
  'b1000000-0000-0000-0001-000000000002',
  'a1000000-0000-0000-0000-000000000008', -- Akihabara Electric Town
  4,
  '13:15',
  120,
  'Even if you''re not into anime, Akihabara is a must-see cultural experience. Explore multi-story electronics shops, manga stores, and gashapon (capsule toy) machines. Don''t miss Don Quijote''s Akihabara branch for quirky Japanese goods.',
  '{"mode": "walk", "durationMinutes": 10, "detail": "Walk south to Ameya-Yokocho"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000020006',
  'b1000000-0000-0000-0001-000000000002',
  'a1000000-0000-0000-0000-000000000026', -- Ameya-Yokocho
  5,
  '15:45',
  60,
  'A vibrant market street stretching under the JR tracks between Ueno and Okachimachi stations. Browse discounted clothing, fresh seafood, dried fruits, and street food. The energy here is completely different from polished Ginza shopping.',
  NULL,
  NOW()
);

-- ===== DAY 3: Tsukiji, Ginza & Waterfront Tokyo =====
INSERT INTO itinerary_items (id, day_id, spot_id, order_index, start_time, duration_minutes, note, transport_to_next, created_at) VALUES
(
  'b1000000-0000-0000-0002-000000030001',
  'b1000000-0000-0000-0001-000000000003',
  'a1000000-0000-0000-0000-000000000009', -- Tsukiji Outer Market
  0,
  '08:30',
  90,
  'Arrive hungry! The outer market is a food lover''s paradise. Must-try items: fresh sushi and sashimi, tamagoyaki (sweet grilled egg), grilled scallops, and tuna skewers. Most stalls open by 8am and the freshest items sell out by noon.',
  '{"mode": "walk", "durationMinutes": 10, "detail": "Walk south to Hamarikyu Gardens entrance"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000030002',
  'b1000000-0000-0000-0001-000000000003',
  'a1000000-0000-0000-0000-000000000037', -- Hamarikyu Gardens
  1,
  '10:15',
  60,
  'A stunning contrast to the bustling market — this traditional Japanese garden sits right next to Tokyo Bay with modern skyscrapers as a backdrop. Don''t miss the teahouse on the island in the pond, where you can enjoy matcha with a view.',
  '{"mode": "walk", "durationMinutes": 15, "detail": "Walk north through Ginza district"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000030003',
  'b1000000-0000-0000-0001-000000000003',
  'a1000000-0000-0000-0000-000000000038', -- Ginza
  2,
  '11:30',
  120,
  'Tokyo''s most upscale shopping district. Even if you''re not buying luxury goods, admire the stunning architecture of flagship stores. Check out the Ginza Six department store, Itoya stationery shop (12 floors!), and the free Sony Showroom. Great lunch options in the basement food halls.',
  '{"mode": "walk", "durationMinutes": 10, "detail": "Walk to Tokyo Tower area"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000030004',
  'b1000000-0000-0000-0001-000000000003',
  'a1000000-0000-0000-0000-000000000017', -- Tokyo Tower
  3,
  '14:00',
  60,
  'Tokyo''s original observation tower still has a charm that the Skytree can''t match. The 150m main deck offers great city views. The surrounding Shiba Park area is peaceful for a stroll. Visit Zojo-ji Temple right next door if time allows.',
  '{"mode": "train", "durationMinutes": 20, "detail": "Oedo Line from Akabanebashi to Odaiba-Kaihinkoen"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000030005',
  'b1000000-0000-0000-0001-000000000003',
  'a1000000-0000-0000-0000-000000000042', -- Odaiba
  4,
  '15:30',
  150,
  'A futuristic entertainment island in Tokyo Bay. See the life-size Unicorn Gundam statue at DiverCity, explore the retro-themed Decks Tokyo Beach, and walk along the waterfront promenade with views of Rainbow Bridge. Stay for sunset — the bridge and city skyline light up beautifully.',
  NULL,
  NOW()
);

-- ===== DAY 4: Shinjuku, Kabukicho & Golden Gai =====
INSERT INTO itinerary_items (id, day_id, spot_id, order_index, start_time, duration_minutes, note, transport_to_next, created_at) VALUES
(
  'b1000000-0000-0000-0002-000000040001',
  'b1000000-0000-0000-0001-000000000004',
  'a1000000-0000-0000-0000-000000000011', -- Shinjuku Gyoen
  0,
  '09:00',
  90,
  'One of Tokyo''s finest parks, combining Japanese, English, and French garden styles. An absolute must during cherry blossom season (late March to early April). No alcohol allowed, making it a peaceful escape. The greenhouse has tropical plants year-round.',
  '{"mode": "walk", "durationMinutes": 15, "detail": "Walk northwest to Tokyo Metropolitan Government Building"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000040002',
  'b1000000-0000-0000-0001-000000000004',
  'a1000000-0000-0000-0000-000000000018', -- Tokyo Metropolitan Government Building
  1,
  '10:50',
  45,
  'Free observation decks on the 45th floor of both the North and South towers. The North tower is more popular but the South tower usually has shorter queues. On clear days, the Mt. Fuji view from here rivals paid observation decks.',
  '{"mode": "walk", "durationMinutes": 10, "detail": "Walk east into Kabukicho area"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000040003',
  'b1000000-0000-0000-0001-000000000004',
  'a1000000-0000-0000-0000-000000000047', -- Kabukicho Tower
  2,
  '11:50',
  90,
  'Shinjuku''s newest entertainment landmark. Explore multiple floors of restaurants, entertainment venues, and the luxury hotel. The food hall on the lower floors has great lunch options representing cuisines from across Japan.',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Walk to Omoide Yokocho"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000040004',
  'b1000000-0000-0000-0001-000000000004',
  'a1000000-0000-0000-0000-000000000022', -- Omoide Yokocho (Memory Lane)
  3,
  '13:30',
  60,
  'Also known as "Piss Alley" — a collection of tiny, atmospheric yakitori bars tucked under the train tracks near Shinjuku Station. Each stall seats only 6-8 people. Order a beer and some grilled chicken skewers for a quintessentially Tokyo experience. Open for lunch and dinner.',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Take a break at your hotel, then head to Golden Gai in the evening"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000040005',
  'b1000000-0000-0000-0001-000000000004',
  'a1000000-0000-0000-0000-000000000025', -- Golden Gai
  4,
  '18:00',
  90,
  'A maze of over 200 tiny bars, each with its own unique theme and personality. Some bars charge a cover (¥500-1,000) but many are free. Start early (6-7pm) to avoid the late-night crowds. Look for bars with English menus or friendly staff beckoning you in. This is an unforgettable Tokyo nightlife experience.',
  NULL,
  NOW()
);

-- ===== DAY 5: Yanaka, Nezu & Hidden Tokyo =====
INSERT INTO itinerary_items (id, day_id, spot_id, order_index, start_time, duration_minutes, note, transport_to_next, created_at) VALUES
(
  'b1000000-0000-0000-0002-000000050001',
  'b1000000-0000-0000-0001-000000000005',
  'a1000000-0000-0000-0000-000000000024', -- Yanaka Ginza Shopping Street
  0,
  '09:00',
  60,
  'Step back in time in this charming old-fashioned shopping street. Unlike modern Tokyo, Yanaka retains a nostalgic shitamachi (downtown) atmosphere. Try menchi-katsu (deep-fried meat patties), browse handmade crafts, and pet the neighborhood cats — Yanaka is famous for them.',
  '{"mode": "walk", "durationMinutes": 15, "detail": "Walk south through residential streets to Nezu Shrine"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000050002',
  'b1000000-0000-0000-0001-000000000005',
  'a1000000-0000-0000-0000-000000000013', -- Nezu Shrine
  1,
  '10:20',
  45,
  'One of Tokyo''s oldest shrines, famous for its tunnel of vermillion torii gates (reminiscent of Kyoto''s Fushimi Inari but without the crowds). The azalea garden blooms spectacularly in April-May. A true hidden gem that most tourists miss.',
  '{"mode": "walk", "durationMinutes": 10, "detail": "Walk south to Ueno Park"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000050003',
  'b1000000-0000-0000-0001-000000000005',
  'a1000000-0000-0000-0000-000000000033', -- Ueno Park
  2,
  '11:20',
  60,
  'Tokyo''s cultural heart — home to multiple world-class museums, a zoo, temples, and beautiful gardens. In spring, the cherry blossom-lined pathways are magical. Take a boat ride on Shinobazu Pond or simply relax by the fountain.',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Walk to Tokyo National Museum inside the park"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000050004',
  'b1000000-0000-0000-0001-000000000005',
  'a1000000-0000-0000-0000-000000000030', -- Tokyo National Museum
  3,
  '12:30',
  120,
  'Japan''s oldest and largest museum, housing over 110,000 works of Japanese and Asian art. The Honkan (main building) galleries are the highlight — don''t miss the samurai armor collection and the ukiyo-e woodblock prints. The museum cafe has a lovely garden view.',
  '{"mode": "train", "durationMinutes": 15, "detail": "JR Yamanote Line from Ueno to Tokyo Station, then walk"}',
  NOW()
),
(
  'b1000000-0000-0000-0002-000000050005',
  'b1000000-0000-0000-0001-000000000005',
  'a1000000-0000-0000-0000-000000000012', -- Imperial Palace Gardens
  4,
  '15:10',
  60,
  'End your Tokyo journey at the serene Imperial Palace East Gardens. Walk along the moats, admire the massive stone walls of the former Edo Castle, and enjoy the peaceful Japanese gardens. Free admission. A fitting finale that connects Tokyo''s past with its present.',
  NULL,
  NOW()
);
