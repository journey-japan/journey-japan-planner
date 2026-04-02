-- ============================================
-- Journey Japan Planner - Osaka Spots
-- Run this in Supabase SQL Editor
-- 22 spots covering castles, temples, shrines, food, shopping, entertainment, and experiences
-- ============================================

INSERT INTO public.spots (id, name_en, name_ja, description, category, area, lat, lng, address, admission_fee, avg_duration_min) VALUES

-- === LANDMARKS ===
('b3000000-0000-0000-0000-000000000001', 'Osaka Castle', '大阪城', 'One of Japan''s most iconic castles, originally built by Toyotomi Hideyoshi in 1583. The reconstructed main tower houses a museum tracing Osaka''s history and offers panoramic city views from the 8th floor observation deck. The surrounding park is stunning during cherry blossom season.', 'landmark', 'osaka', 34.6873, 135.5262, '1-1 Osakajo, Chuo Ward, Osaka', '¥600', 90),

('b3000000-0000-0000-0000-000000000002', 'Tsutenkaku Tower', '通天閣', 'The iconic symbol of Osaka''s Shinsekai district, this retro tower offers observation decks with city views. Rub the feet of Billiken, the god of things as they ought to be, for good luck. The neon-lit neighborhood below is pure Osaka energy.', 'landmark', 'osaka', 34.6525, 135.5064, '1-18-6 Ebisuhigashi, Naniwa Ward, Osaka', '¥900', 45),

('b3000000-0000-0000-0000-000000000003', 'Umeda Sky Building', '梅田スカイビル', 'A futuristic architectural marvel with a floating garden observatory connecting two 40-story towers. The open-air rooftop deck offers breathtaking 360-degree views, especially at sunset. The retro Takimi-koji alley in the basement recreates 1920s Osaka.', 'observation', 'osaka', 34.7052, 135.4906, '1-1-88 Oyodonaka, Kita Ward, Osaka', '¥1,500', 60),

('b3000000-0000-0000-0000-000000000004', 'Abeno Harukas', 'あべのハルカス', 'Japan''s tallest skyscraper at 300 meters, featuring the Harukas 300 observation deck on floors 58-60. On clear days you can see from Kobe to Nara. Also houses a department store, art museum, and Marriott hotel.', 'observation', 'osaka', 34.6462, 135.5131, '1-1-43 Abenosuji, Abeno Ward, Osaka', '¥1,500', 60),

-- === TEMPLES & SHRINES ===
('b3000000-0000-0000-0000-000000000005', 'Sumiyoshi Taisha', '住吉大社', 'One of Japan''s oldest and most prestigious Shinto shrines, founded in the 3rd century. Famous for its unique Sumiyoshi-zukuri architectural style predating Chinese influence, and the iconic arched Sorihashi Bridge. A must-visit for authentic spiritual atmosphere.', 'shrine', 'osaka', 34.6128, 135.4929, '2-9-89 Sumiyoshi, Sumiyoshi Ward, Osaka', 'Free', 45),

('b3000000-0000-0000-0000-000000000006', 'Shitenno-ji', '四天王寺', 'Japan''s oldest officially administered Buddhist temple, founded in 593 by Prince Shotoku. The five-story pagoda and central gate recreate the original 6th-century layout. The monthly flea market on the 21st and 22nd is a local favorite.', 'temple', 'osaka', 34.6533, 135.5165, '1-11-18 Shitennoji, Tennoji Ward, Osaka', '¥300', 45),

('b3000000-0000-0000-0000-000000000007', 'Namba Yasaka Shrine', '難波八阪神社', 'A quirky Shinto shrine famous for its giant lion-head stage (Ema-den), standing 12 meters tall with an open mouth believed to swallow evil spirits and bring good fortune. One of Osaka''s most photographed spots.', 'shrine', 'osaka', 34.6602, 135.4958, '2-9-19 Motomachi, Naniwa Ward, Osaka', 'Free', 20),

('b3000000-0000-0000-0000-000000000008', 'Hozen-ji Temple', '法善寺', 'A tiny, atmospheric temple hidden in a narrow alley near Dotonbori. The moss-covered Fudo Myo-o statue is constantly splashed with water by visitors praying for success in love and business. A tranquil oasis amid neon chaos.', 'temple', 'osaka', 34.6685, 135.5031, '1-2-16 Namba, Chuo Ward, Osaka', 'Free', 15),

-- === FOOD & MARKETS ===
('b3000000-0000-0000-0000-000000000009', 'Dotonbori', '道頓堀', 'Osaka''s most famous street and the heart of the city''s food culture. The neon-lit canal-side strip is packed with restaurants serving takoyaki, okonomiyaki, kushikatsu, and more. The iconic Glico Running Man sign is the ultimate Osaka photo spot.', 'food', 'osaka', 34.6687, 135.5019, 'Dotonbori, Chuo Ward, Osaka', NULL, 90),

('b3000000-0000-0000-0000-000000000010', 'Kuromon Market', '黒門市場', 'Known as "Osaka''s Kitchen," this 600-meter covered market has served locals for over 190 years. Fresh sashimi, grilled seafood, wagyu beef skewers, and seasonal fruits — all available to eat on the spot. Arrive early for the best selection.', 'market', 'osaka', 34.6624, 135.5073, '2-4-1 Nipponbashi, Chuo Ward, Osaka', NULL, 90),

('b3000000-0000-0000-0000-000000000011', 'Shinsekai', '新世界', 'A retro entertainment district built in 1912, inspired by New York and Paris. Famous for kushikatsu (deep-fried skewers) restaurants and its nostalgic, colorful atmosphere. The neighborhood around Tsutenkaku Tower feels like stepping back in time.', 'food', 'osaka', 34.6521, 135.5060, 'Ebisuhigashi, Naniwa Ward, Osaka', NULL, 60),

-- === SHOPPING & ENTERTAINMENT ===
('b3000000-0000-0000-0000-000000000012', 'Shinsaibashi-suji Shopping Street', '心斎橋筋商店街', 'Osaka''s premier shopping arcade stretching 600 meters with a covered roof. A mix of international luxury brands, Japanese fashion, drugstores, and local boutiques. Connected to Amerikamura (America Village) for vintage and streetwear.', 'shopping', 'osaka', 34.6728, 135.5012, 'Shinsaibashisuji, Chuo Ward, Osaka', NULL, 90),

('b3000000-0000-0000-0000-000000000013', 'Namba Grand Kagetsu', 'なんばグランド花月', 'The home stage of Yoshimoto Kogyo, Japan''s largest comedy entertainment company. Watch manzai (stand-up duo comedy) and shin-kigeki (new comedy theater) — Osaka''s legendary comedy culture at its finest. Some shows include English subtitles.', 'entertainment', 'osaka', 34.6666, 135.5029, '11-6 Nanba Sennichimae, Chuo Ward, Osaka', '¥4,800', 120),

('b3000000-0000-0000-0000-000000000014', 'Den Den Town', 'でんでんタウン', 'Osaka''s answer to Tokyo''s Akihabara. This electronics and otaku district is packed with shops selling anime goods, manga, retro games, figures, and cosplay items. Less touristy and more authentic than its Tokyo counterpart.', 'shopping', 'osaka', 34.6597, 135.5057, 'Nipponbashi, Naniwa Ward, Osaka', NULL, 60),

('b3000000-0000-0000-0000-000000000015', 'Tenjinbashi-suji Shopping Street', '天神橋筋商店街', 'Japan''s longest shopping street at 2.6 kilometers, stretching from Tenjinbashi to Tenma. A local''s paradise with affordable restaurants, quirky shops, and zero tourist pretense. Perfect for experiencing everyday Osaka life.', 'shopping', 'osaka', 34.7020, 135.5114, 'Tenjinbashi, Kita Ward, Osaka', NULL, 90),

-- === MUSEUMS & CULTURE ===
('b3000000-0000-0000-0000-000000000016', 'Osaka Museum of Housing and Living', '大阪くらしの今昔館', 'Walk through a full-scale recreation of an Edo-period Osaka townscape on the 9th floor. Rent a kimono and stroll through the meticulously recreated streets, shops, and homes. A unique and immersive cultural experience.', 'museum', 'osaka', 34.7044, 135.5114, '6-4-20 Tenjinbashi, Kita Ward, Osaka', '¥600', 60),

('b3000000-0000-0000-0000-000000000017', 'National Museum of Art Osaka', '国立国際美術館', 'A striking underground art museum designed by Cesar Pelli, with its dramatic steel-rod entrance sculpture. Houses an impressive collection of postwar Japanese and international contemporary art.', 'museum', 'osaka', 34.6913, 135.4914, '4-2-55 Nakanoshima, Kita Ward, Osaka', '¥430', 90),

('b3000000-0000-0000-0000-000000000018', 'Osaka Tenmangu', '大阪天満宮', 'A historic shrine dedicated to the scholar deity Sugawara no Michizane, dating back to 949 AD. Famous for the Tenjin Matsuri in July — one of Japan''s top three festivals featuring spectacular fireworks and boat processions on the river.', 'shrine', 'osaka', 34.6965, 135.5112, '2-1-8 Tenjinbashi, Kita Ward, Osaka', 'Free', 30),

-- === NATURE & PARKS ===
('b3000000-0000-0000-0000-000000000019', 'Osaka Castle Park', '大阪城公園', 'A vast urban park surrounding Osaka Castle with over 3,000 cherry trees, plum groves, and open lawns. The Nishinomaru Garden offers the best castle views during cherry blossom season. Popular for jogging, picnics, and seasonal festivals.', 'park', 'osaka', 34.6870, 135.5259, '1-1 Osakajo, Chuo Ward, Osaka', 'Free (Nishinomaru Garden ¥200)', 60),

('b3000000-0000-0000-0000-000000000020', 'Nakanoshima Park', '中之島公園', 'A scenic riverside park on a sandbar between the Dojima and Tosabori rivers. Beautiful rose garden with over 3,700 roses, plus historic Meiji-era buildings including the elegant Central Public Hall. A peaceful escape in the city center.', 'park', 'osaka', 34.6929, 135.5073, 'Nakanoshima, Kita Ward, Osaka', 'Free', 45),

-- === UNIQUE EXPERIENCES ===
('b3000000-0000-0000-0000-000000000021', 'Tombori River Cruise', '道頓堀川クルーズ', 'A 20-minute boat cruise along the Dotonbori canal, gliding under illuminated bridges and past the iconic neon signs. See the city from water level for a completely different perspective of Osaka''s famous entertainment district.', 'entertainment', 'osaka', 34.6685, 135.5035, 'Dotonbori, Chuo Ward, Osaka', '¥1,000', 30),

('b3000000-0000-0000-0000-000000000022', 'Spa World', 'スパワールド', 'A massive onsen theme park in Shinsekai featuring baths themed after countries around the world — from ancient Rome to Bali. Multiple floors of hot springs, pools, saunas, and relaxation areas. An over-the-top, uniquely Osaka experience.', 'onsen', 'osaka', 34.6506, 135.5056, '3-4-24 Ebisuhigashi, Naniwa Ward, Osaka', '¥1,500', 180);
