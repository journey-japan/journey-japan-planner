-- ============================================
-- Journey Japan Planner - Tokyo Spots Expansion
-- Run this in Supabase SQL Editor
-- Adds ~38 more spots to reach 50 total
-- ============================================

INSERT INTO public.spots (id, name_en, name_ja, description, category, area, lat, lng, address, admission_fee, avg_duration_min) VALUES

-- === SHRINES & TEMPLES ===
('a1000000-0000-0000-0000-000000000013', 'Nezu Shrine', '根津神社', 'One of Tokyo''s oldest shrines, famous for its stunning azalea garden and rows of vermillion torii gates reminiscent of Kyoto''s Fushimi Inari.', 'shrine', 'tokyo', 35.7205, 139.7619, '1-28-9 Nezu, Bunkyo City, Tokyo', 'Free', 45),

('a1000000-0000-0000-0000-000000000014', 'Zojo-ji Temple', '増上寺', 'A grand Buddhist temple at the foot of Tokyo Tower, with a beautiful main gate and rows of jizo statues. Stunning photo spot with Tokyo Tower in the background.', 'temple', 'tokyo', 35.6586, 139.7486, '4-7-35 Shibakoen, Minato City, Tokyo', 'Free', 45),

('a1000000-0000-0000-0000-000000000015', 'Gotokuji Temple', '豪徳寺', 'The legendary birthplace of the maneki-neko (beckoning cat). Hundreds of cat figurines line the temple grounds — a hidden gem beloved by locals.', 'temple', 'tokyo', 35.6530, 139.6427, '2-24-7 Gotokuji, Setagaya City, Tokyo', 'Free', 60),

('a1000000-0000-0000-0000-000000000016', 'Meiji Jingu Outer Garden', '明治神宮外苑', 'Famous for its iconic ginkgo tree-lined avenue that turns brilliant gold in autumn. A popular spot for photos and leisurely strolls.', 'park', 'tokyo', 35.6775, 139.7178, 'Kasumigaokamachi, Shinjuku City, Tokyo', 'Free', 45),

-- === OBSERVATION & LANDMARKS ===
('a1000000-0000-0000-0000-000000000017', 'Tokyo Tower', '東京タワー', 'The iconic 333m red-and-white lattice tower inspired by the Eiffel Tower. The main and top observation decks offer panoramic city views.', 'observation', 'tokyo', 35.6586, 139.7454, '4-2-8 Shibakoen, Minato City, Tokyo', '¥1,200', 60),

('a1000000-0000-0000-0000-000000000018', 'Tokyo Metropolitan Government Building', '東京都庁', 'Free observation decks on the 45th floor of both towers offer stunning views of Tokyo, including Mt. Fuji on clear days. A budget-friendly alternative to paid observatories.', 'observation', 'tokyo', 35.6896, 139.6922, '2-8-1 Nishishinjuku, Shinjuku City, Tokyo', 'Free', 45),

('a1000000-0000-0000-0000-000000000019', 'Rainbow Bridge', 'レインボーブリッジ', 'The iconic suspension bridge connecting central Tokyo to Odaiba. Walk across it for free and enjoy views of Tokyo Bay, the skyline, and Tokyo Tower.', 'landmark', 'tokyo', 35.6370, 139.7637, 'Kaigan, Minato City, Tokyo', 'Free', 60),

('a1000000-0000-0000-0000-000000000020', 'Roppongi Hills Mori Tower', '六本木ヒルズ森タワー', 'The Tokyo City View observation deck on the 52nd floor and the rooftop Sky Deck offer breathtaking 360-degree views. Also home to the Mori Art Museum.', 'observation', 'tokyo', 35.6604, 139.7292, '6-10-1 Roppongi, Minato City, Tokyo', '¥2,000', 75),

-- === FOOD & MARKETS ===
('a1000000-0000-0000-0000-000000000021', 'Toyosu Fish Market', '豊洲市場', 'The world''s largest wholesale fish market and successor to the famous Tsukiji inner market. Watch the tuna auctions from the observation deck and enjoy the freshest sushi.', 'market', 'tokyo', 35.6454, 139.7814, '6-6-1 Toyosu, Koto City, Tokyo', 'Free', 120),

('a1000000-0000-0000-0000-000000000022', 'Omoide Yokocho (Memory Lane)', '思い出横丁', 'A narrow alley of tiny yakitori bars and izakayas near Shinjuku Station. Also known as "Piss Alley" — an atmospheric slice of old Tokyo nightlife.', 'food', 'tokyo', 35.6938, 139.6988, 'Nishishinjuku, Shinjuku City, Tokyo', NULL, 60),

('a1000000-0000-0000-0000-000000000023', 'Hoppy Street (Hoppy Dori)', 'ホッピー通り', 'A lively street in Asakusa lined with izakayas and street food stalls. Perfect for an authentic Japanese drinking and dining experience alongside locals.', 'food', 'tokyo', 35.7122, 139.7948, 'Asakusa, Taito City, Tokyo', NULL, 60),

('a1000000-0000-0000-0000-000000000024', 'Yanaka Ginza Shopping Street', '谷中銀座商店街', 'A charming retro shopping street in one of Tokyo''s most traditional neighborhoods. Try menchi-katsu, taiyaki, and soak in the old-town atmosphere.', 'shopping', 'tokyo', 35.7274, 139.7670, 'Yanaka, Taito City, Tokyo', NULL, 60),

('a1000000-0000-0000-0000-000000000025', 'Golden Gai', '新宿ゴールデン街', 'A maze of over 200 tiny bars crammed into six narrow alleys in Shinjuku. Each bar has its own unique theme and fits only a handful of customers.', 'food', 'tokyo', 35.6943, 139.7035, 'Kabukicho, Shinjuku City, Tokyo', NULL, 90),

('a1000000-0000-0000-0000-000000000026', 'Ameya-Yokocho (Ameyoko)', 'アメ横', 'A bustling open-air market street near Ueno Station selling everything from fresh seafood and spices to clothes and cosmetics at bargain prices.', 'market', 'tokyo', 35.7095, 139.7745, 'Ueno, Taito City, Tokyo', NULL, 60),

-- === MUSEUMS & ENTERTAINMENT ===
('a1000000-0000-0000-0000-000000000027', 'Ghibli Museum', '三鷹の森ジブリ美術館', 'A whimsical museum dedicated to Studio Ghibli films. Features original short films, exhibits on animation, and a rooftop garden with a life-size Robot Soldier.', 'museum', 'tokyo', 35.6962, 139.5704, '1-1-83 Shimorenjaku, Mitaka, Tokyo', '¥1,000', 120),

('a1000000-0000-0000-0000-000000000028', 'Edo-Tokyo Museum', '江戸東京博物館', 'A fascinating museum showcasing Tokyo''s history from the Edo period to the modern era with life-size replicas of historical buildings and streets.', 'museum', 'tokyo', 35.6966, 139.7959, '1-4-1 Yokoami, Sumida City, Tokyo', '¥600', 90),

('a1000000-0000-0000-0000-000000000029', 'National Museum of Nature and Science', '国立科学博物館', 'Japan''s largest science museum in Ueno Park, featuring exhibits on dinosaurs, space, technology, and Japanese natural history. Great for families.', 'museum', 'tokyo', 35.7164, 139.7764, '7-20 Uenokoen, Taito City, Tokyo', '¥630', 120),

('a1000000-0000-0000-0000-000000000030', 'Tokyo National Museum', '東京国立博物館', 'Japan''s oldest and largest museum, housing an extensive collection of Japanese art, samurai armor, ukiyo-e prints, and Buddhist sculptures.', 'museum', 'tokyo', 35.7189, 139.7766, '13-9 Uenokoen, Taito City, Tokyo', '¥1,000', 120),

('a1000000-0000-0000-0000-000000000031', 'Robot Restaurant', 'ロボットレストラン', 'A wild, neon-lit entertainment show featuring robots, dancers, and over-the-top performances. Pure sensory overload and uniquely Tokyo.', 'entertainment', 'tokyo', 35.6942, 139.7026, 'Kabukicho, Shinjuku City, Tokyo', '¥8,500', 90),

('a1000000-0000-0000-0000-000000000032', 'Samurai Museum', '侍ミュージアム', 'An interactive museum where you can try on samurai armor, handle replica swords, and learn about Japan''s warrior history through guided tours.', 'museum', 'tokyo', 35.6951, 139.7021, 'Kabukicho, Shinjuku City, Tokyo', '¥1,900', 60),

-- === PARKS & NATURE ===
('a1000000-0000-0000-0000-000000000033', 'Ueno Park', '上野恩賜公園', 'Tokyo''s most famous park, home to multiple museums, a zoo, Shinobazu Pond, and one of the city''s top cherry blossom viewing spots.', 'park', 'tokyo', 35.7146, 139.7732, 'Uenokoen, Taito City, Tokyo', 'Free', 90),

('a1000000-0000-0000-0000-000000000034', 'Yoyogi Park', '代々木公園', 'A spacious park near Harajuku known for cherry blossoms, weekend flea markets, and performers. A relaxing green oasis in the heart of the city.', 'park', 'tokyo', 35.6718, 139.6948, 'Yoyogikamizonocho, Shibuya City, Tokyo', 'Free', 60),

('a1000000-0000-0000-0000-000000000035', 'Rikugien Garden', '六義園', 'One of Tokyo''s most beautiful traditional Japanese gardens, especially stunning during cherry blossom season (illuminated at night) and autumn foliage.', 'park', 'tokyo', 35.7321, 139.7460, '6-16-3 Honkomagome, Bunkyo City, Tokyo', '¥300', 60),

('a1000000-0000-0000-0000-000000000036', 'Inokashira Park', '井の頭恩賜公園', 'A beloved park in Kichijoji with a large pond for paddle boats, cherry blossom trees, and the Ghibli Museum nearby. Popular weekend destination.', 'park', 'tokyo', 35.6993, 139.5721, '1-18-31 Gotenyama, Musashino, Tokyo', 'Free', 60),

('a1000000-0000-0000-0000-000000000037', 'Hamarikyu Gardens', '浜離宮恩賜庭園', 'A stunning Edo-period garden with tidal ponds, a teahouse on the water, and skyline views of Shiodome skyscrapers. Accessible by water bus from Asakusa.', 'park', 'tokyo', 35.6596, 139.7634, '1-1 Hamarikyuteien, Chuo City, Tokyo', '¥300', 60),

-- === SHOPPING & NEIGHBORHOODS ===
('a1000000-0000-0000-0000-000000000038', 'Ginza', '銀座', 'Tokyo''s most upscale shopping district, home to luxury brand flagships, department stores, art galleries, and refined dining.', 'shopping', 'tokyo', 35.6717, 139.7649, 'Ginza, Chuo City, Tokyo', NULL, 120),

('a1000000-0000-0000-0000-000000000039', 'Nakamise Shopping Street', '仲見世通り', 'The traditional shopping street leading to Senso-ji Temple in Asakusa. Browse souvenirs, traditional snacks, and crafts in a festive atmosphere.', 'shopping', 'tokyo', 35.7126, 139.7965, 'Asakusa, Taito City, Tokyo', NULL, 45),

('a1000000-0000-0000-0000-000000000040', 'Shimokitazawa', '下北沢', 'A bohemian neighborhood beloved for vintage clothing shops, independent cafes, live music venues, and a creative, artistic atmosphere.', 'shopping', 'tokyo', 35.6615, 139.6687, 'Kitazawa, Setagaya City, Tokyo', NULL, 90),

('a1000000-0000-0000-0000-000000000041', 'Kichijoji', '吉祥寺', 'Consistently voted Tokyo''s most desirable neighborhood to live in. Known for Harmonica Yokocho (food alley), boutiques, and a relaxed vibe.', 'shopping', 'tokyo', 35.7033, 139.5795, 'Kichijoji, Musashino, Tokyo', NULL, 90),

('a1000000-0000-0000-0000-000000000042', 'Odaiba', 'お台場', 'A futuristic entertainment island in Tokyo Bay featuring shopping malls, the life-size Unicorn Gundam statue, teamLab Planets, and beach views.', 'entertainment', 'tokyo', 35.6270, 139.7753, 'Daiba, Minato City, Tokyo', NULL, 180),

('a1000000-0000-0000-0000-000000000043', 'Ikebukuro Sunshine City', '池袋サンシャインシティ', 'A massive commercial complex featuring an aquarium, planetarium, observation deck, and Namjatown — a Namco indoor theme park with gyoza and ice cream fests.', 'entertainment', 'tokyo', 35.7289, 139.7193, '3-1 Higashiikebukuro, Toshima City, Tokyo', NULL, 120),

-- === UNIQUE EXPERIENCES ===
('a1000000-0000-0000-0000-000000000044', 'Owl Cafe (Fukuro no Mise)', 'フクロウの店', 'A cozy cafe in Tsukishima where you can interact with owls up close. Book in advance as sessions are limited. A unique only-in-Japan experience.', 'entertainment', 'tokyo', 35.6627, 139.7781, 'Tsukishima, Chuo City, Tokyo', '¥1,500', 60),

('a1000000-0000-0000-0000-000000000045', 'Mario Kart Street Tour', 'マリカーストリートツアー', 'Drive go-karts through Tokyo streets dressed as your favorite video game characters. An unforgettable way to see the city from a unique perspective.', 'entertainment', 'tokyo', 35.6605, 139.7002, 'Shibuya, Tokyo', '¥10,000', 120),

('a1000000-0000-0000-0000-000000000046', 'Oedo Onsen Monogatari', '大江戸温泉物語', 'A hot spring theme park in Odaiba recreating an Edo-period town. Enjoy multiple baths, foot baths, games, and street food in a yukata.', 'onsen', 'tokyo', 35.6186, 139.7772, '2-6-3 Aomi, Koto City, Tokyo', '¥2,768', 180),

('a1000000-0000-0000-0000-000000000047', 'Kabukicho Tower', '歌舞伎町タワー', 'Shinjuku''s newest landmark tower featuring entertainment floors, a movie theater, a hotel, and a rooftop bar with panoramic views of the neon-lit district.', 'entertainment', 'tokyo', 35.6956, 139.7012, '1-29-1 Kabukicho, Shinjuku City, Tokyo', NULL, 90),

('a1000000-0000-0000-0000-000000000048', 'Toyosu teamLab Planets', 'チームラボ プラネッツ', 'An immersive body-experience museum where you wade through water, walk through flowers, and lose yourself in infinity mirror rooms. Walk barefoot through art.', 'museum', 'tokyo', 35.6500, 139.7895, '6-1-16 Toyosu, Koto City, Tokyo', '¥3,200', 90),

('a1000000-0000-0000-0000-000000000049', 'Sumo Wrestling at Ryogoku Kokugikan', '両国国技館', 'Watch professional sumo tournaments at Japan''s premier sumo arena. Tournaments are held in January, May, and September. A truly Japanese cultural experience.', 'entertainment', 'tokyo', 35.6968, 139.7930, '1-3-28 Yokoami, Sumida City, Tokyo', '¥3,800', 240),

('a1000000-0000-0000-0000-000000000050', 'Nihonbashi', '日本橋', 'The historic "Bridge of Japan" — the symbolic center point from which all distances in Japan are measured. The surrounding area blends Edo heritage with modern commerce.', 'landmark', 'tokyo', 35.6839, 139.7744, 'Nihonbashi, Chuo City, Tokyo', 'Free', 45);
