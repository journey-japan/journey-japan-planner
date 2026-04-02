-- ============================================
-- Journey Japan Planner - Kyoto Spots
-- Run this in Supabase SQL Editor
-- 25 spots covering temples, shrines, parks, food, shopping, and experiences
-- ============================================

INSERT INTO public.spots (id, name_en, name_ja, description, category, area, lat, lng, address, admission_fee, avg_duration_min) VALUES

-- === SHRINES ===
('b2000000-0000-0000-0000-000000000001', 'Fushimi Inari Taisha', '伏見稲荷大社', 'Japan''s most iconic shrine, famous for its thousands of vibrant vermillion torii gates winding up Mount Inari. The full hike to the summit takes about 2 hours, but even a short walk through the lower gates is unforgettable. Best visited early morning to avoid crowds.', 'shrine', 'kyoto', 34.9671, 135.7727, '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto', 'Free', 90),

('b2000000-0000-0000-0000-000000000002', 'Yasaka Shrine', '八坂神社', 'A vibrant Shinto shrine at the eastern end of Shijo Street and the gateway to Gion. Famous for the Gion Matsuri festival in July and illuminated beautifully at night.', 'shrine', 'kyoto', 35.0036, 135.7785, '625 Gionmachi Kitagawa, Higashiyama Ward, Kyoto', 'Free', 30),

('b2000000-0000-0000-0000-000000000003', 'Kitano Tenmangu', '北野天満宮', 'A major shrine dedicated to the god of learning, famous for its plum blossom garden in February and March. Students flock here to pray for exam success.', 'shrine', 'kyoto', 35.0312, 135.7352, 'Bakurocho, Kamigyo Ward, Kyoto', 'Free (garden ¥1,000 in season)', 45),

('b2000000-0000-0000-0000-000000000004', 'Shimogamo Shrine', '下鴨神社', 'One of Kyoto''s oldest shrines, set within the ancient Tadasu no Mori forest. A UNESCO World Heritage Site with a serene, spiritual atmosphere away from the tourist crowds.', 'shrine', 'kyoto', 35.0393, 135.7723, '59 Shimogamo Izumikawacho, Sakyo Ward, Kyoto', 'Free', 45),

-- === TEMPLES ===
('b2000000-0000-0000-0000-000000000005', 'Kinkaku-ji (Golden Pavilion)', '金閣寺', 'Kyoto''s most famous landmark — a stunning Zen temple covered in gold leaf, reflected perfectly in its mirror pond. Originally built in 1397 as a retirement villa for Shogun Ashikaga Yoshimitsu.', 'temple', 'kyoto', 35.0394, 135.7292, '1 Kinkakujicho, Kita Ward, Kyoto', '¥500', 45),

('b2000000-0000-0000-0000-000000000006', 'Kiyomizu-dera', '清水寺', 'A UNESCO World Heritage temple perched on a hillside with a massive wooden stage offering panoramic views of Kyoto. The approach through Higashiyama''s traditional streets is equally charming.', 'temple', 'kyoto', 34.9949, 135.7850, '1-294 Kiyomizu, Higashiyama Ward, Kyoto', '¥400', 60),

('b2000000-0000-0000-0000-000000000007', 'Ryoan-ji', '龍安寺', 'Home to Japan''s most famous Zen rock garden — 15 stones arranged on white gravel in a design that has puzzled visitors for centuries. No matter where you sit, you can never see all 15 stones at once.', 'temple', 'kyoto', 35.0345, 135.7185, '13 Ryoanji Goryonoshitacho, Ukyo Ward, Kyoto', '¥500', 45),

('b2000000-0000-0000-0000-000000000008', 'Ginkaku-ji (Silver Pavilion)', '銀閣寺', 'Despite its name, this temple was never covered in silver. Instead, its understated beauty and exquisite sand garden represent the wabi-sabi aesthetic of Japanese culture. The moss garden and hillside trail are beautiful.', 'temple', 'kyoto', 35.0270, 135.7983, '2 Ginkakujicho, Sakyo Ward, Kyoto', '¥500', 45),

('b2000000-0000-0000-0000-000000000009', 'Tenryu-ji', '天龍寺', 'The most important temple in Arashiyama and a UNESCO World Heritage Site. Its stunning garden, designed by the famous Muso Soseki, is one of the finest in Japan with borrowed scenery of the surrounding mountains.', 'temple', 'kyoto', 35.0154, 135.6745, '68 Sagatenryuji Susukinobabacho, Ukyo Ward, Kyoto', '¥500 (garden), ¥800 (garden + hall)', 60),

('b2000000-0000-0000-0000-000000000010', 'Sanjusangen-do', '三十三間堂', 'A long wooden hall housing 1,001 life-size statues of Kannon, the goddess of mercy. The sheer scale and detail of the golden statues is breathtaking and unlike anything else in Japan.', 'temple', 'kyoto', 34.9879, 135.7717, '657 Sanjusangendomawari, Higashiyama Ward, Kyoto', '¥600', 45),

('b2000000-0000-0000-0000-000000000011', 'Tofuku-ji', '東福寺', 'One of Kyoto''s best autumn foliage spots. The Tsutenkyo Bridge offers a spectacular view of a valley carpeted in fiery red and orange maples. Also worth visiting for its modern Zen gardens.', 'temple', 'kyoto', 34.9764, 135.7740, '15-778 Honmachi, Higashiyama Ward, Kyoto', '¥600', 60),

('b2000000-0000-0000-0000-000000000012', 'Nanzen-ji', '南禅寺', 'A grand Zen temple complex with a massive Sanmon gate offering panoramic views. The brick aqueduct running through the grounds is a unique and photogenic blend of traditional and Meiji-era architecture.', 'temple', 'kyoto', 35.0112, 135.7931, 'Nanzenji Fukuchicho, Sakyo Ward, Kyoto', '¥500 (Sanmon), ¥400 (garden)', 60),

-- === NATURE & PARKS ===
('b2000000-0000-0000-0000-000000000013', 'Arashiyama Bamboo Grove', '嵐山竹林の小径', 'A magical path through towering bamboo stalks that sway gently in the wind. The rustling sound of the bamboo is designated as one of Japan''s top 100 soundscapes. Best experienced early morning.', 'nature', 'kyoto', 35.0170, 135.6713, 'Sagaogurayama Tabuchiyamacho, Ukyo Ward, Kyoto', 'Free', 30),

('b2000000-0000-0000-0000-000000000014', 'Philosopher''s Path', '哲学の道', 'A scenic 2km stone path along a cherry-tree-lined canal connecting Ginkaku-ji to Nanzen-ji. Named after philosopher Nishida Kitaro who used it for daily meditation walks. Stunning during cherry blossom season.', 'nature', 'kyoto', 35.0210, 135.7943, 'Shishigatanicho, Sakyo Ward, Kyoto', 'Free', 60),

('b2000000-0000-0000-0000-000000000015', 'Maruyama Park', '円山公園', 'Kyoto''s most popular cherry blossom viewing spot, centered around a famous weeping cherry tree that is illuminated at night in spring. A perfect place to relax after visiting nearby Yasaka Shrine.', 'park', 'kyoto', 35.0033, 135.7815, 'Maruyamacho, Higashiyama Ward, Kyoto', 'Free', 45),

-- === CULTURAL DISTRICTS ===
('b2000000-0000-0000-0000-000000000016', 'Gion District', '祇園', 'Kyoto''s most famous geisha district with beautifully preserved wooden machiya houses, traditional tea houses, and upscale restaurants. Walk along Hanami-koji Street at dusk for the best chance to spot a geiko or maiko.', 'landmark', 'kyoto', 35.0037, 135.7756, 'Gionmachi, Higashiyama Ward, Kyoto', 'Free', 60),

('b2000000-0000-0000-0000-000000000017', 'Higashiyama District', '東山', 'A beautifully preserved historic area with traditional shops, tea houses, and temples along stone-paved slopes. The streets of Ninenzaka and Sannenzaka leading to Kiyomizu-dera are iconic photo spots.', 'landmark', 'kyoto', 34.9983, 135.7806, 'Higashiyama Ward, Kyoto', 'Free', 90),

-- === FOOD ===
('b2000000-0000-0000-0000-000000000018', 'Nishiki Market', '錦市場', 'Known as "Kyoto''s Kitchen," this 400-meter covered market has been the city''s go-to food destination for over 400 years. Sample local specialties like yuba (tofu skin), tsukemono (pickles), and matcha sweets.', 'market', 'kyoto', 35.0050, 135.7649, 'Nishikikoji-dori, Nakagyo Ward, Kyoto', 'Free', 90),

('b2000000-0000-0000-0000-000000000019', 'Pontocho Alley', '先斗町', 'A narrow atmospheric alley running parallel to the Kamogawa River, lined with traditional restaurants and bars. Many restaurants offer riverside terrace seating (kawadoko) in summer — a quintessential Kyoto experience.', 'food', 'kyoto', 35.0049, 135.7708, 'Pontocho, Nakagyo Ward, Kyoto', NULL, 60),

-- === SHOPPING ===
('b2000000-0000-0000-0000-000000000020', 'Teramachi & Shinkyogoku Shopping Streets', '寺町通 & 新京極', 'Two parallel covered shopping arcades in central Kyoto offering a mix of traditional craft shops, souvenir stores, modern boutiques, and street food stalls.', 'shopping', 'kyoto', 35.0051, 135.7672, 'Teramachi-dori, Nakagyo Ward, Kyoto', NULL, 60),

-- === MUSEUMS ===
('b2000000-0000-0000-0000-000000000021', 'Kyoto Railway Museum', '京都鉄道博物館', 'A world-class railway museum featuring 53 trains from steam locomotives to shinkansen. Interactive exhibits, a train simulator, and an outdoor roundhouse make it fun for all ages.', 'museum', 'kyoto', 34.9867, 135.7460, 'Kankijicho, Shimogyo Ward, Kyoto', '¥1,200', 120),

('b2000000-0000-0000-0000-000000000022', 'Kyoto National Museum', '京都国立博物館', 'One of Japan''s premier museums with an extensive collection of Japanese art and artifacts. The modern Heisei Chishinkan wing by architect Taniguchi Yoshio is itself a work of art.', 'museum', 'kyoto', 34.9910, 135.7731, '527 Chayacho, Higashiyama Ward, Kyoto', '¥700', 90),

-- === UNIQUE EXPERIENCES ===
('b2000000-0000-0000-0000-000000000023', 'Togetsukyo Bridge', '渡月橋', 'The iconic bridge spanning the Katsura River in Arashiyama. Its name means "Moon Crossing Bridge" — the perfect backdrop for photos with the forested mountains behind. Beautiful in every season.', 'landmark', 'kyoto', 35.0130, 135.6777, 'Sagatenryuji, Ukyo Ward, Kyoto', 'Free', 15),

('b2000000-0000-0000-0000-000000000024', 'Kyoto Imperial Palace', '京都御所', 'The former residence of the Emperor of Japan for over a thousand years, set within the expansive Kyoto Gyoen National Garden. Free guided tours reveal the elegant Shinden-zukuri architecture and ceremonial halls.', 'landmark', 'kyoto', 35.0254, 135.7621, '3 Kyotogyoen, Kamigyo Ward, Kyoto', 'Free', 60),

('b2000000-0000-0000-0000-000000000025', 'Nijo Castle', '二条城', 'A UNESCO World Heritage Site built by Tokugawa Ieyasu in 1603. Famous for its "nightingale floors" that chirp when walked upon — an ingenious intruder alarm system. The ornate Ninomaru Palace paintings are stunning.', 'landmark', 'kyoto', 35.0142, 135.7481, '541 Nijojocho, Nakagyo Ward, Kyoto', '¥1,300', 75);
