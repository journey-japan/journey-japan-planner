-- ============================================================
-- Kyoto 3-Day Temple & Culture Itinerary — Production Data
-- "Kyoto: Temples, Zen Gardens & Timeless Traditions"
-- ============================================================
-- Pro itinerary by Ken Ninomiya (info@journeyjpn.com)
-- Covers: Higashiyama temples & Gion, Northern Kyoto zen & imperial,
--         Arashiyama bamboo & Fushimi Inari
-- ============================================================

-- 1) Insert the itinerary
INSERT INTO itineraries (id, user_id, title, description, area, duration_days, status, is_pro, cover_image_url, tags, view_count, created_at, updated_at)
VALUES (
  'b2000000-1000-0000-0000-000000000001',
  'c47927b5-adce-4c0d-b46d-596eb50e61f7',
  'Kyoto: Temples, Zen Gardens & Timeless Traditions',
  'The ultimate 3-day Kyoto itinerary for culture lovers and first-time visitors. From the thousand torii gates of Fushimi Inari to the golden shimmer of Kinkaku-ji, this route takes you through Kyoto''s most iconic temples, serene zen gardens, and atmospheric geisha districts. Each day is organized by area to minimize travel and maximize your immersion in Japan''s ancient capital.',
  'kyoto',
  3,
  'published',
  true,
  NULL,
  '["Culture", "Temples", "History", "First-timers", "Photography"]',
  0,
  NOW(),
  NOW()
);

-- 2) Insert the 3 days
INSERT INTO itinerary_days (id, itinerary_id, day_number, title, created_at) VALUES
  ('b2000000-1000-0000-0001-000000000001', 'b2000000-1000-0000-0000-000000000001', 1, 'Higashiyama Temples & Geisha District', NOW()),
  ('b2000000-1000-0000-0001-000000000002', 'b2000000-1000-0000-0000-000000000001', 2, 'Golden Pavilion, Zen Gardens & Imperial Kyoto', NOW()),
  ('b2000000-1000-0000-0001-000000000003', 'b2000000-1000-0000-0000-000000000001', 3, 'Arashiyama Bamboo & Fushimi Inari', NOW());

-- 3) Insert itinerary items

-- ===== DAY 1: Higashiyama Temples & Geisha District =====
INSERT INTO itinerary_items (id, day_id, spot_id, order_index, start_time, duration_minutes, note, transport_to_next, created_at) VALUES
(
  'b2000000-1000-0000-0002-000000010001',
  'b2000000-1000-0000-0001-000000000001',
  'b2000000-0000-0000-0000-000000000010', -- Sanjusangen-do
  0,
  '09:00',
  45,
  'Start your Kyoto journey with something truly awe-inspiring — 1,001 life-size golden statues of Kannon lined up in a 120-meter hall. Arrive right at opening to have the space nearly to yourself. The craftsmanship on each statue is unique; take time to find the face that looks like someone you know.',
  '{"mode": "bus", "durationMinutes": 15, "detail": "Bus #206 or #100 to Kiyomizu-michi stop"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000010002',
  'b2000000-1000-0000-0001-000000000001',
  'b2000000-0000-0000-0000-000000000006', -- Kiyomizu-dera
  1,
  '10:15',
  60,
  'Kyoto''s most celebrated temple, perched on a hillside with a massive wooden stage offering sweeping views of the city. The main hall was built without a single nail. In spring, cherry blossoms frame the stage; in autumn, the surrounding maples blaze with color. Don''t miss the Otowa Waterfall at the base — drink from one of the three streams for longevity, success, or love.',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Walk down the hillside into Higashiyama District"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000010003',
  'b2000000-1000-0000-0001-000000000001',
  'b2000000-0000-0000-0000-000000000017', -- Higashiyama District
  2,
  '11:20',
  75,
  'Wander down the stone-paved lanes of Ninenzaka and Sannenzaka — two of the most photogenic streets in all of Japan. Browse traditional pottery shops, pick up handmade fans or incense, and stop for matcha parfait at one of the many teahouses. According to superstition, if you trip on Ninenzaka, you''ll have two years of bad luck — so watch your step!',
  '{"mode": "walk", "durationMinutes": 10, "detail": "Walk north through Maruyama Park to Yasaka Shrine"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000010004',
  'b2000000-1000-0000-0001-000000000001',
  'b2000000-0000-0000-0000-000000000002', -- Yasaka Shrine
  3,
  '13:00',
  30,
  'The iconic vermillion shrine at the gateway to Gion. Grab lunch from the food stalls around Maruyama Park just behind the shrine before heading in. Yasaka is the heart of Kyoto''s famous Gion Matsuri festival and feels especially magical at night when the lanterns are lit.',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Walk west along Shijo-dori into Gion"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000010005',
  'b2000000-1000-0000-0001-000000000001',
  'b2000000-0000-0000-0000-000000000016', -- Gion District
  4,
  '13:45',
  60,
  'Kyoto''s legendary geisha district. Walk along Hanami-koji Street with its perfectly preserved wooden machiya townhouses and exclusive tea houses. Late afternoon is the best time to spot a geiko (geisha) or maiko (apprentice) hurrying to their evening engagements. Please be respectful — do not block their path or take photos without permission.',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Walk west along the riverbank to Pontocho"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000010006',
  'b2000000-1000-0000-0001-000000000001',
  'b2000000-0000-0000-0000-000000000019', -- Pontocho Alley
  5,
  '17:30',
  60,
  'End your first day at this narrow atmospheric alley running along the Kamogawa River. Choose a restaurant with kawadoko (riverside terrace) dining if visiting May–September — eating above the river as the sun sets is a quintessential Kyoto experience. Try Kyoto specialties like yudofu (hot tofu), obanzai (home-style Kyoto cuisine), or kaiseki (multi-course meal).',
  NULL,
  NOW()
);

-- ===== DAY 2: Golden Pavilion, Zen Gardens & Imperial Kyoto =====
INSERT INTO itinerary_items (id, day_id, spot_id, order_index, start_time, duration_minutes, note, transport_to_next, created_at) VALUES
(
  'b2000000-1000-0000-0002-000000020001',
  'b2000000-1000-0000-0001-000000000002',
  'b2000000-0000-0000-0000-000000000005', -- Kinkaku-ji (Golden Pavilion)
  0,
  '09:00',
  45,
  'Arrive early to see the Golden Pavilion in morning light with fewer crowds — the reflection on the mirror pond is most vivid before 10am. The top two floors are covered entirely in gold leaf and the surrounding garden is designed to represent a Buddhist paradise. Your admission ticket is actually an o-fuda (prayer charm), a unique souvenir in itself.',
  '{"mode": "bus", "durationMinutes": 10, "detail": "Bus #59 to Ryoan-ji-mae stop"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000020002',
  'b2000000-1000-0000-0001-000000000002',
  'b2000000-0000-0000-0000-000000000007', -- Ryoan-ji
  1,
  '10:15',
  45,
  'Japan''s most famous zen rock garden — 15 stones arranged on raked white gravel in a pattern that has mystified visitors since the 15th century. No matter where you sit on the viewing platform, at least one stone is always hidden. Take time to sit quietly and contemplate the garden. The surrounding moss garden and pond are also beautiful.',
  '{"mode": "bus", "durationMinutes": 15, "detail": "Bus #59 to Kitano Tenmangu-mae"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000020003',
  'b2000000-1000-0000-0001-000000000002',
  'b2000000-0000-0000-0000-000000000003', -- Kitano Tenmangu
  2,
  '11:30',
  45,
  'The shrine of learning, dedicated to scholar Sugawara no Michizane. Japanese students flock here before exams to pray for success — rub the bronze ox statue''s head for wisdom. If visiting in February–March, the plum blossom garden is spectacular. The surrounding street market on the 25th of each month is one of Kyoto''s best.',
  '{"mode": "bus", "durationMinutes": 20, "detail": "Bus #50 or #101 to Nijojo-mae"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000020004',
  'b2000000-1000-0000-0001-000000000002',
  'b2000000-0000-0000-0000-000000000025', -- Nijo Castle
  3,
  '12:45',
  75,
  'A UNESCO World Heritage fortress built by Tokugawa Ieyasu in 1603. Walk through the ornate Ninomaru Palace and listen for the famous "nightingale floors" — the floorboards chirp like birds when walked upon, an ingenious security system against intruders. The wall paintings by the Kano school are stunning. The surrounding gardens change dramatically with each season.',
  '{"mode": "bus", "durationMinutes": 15, "detail": "Bus #9 or #12 to Kyoto Gyoen"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000020005',
  'b2000000-1000-0000-0001-000000000002',
  'b2000000-0000-0000-0000-000000000024', -- Kyoto Imperial Palace
  4,
  '14:30',
  60,
  'The former residence of Japan''s Emperor for over a thousand years. Free guided tours run throughout the day (no reservation needed) and reveal elegant Shinden-zukuri architecture and ceremonial halls where emperors were crowned. The surrounding Kyoto Gyoen park is a vast, peaceful green space perfect for a quiet stroll or picnic.',
  '{"mode": "walk", "durationMinutes": 15, "detail": "Walk south through Teramachi-dori to Nishiki Market"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000020006',
  'b2000000-1000-0000-0001-000000000002',
  'b2000000-0000-0000-0000-000000000018', -- Nishiki Market
  5,
  '16:00',
  90,
  'Known as "Kyoto''s Kitchen" for over 400 years. This 400-meter covered market is the best place to sample Kyoto''s unique food culture. Must-try items: yuba (tofu skin) in every form imaginable, tsukemono (Kyoto-style pickles), dashi-maki tamago (rolled omelet), matcha sweets, and seasonal specialties. Come hungry — this is dinner and dessert rolled into one.',
  NULL,
  NOW()
);

-- ===== DAY 3: Arashiyama Bamboo & Fushimi Inari =====
INSERT INTO itinerary_items (id, day_id, spot_id, order_index, start_time, duration_minutes, note, transport_to_next, created_at) VALUES
(
  'b2000000-1000-0000-0002-000000030001',
  'b2000000-1000-0000-0001-000000000003',
  'b2000000-0000-0000-0000-000000000013', -- Arashiyama Bamboo Grove
  0,
  '08:00',
  30,
  'Arrive as early as possible — by 9am this narrow path becomes shoulder-to-shoulder with tour groups. In the early morning light, the towering bamboo stalks create an ethereal green cathedral. The rustling of the bamboo is designated as one of Japan''s top 100 soundscapes. Walk slowly and absorb the atmosphere.',
  '{"mode": "walk", "durationMinutes": 5, "detail": "Walk south to Tenryu-ji Temple entrance"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000030002',
  'b2000000-1000-0000-0001-000000000003',
  'b2000000-0000-0000-0000-000000000009', -- Tenryu-ji
  1,
  '08:45',
  60,
  'Arashiyama''s crown jewel — a UNESCO World Heritage Zen temple with one of Japan''s finest gardens. The Sogenchi Garden, designed by master Muso Soseki in the 14th century, uses the surrounding mountains as "borrowed scenery" to blur the line between garden and nature. Pay the extra fee to enter the main hall for the best garden views.',
  '{"mode": "walk", "durationMinutes": 10, "detail": "Walk south along the river to Togetsukyo Bridge"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000030003',
  'b2000000-1000-0000-0001-000000000003',
  'b2000000-0000-0000-0000-000000000023', -- Togetsukyo Bridge
  2,
  '10:00',
  20,
  'The iconic "Moon Crossing Bridge" with the forested Arashiyama mountains as a backdrop. Pause here for photos — the view is beautiful in every season but especially during cherry blossoms in spring and fiery maples in autumn. Rent a boat from the nearby dock for a different perspective on the river scenery.',
  '{"mode": "train", "durationMinutes": 40, "detail": "JR Sagano Line to Kyoto Station, then JR Nara Line to Inari Station"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000030004',
  'b2000000-1000-0000-0001-000000000003',
  'b2000000-0000-0000-0000-000000000001', -- Fushimi Inari Taisha
  3,
  '11:30',
  120,
  'Save the best for last — Japan''s most iconic shrine with thousands of vibrant vermillion torii gates creating tunnels up Mount Inari. The full hike to the 233-meter summit takes about 2–3 hours, but even walking the first section is spectacular. The torii thin out as you climb higher, rewarding determined hikers with quieter paths and panoramic city views. Grab inari-zushi (fried tofu sushi) from the vendors at the base — it''s the shrine''s namesake food.',
  '{"mode": "train", "durationMinutes": 15, "detail": "JR Nara Line to Tofukuji Station, walk 10 minutes"}',
  NOW()
),
(
  'b2000000-1000-0000-0002-000000030005',
  'b2000000-1000-0000-0001-000000000003',
  'b2000000-0000-0000-0000-000000000012', -- Nanzen-ji
  4,
  '14:30',
  60,
  'A grand Zen temple complex that makes the perfect finale to your Kyoto temple journey. Climb the massive Sanmon gate for panoramic views — this is the gate where the legendary thief Ishikawa Goemon reportedly gazed at the cherry blossoms. Don''t miss the brick aqueduct (Suirokaku) running through the grounds, a unique blend of Meiji-era engineering and ancient temple architecture. The rock garden in the Hojo is one of Kyoto''s finest.',
  NULL,
  NOW()
);
