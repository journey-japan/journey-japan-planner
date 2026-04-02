-- ============================================
-- Nara スポットデータ INSERT SQL
-- 作成日: 2026-03-29
-- スポット数: 12件
-- ============================================
-- ⚠️ RLS制限のため anon key では INSERT 不可
-- Supabase Dashboard の SQL Editor で実行してください
-- ============================================

INSERT INTO public.spots (id, name_en, name_ja, description, category, area, lat, lng, address, admission_fee, avg_duration_min) VALUES

-- 1. Todai-ji Temple (東大寺)
('b4000000-0000-0000-0000-000000000001', 'Todai-ji Temple', '東大寺', 'Home to the Great Buddha (Daibutsu), a 15-meter bronze statue housed inside the world''s largest wooden building. This UNESCO World Heritage Site dates back to 752 AD and remains one of Japan''s most awe-inspiring Buddhist temples. The Nandaimon gate at the entrance features two fierce guardian statues.', 'temple', 'nara', 34.6890, 135.8398, '406-1 Zoshicho, Nara', '¥600', 60),

-- 2. Nara Park (奈良公園)
('b4000000-0000-0000-0000-000000000002', 'Nara Park', '奈良公園', 'A vast public park where over 1,000 wild sika deer roam freely among visitors. The deer are considered sacred messengers of the gods in Shinto tradition. Buy deer crackers (shika senbei, ¥200) to feed them — many deer have learned to bow politely for treats. Beautiful in every season, especially during cherry blossom and autumn foliage.', 'park', 'nara', 34.6851, 135.8430, 'Zoshicho, Nara', 'Free', 60),

-- 3. Kasuga Taisha (春日大社)
('b4000000-0000-0000-0000-000000000003', 'Kasuga Taisha', '春日大社', 'One of Japan''s most celebrated Shinto shrines, founded in 768 AD and designated a UNESCO World Heritage Site. Famous for its approximately 3,000 stone and bronze lanterns, which are lit during the Mantoro lantern festivals in February and August. The surrounding primeval forest adds a mystical atmosphere.', 'shrine', 'nara', 34.6813, 135.8499, '160 Kasuganocho, Nara', 'Free (inner sanctuary ¥500)', 60),

-- 4. Kofuku-ji Temple (興福寺)
('b4000000-0000-0000-0000-000000000004', 'Kofuku-ji Temple', '興福寺', 'A historic Buddhist temple established in 710 AD, featuring a stunning five-story pagoda that is an iconic symbol of Nara. The National Treasure Museum houses remarkable Buddhist sculptures including the famous three-faced, six-armed Ashura statue. The temple grounds overlook scenic Sarusawa Pond.', 'temple', 'nara', 34.6833, 135.8329, '48 Noboriojicho, Nara', '¥700', 45),

-- 5. Naramachi District (ならまち)
('b4000000-0000-0000-0000-000000000005', 'Naramachi District', 'ならまち', 'Nara''s charming old merchant quarter, featuring beautifully preserved machiya (traditional wooden townhouses) dating back to the Edo period. Wander narrow lanes lined with craft shops, artisan workshops, cozy cafes, and small museums. Look for the red monkey charms (migawari-zaru) hanging outside houses as protective talismans.', 'shopping', 'nara', 34.6773, 135.8310, 'Naramachi, Nara', 'Free', 90),

-- 6. Isuien Garden (依水園)
('b4000000-0000-0000-0000-000000000006', 'Isuien Garden', '依水園', 'An exquisite Japanese garden consisting of two distinct sections: a front garden from the Edo period and a rear Meiji-era garden. The rear garden masterfully uses "borrowed scenery" (shakkei), incorporating Todai-ji''s Nandaimon gate and the hills of Wakakusayama into its landscape. One of Nara''s hidden gems and a peaceful escape from the crowds.', 'park', 'nara', 34.6880, 135.8380, '74 Suimoncho, Nara', '¥1,200', 45),

-- 7. Nara National Museum (奈良国立博物館)
('b4000000-0000-0000-0000-000000000007', 'Nara National Museum', '奈良国立博物館', 'A world-class museum specializing in Buddhist art, housing an outstanding collection of sculptures, paintings, and ritual objects. The annual Shoso-in Exhibition in autumn displays treasures from the 8th-century imperial repository. The beautiful Meiji-era main building is an architectural highlight in itself.', 'museum', 'nara', 34.6837, 135.8390, '50 Noboriojicho, Nara', '¥700', 90),

-- 8. Nigatsu-do Hall (二月堂)
('b4000000-0000-0000-0000-000000000008', 'Nigatsu-do Hall', '二月堂', 'A subtemple of Todai-ji perched on the hillside, offering spectacular panoramic views over Nara city. The balcony provides one of the best free viewpoints in the area. Famous for the dramatic Omizutori fire festival held every March, a tradition unbroken for over 1,270 years. A peaceful spot often missed by tourists.', 'temple', 'nara', 34.6912, 135.8416, '406-1 Zoshicho, Nara', 'Free', 30),

-- 9. Heijo Palace Site (平城宮跡)
('b4000000-0000-0000-0000-000000000009', 'Heijo Palace Site', '平城宮跡', 'The archaeological site of Japan''s imperial palace from 710 to 784 AD, when Nara was the nation''s capital. The reconstructed Suzaku Gate and Daigokuden (Great Audience Hall) give visitors a sense of the grandeur of ancient Japan. A UNESCO World Heritage Site with a spacious park perfect for a leisurely stroll.', 'landmark', 'nara', 34.6940, 135.7880, '3 Sakicho, Nara', 'Free', 60),

-- 10. Yoshiki-en Garden (吉城園)
('b4000000-0000-0000-0000-000000000010', 'Yoshiki-en Garden', '吉城園', 'A lovely traditional Japanese garden located right next to Isuien Garden but far less crowded. Features three distinct garden styles: a pond garden, a moss garden, and a tea ceremony garden. Free admission for foreign visitors makes it an excellent value. Especially beautiful in spring and autumn.', 'park', 'nara', 34.6876, 135.8370, '60-1 Noboriojicho, Nara', 'Free for foreign visitors', 30),

-- 11. Yakushi-ji Temple (薬師寺)
('b4000000-0000-0000-0000-000000000011', 'Yakushi-ji Temple', '薬師寺', 'A UNESCO World Heritage Site and one of the most famous Buddhist temples in Japan, founded in 680 AD. The East Pagoda is an original 8th-century structure considered a masterpiece of frozen music in architecture. The temple complex houses important Buddhist statues including the Yakushi Triad, a National Treasure.', 'temple', 'nara', 34.6686, 135.7842, '457 Nishinokyocho, Nara', '¥1,100', 60),

-- 12. Toshodai-ji Temple (唐招提寺)
('b4000000-0000-0000-0000-000000000012', 'Toshodai-ji Temple', '唐招提寺', 'Founded in 759 AD by the Chinese monk Ganjin (Jianzhen), who made six perilous attempts to reach Japan. The Golden Hall (Kondo) is the finest surviving example of Nara-period architecture. This tranquil UNESCO World Heritage Site sees far fewer tourists than central Nara temples, offering a peaceful and authentic experience.', 'temple', 'nara', 34.6756, 135.7836, '13-46 Gojomachi, Nara', '¥1,000', 45);
