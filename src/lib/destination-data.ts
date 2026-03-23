import type { Area } from "@/types";

const SUPABASE_STORAGE = "https://vupqtpngeogrmcyrtnam.supabase.co/storage/v1/object/public/destination-images";

export interface DestinationInfo {
  area: Area;
  label: string;
  emoji: string;
  heroImageUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  highlights: { title: string; description: string; icon: string }[];
  bestFor: string[];
  suggestedDays: string;
  bestSeason: string;
  gettingThere: string;
}

export const DESTINATION_DATA: Record<string, DestinationInfo> = {
  tokyo: {
    area: "tokyo",
    label: "Tokyo",
    emoji: "🗼",
    heroImageUrl: `${SUPABASE_STORAGE}/tokyo.jpg`,
    heroTitle: "Plan Your Perfect Tokyo Itinerary",
    heroSubtitle:
      "From the neon lights of Shinjuku to the serene Meiji Shrine — explore Tokyo with itineraries designed by professional travel agents.",
    metaTitle: "Tokyo Itinerary Planner — Best Things to Do in Tokyo",
    metaDescription:
      "Plan your Tokyo trip with expert-curated itineraries. Drag-and-drop planner with 50+ must-visit spots including Shibuya, Shinjuku, Asakusa, Akihabara & more. Free to use.",
    keywords: [
      "Tokyo itinerary",
      "Tokyo trip planner",
      "things to do in Tokyo",
      "Tokyo travel guide",
      "Tokyo sightseeing",
      "best Tokyo itinerary",
      "3 day Tokyo itinerary",
      "5 day Tokyo itinerary",
      "Tokyo vacation planner",
      "what to do in Tokyo",
    ],
    intro:
      "Tokyo is a city where ancient tradition meets cutting-edge innovation. Whether you are visiting the historic temples of Asakusa, shopping in Harajuku, or exploring the electric nightlife of Shibuya, our professional travel agents have crafted itineraries that help you experience the best of Tokyo without the stress of planning.",
    highlights: [
      {
        title: "Shibuya & Harajuku",
        description:
          "Walk the famous Shibuya Crossing, explore Takeshita Street's quirky shops, and visit the peaceful Meiji Shrine — all within walking distance.",
        icon: "🏙️",
      },
      {
        title: "Asakusa & Senso-ji",
        description:
          "Experience old-world Tokyo at Senso-ji Temple, browse Nakamise-dori for traditional souvenirs, and enjoy views of Tokyo Skytree.",
        icon: "⛩️",
      },
      {
        title: "Shinjuku & Kabukicho",
        description:
          "Discover the vibrant nightlife district, enjoy panoramic views from the Tokyo Metropolitan Government Building, and explore Golden Gai's tiny bars.",
        icon: "🌃",
      },
      {
        title: "Akihabara & Otaku Culture",
        description:
          "Dive into anime, manga, and electronics culture at the world's largest otaku district. Visit multi-story arcades and themed cafes.",
        icon: "🎮",
      },
    ],
    bestFor: ["First-time visitors", "Culture & history lovers", "Food enthusiasts", "Shopping & nightlife"],
    suggestedDays: "3–7 days",
    bestSeason: "March–May (cherry blossoms) and October–November (autumn foliage)",
    gettingThere: "Fly into Narita (NRT) or Haneda (HND) airport. Haneda is closer to the city center with a 20-minute train ride.",
  },
  kyoto: {
    area: "kyoto",
    label: "Kyoto",
    emoji: "⛩️",
    heroImageUrl: `${SUPABASE_STORAGE}/kyoto.jpg`,
    heroTitle: "Plan Your Perfect Kyoto Itinerary",
    heroSubtitle:
      "Discover the soul of Japan — ancient temples, bamboo forests, and traditional geisha districts, all planned by travel experts.",
    metaTitle: "Kyoto Itinerary Planner — Temples, Shrines & Hidden Gems",
    metaDescription:
      "Plan your Kyoto trip with professional itineraries. Visit Fushimi Inari, Arashiyama Bamboo Grove, Kinkaku-ji & more. Drag-and-drop planner — free to use.",
    keywords: [
      "Kyoto itinerary",
      "Kyoto trip planner",
      "things to do in Kyoto",
      "Kyoto travel guide",
      "Kyoto temples",
      "best Kyoto itinerary",
      "2 day Kyoto itinerary",
      "3 day Kyoto itinerary",
      "Kyoto sightseeing",
      "Fushimi Inari itinerary",
    ],
    intro:
      "Kyoto, Japan's ancient capital for over a thousand years, is home to more than 2,000 temples and shrines. From the iconic orange torii gates of Fushimi Inari to the golden pavilion of Kinkaku-ji, our travel professionals have designed itineraries that take you beyond the tourist crowds to discover the real Kyoto.",
    highlights: [
      {
        title: "Fushimi Inari Shrine",
        description:
          "Walk through thousands of vibrant orange torii gates winding up Mount Inari. Best visited early morning to avoid crowds.",
        icon: "⛩️",
      },
      {
        title: "Arashiyama Bamboo Grove",
        description:
          "Stroll through towering bamboo stalks, visit the nearby Tenryu-ji Temple, and cross the scenic Togetsukyo Bridge.",
        icon: "🎋",
      },
      {
        title: "Gion & Geisha District",
        description:
          "Explore the historic geisha district with traditional wooden machiya houses, tea houses, and the chance to spot a geiko or maiko.",
        icon: "👘",
      },
      {
        title: "Kinkaku-ji & Ryoan-ji",
        description:
          "Visit the stunning Golden Pavilion reflected in its mirror pond, and contemplate the famous rock garden at Ryoan-ji nearby.",
        icon: "🏯",
      },
    ],
    bestFor: ["Temple & shrine lovers", "History enthusiasts", "Photographers", "Traditional culture seekers"],
    suggestedDays: "2–4 days",
    bestSeason: "March–April (cherry blossoms) and November (autumn colors)",
    gettingThere: "Take the Shinkansen from Tokyo Station to Kyoto Station (about 2 hours 15 minutes). No flights needed if coming from Tokyo.",
  },
  osaka: {
    area: "osaka",
    label: "Osaka",
    emoji: "🏯",
    heroImageUrl: `${SUPABASE_STORAGE}/osaka.jpg`,
    heroTitle: "Plan Your Perfect Osaka Itinerary",
    heroSubtitle:
      "Japan's kitchen awaits — street food, vibrant nightlife, and Osaka Castle, all curated by travel professionals.",
    metaTitle: "Osaka Itinerary Planner — Street Food, Nightlife & Culture",
    metaDescription:
      "Plan your Osaka trip with expert itineraries. Explore Dotonbori, Osaka Castle, Universal Studios & more. Drag-and-drop trip planner — free.",
    keywords: [
      "Osaka itinerary",
      "Osaka trip planner",
      "things to do in Osaka",
      "Osaka travel guide",
      "Osaka street food",
      "best Osaka itinerary",
      "2 day Osaka itinerary",
      "Dotonbori guide",
      "Osaka sightseeing",
      "Osaka food tour",
    ],
    intro:
      "Known as Japan's kitchen, Osaka is a food lover's paradise with a vibrant street food scene and lively nightlife. From the neon-lit Dotonbori canal to the historic Osaka Castle, our professional travel agents have built itineraries that capture the energy and flavor of this incredible city.",
    highlights: [
      {
        title: "Dotonbori & Namba",
        description:
          "Experience Osaka's most iconic street food district. Try takoyaki, okonomiyaki, and kushikatsu while surrounded by neon lights and canal views.",
        icon: "🍢",
      },
      {
        title: "Osaka Castle",
        description:
          "Explore one of Japan's most famous landmarks surrounded by beautiful gardens. The castle museum offers panoramic city views from the top floor.",
        icon: "🏯",
      },
      {
        title: "Shinsekai & Tsutenkaku",
        description:
          "Visit the retro entertainment district with its iconic tower, kushikatsu restaurants, and nostalgic atmosphere reminiscent of 1960s Japan.",
        icon: "🗼",
      },
      {
        title: "Kuromon Market",
        description:
          "Browse Osaka's 'Kitchen' — a 600-meter covered market with fresh seafood, street food stalls, and local produce since 1902.",
        icon: "🐟",
      },
    ],
    bestFor: ["Food lovers", "Nightlife seekers", "Family travelers", "Budget travelers"],
    suggestedDays: "2–3 days",
    bestSeason: "March–May and September–November for comfortable weather",
    gettingThere: "Fly into Kansai International Airport (KIX) or take the Shinkansen from Tokyo (about 2.5 hours).",
  },
  hakone: {
    area: "hakone",
    label: "Hakone",
    emoji: "♨️",
    heroImageUrl: `${SUPABASE_STORAGE}/hakone.jpg`,
    heroTitle: "Plan Your Perfect Hakone Itinerary",
    heroSubtitle:
      "Hot springs, Mount Fuji views, and the Hakone Loop — a perfect day trip or weekend escape from Tokyo.",
    metaTitle: "Hakone Itinerary Planner — Hot Springs & Mt. Fuji Views",
    metaDescription:
      "Plan your Hakone trip with professional itineraries. Onsen hot springs, Lake Ashi, Owakudani, and Mt. Fuji views. Easy day trip from Tokyo. Free planner.",
    keywords: [
      "Hakone itinerary",
      "Hakone day trip from Tokyo",
      "Hakone hot springs",
      "Hakone onsen",
      "Hakone travel guide",
      "Hakone Loop",
      "Mt Fuji views Hakone",
      "Hakone sightseeing",
    ],
    intro:
      "Just 90 minutes from Tokyo, Hakone is the perfect escape for hot spring lovers and nature seekers. With stunning views of Mount Fuji, volcanic valleys, and serene Lake Ashi, our travel experts have designed itineraries that make the most of this mountain resort town.",
    highlights: [
      {
        title: "Hakone Open-Air Museum",
        description:
          "Explore a world-class sculpture garden set against the backdrop of the Hakone mountains, featuring works by Picasso, Moore, and more.",
        icon: "🎨",
      },
      {
        title: "Lake Ashi & Pirate Ships",
        description:
          "Cruise across the scenic lake on a replica pirate ship with stunning views of Mount Fuji on clear days.",
        icon: "⛵",
      },
      {
        title: "Owakudani Valley",
        description:
          "Experience the volcanic activity of Hakone at this steaming valley. Try the famous black eggs said to add 7 years to your life.",
        icon: "🌋",
      },
      {
        title: "Onsen Hot Springs",
        description:
          "Soak in natural hot spring baths at one of Hakone's many ryokan inns. Many offer private outdoor baths with mountain views.",
        icon: "♨️",
      },
    ],
    bestFor: ["Onsen lovers", "Nature seekers", "Day trippers from Tokyo", "Couples"],
    suggestedDays: "1–2 days",
    bestSeason: "Year-round, but autumn (November) is especially stunning",
    gettingThere: "Take the Odakyu Romance Car from Shinjuku Station (about 85 minutes, covered by Hakone Free Pass).",
  },
  nara: {
    area: "nara",
    label: "Nara",
    emoji: "🦌",
    heroImageUrl: `${SUPABASE_STORAGE}/nara.jpg`,
    heroTitle: "Plan Your Perfect Nara Itinerary",
    heroSubtitle:
      "Ancient temples, friendly deer, and Japan's oldest capital — a must-visit day trip from Kyoto or Osaka.",
    metaTitle: "Nara Itinerary Planner — Deer Park, Todai-ji & Ancient Capital",
    metaDescription:
      "Plan your Nara trip with expert itineraries. Visit Nara Deer Park, Todai-ji Temple, and Kasuga Taisha. Perfect day trip from Kyoto or Osaka. Free planner.",
    keywords: [
      "Nara itinerary",
      "Nara day trip",
      "Nara deer park",
      "things to do in Nara",
      "Nara travel guide",
      "Todai-ji temple",
      "Nara from Kyoto",
      "Nara sightseeing",
    ],
    intro:
      "Nara, Japan's first permanent capital, is famous for its friendly free-roaming deer and magnificent Buddhist temples. Just 45 minutes from Kyoto or Osaka, it makes an unforgettable day trip. Our travel agents have crafted itineraries to help you explore this ancient city's treasures.",
    highlights: [
      {
        title: "Nara Deer Park",
        description:
          "Meet over 1,000 friendly deer roaming freely in this expansive park. Buy deer crackers (shika senbei) to feed them — they even bow for treats!",
        icon: "🦌",
      },
      {
        title: "Todai-ji Temple",
        description:
          "Stand in awe before the Great Buddha (Daibutsu), housed in the world's largest wooden building. A UNESCO World Heritage Site.",
        icon: "🛕",
      },
      {
        title: "Kasuga Taisha",
        description:
          "Walk through hundreds of stone and bronze lanterns lining the approach to this atmospheric Shinto shrine in the forest.",
        icon: "🏮",
      },
      {
        title: "Naramachi District",
        description:
          "Explore the charming old merchant quarter with traditional machiya townhouses, craft shops, cafes, and small museums.",
        icon: "🏘️",
      },
    ],
    bestFor: ["Animal lovers", "History buffs", "Day trippers", "Families with kids"],
    suggestedDays: "1 day (day trip)",
    bestSeason: "March–May and October–November",
    gettingThere: "Take the Kintetsu Railway from Kyoto (35 min) or Osaka-Namba (40 min). JR lines also available.",
  },
  hiroshima: {
    area: "hiroshima",
    label: "Hiroshima",
    emoji: "🕊️",
    heroImageUrl: `${SUPABASE_STORAGE}/hiroshima.jpg`,
    heroTitle: "Plan Your Perfect Hiroshima Itinerary",
    heroSubtitle:
      "A city of peace and resilience — visit the Peace Memorial, Itsukushima Shrine on Miyajima Island, and savor Hiroshima-style okonomiyaki.",
    metaTitle: "Hiroshima Itinerary Planner — Peace Memorial & Miyajima Island",
    metaDescription:
      "Plan your Hiroshima trip with expert itineraries. Visit the Peace Memorial, Miyajima Island's floating torii gate & more. Free drag-and-drop planner.",
    keywords: [
      "Hiroshima itinerary",
      "Hiroshima trip planner",
      "things to do in Hiroshima",
      "Miyajima Island",
      "Hiroshima Peace Memorial",
      "Hiroshima travel guide",
      "Itsukushima Shrine",
      "Hiroshima day trip",
    ],
    intro:
      "Hiroshima is a city that has transformed from tragedy into a powerful symbol of peace. Beyond the moving Peace Memorial, the city offers incredible food, easy access to the stunning Miyajima Island, and warm hospitality. Our travel professionals will help you plan a meaningful and enriching visit.",
    highlights: [
      {
        title: "Peace Memorial Park & Museum",
        description:
          "Pay respects at the A-Bomb Dome, explore the museum, and reflect at the Cenotaph and Children's Peace Monument.",
        icon: "🕊️",
      },
      {
        title: "Miyajima Island",
        description:
          "Take a short ferry to see the iconic floating torii gate of Itsukushima Shrine, hike Mount Misen, and try momiji manju.",
        icon: "⛩️",
      },
      {
        title: "Hiroshima-style Okonomiyaki",
        description:
          "Try the local layered version of this savory pancake at Okonomimura, a multi-story building packed with okonomiyaki stalls.",
        icon: "🥞",
      },
      {
        title: "Shukkeien Garden",
        description:
          "Stroll through this beautifully landscaped garden dating back to 1620, featuring miniature valleys, mountains, and tea houses.",
        icon: "🌿",
      },
    ],
    bestFor: ["History & peace seekers", "Island explorers", "Food lovers", "Cultural travelers"],
    suggestedDays: "1–2 days",
    bestSeason: "March–May and October–November",
    gettingThere: "Take the Shinkansen from Kyoto (about 1 hour 40 minutes) or from Tokyo (about 4 hours).",
  },
  nikko: {
    area: "nikko",
    label: "Nikko",
    emoji: "🏔️",
    heroImageUrl: `${SUPABASE_STORAGE}/nikko.jpg`,
    heroTitle: "Plan Your Perfect Nikko Itinerary",
    heroSubtitle:
      "Ornate shrines, misty waterfalls, and mountain beauty — an unforgettable day trip from Tokyo.",
    metaTitle: "Nikko Itinerary Planner — Toshogu Shrine & Nature Trails",
    metaDescription:
      "Plan your Nikko trip with professional itineraries. Visit Toshogu Shrine, Kegon Falls, Lake Chuzenji & more. Day trip from Tokyo. Free planner.",
    keywords: [
      "Nikko itinerary",
      "Nikko day trip from Tokyo",
      "Toshogu Shrine",
      "Nikko travel guide",
      "things to do in Nikko",
      "Nikko sightseeing",
      "Kegon Falls",
      "Nikko national park",
    ],
    intro:
      "Nikko, set in the mountains north of Tokyo, is home to some of Japan's most lavishly decorated shrines and breathtaking natural scenery. The UNESCO-listed Toshogu Shrine, powerful Kegon Falls, and serene Lake Chuzenji make Nikko an ideal escape from the city.",
    highlights: [
      {
        title: "Toshogu Shrine",
        description:
          "Marvel at Japan's most elaborately decorated shrine, the mausoleum of Tokugawa Ieyasu. Home to the famous 'see no evil' monkeys.",
        icon: "🙈",
      },
      {
        title: "Kegon Falls",
        description:
          "Witness one of Japan's most famous waterfalls plunging 97 meters into the gorge below. Take the elevator for a dramatic close-up view.",
        icon: "💧",
      },
      {
        title: "Lake Chuzenji",
        description:
          "Enjoy the peaceful mountain lake formed by a volcanic eruption. Rent a boat or walk the scenic shoreline trail.",
        icon: "🏞️",
      },
      {
        title: "Shinkyo Bridge",
        description:
          "Cross the sacred vermillion bridge arching over the Daiya River — one of Japan's finest bridges and the gateway to Nikko's shrines.",
        icon: "🌉",
      },
    ],
    bestFor: ["Nature lovers", "Architecture enthusiasts", "Day trippers from Tokyo", "Photographers"],
    suggestedDays: "1–2 days",
    bestSeason: "October–November (autumn foliage is spectacular)",
    gettingThere: "Take the Tobu Railway from Asakusa Station (about 2 hours) or JR Shinkansen to Utsunomiya + local train.",
  },
  kamakura: {
    area: "kamakura",
    label: "Kamakura",
    emoji: "🌸",
    heroImageUrl: `${SUPABASE_STORAGE}/kamakura.jpg`,
    heroTitle: "Plan Your Perfect Kamakura Itinerary",
    heroSubtitle:
      "The Great Buddha, coastal temples, and seaside vibes — a charming day trip just south of Tokyo.",
    metaTitle: "Kamakura Itinerary Planner — Great Buddha & Coastal Temples",
    metaDescription:
      "Plan your Kamakura trip with expert itineraries. See the Great Buddha, Hasedera Temple, Tsurugaoka Hachimangu & beaches. Day trip from Tokyo. Free planner.",
    keywords: [
      "Kamakura itinerary",
      "Kamakura day trip",
      "Great Buddha Kamakura",
      "things to do in Kamakura",
      "Kamakura travel guide",
      "Kamakura from Tokyo",
      "Kamakura temples",
      "Kamakura beach",
    ],
    intro:
      "Once the political capital of medieval Japan, Kamakura is a coastal town packed with historic temples, hiking trails, and beautiful beaches. Just an hour from Tokyo, it offers a perfect blend of culture and nature that our travel agents have expertly woven into their itineraries.",
    highlights: [
      {
        title: "Great Buddha (Kotoku-in)",
        description:
          "Stand before the iconic 13-meter bronze Buddha statue that has been sitting in the open air since a tsunami destroyed its hall in 1498.",
        icon: "🗿",
      },
      {
        title: "Hasedera Temple",
        description:
          "Explore the temple grounds with stunning ocean views, a cave of tiny Buddha statues, and beautiful hydrangea gardens in June.",
        icon: "🌺",
      },
      {
        title: "Tsurugaoka Hachimangu",
        description:
          "Visit Kamakura's most important shrine, walk the tree-lined approach from the beach, and enjoy seasonal festivals.",
        icon: "⛩️",
      },
      {
        title: "Enoshima Island",
        description:
          "Cross the bridge to this small island for shrines, sea caves, ocean views, and fresh shirasu (whitebait) dishes.",
        icon: "🏝️",
      },
    ],
    bestFor: ["Beach lovers", "History buffs", "Hikers", "Day trippers from Tokyo"],
    suggestedDays: "1 day (day trip)",
    bestSeason: "June (hydrangeas), March–April (cherry blossoms), autumn",
    gettingThere: "Take the JR Yokosuka Line from Tokyo Station (about 55 minutes) or Enoden Line from Fujisawa.",
  },
  yokohama: {
    area: "yokohama",
    label: "Yokohama",
    emoji: "🚢",
    heroImageUrl: `${SUPABASE_STORAGE}/yokohama.jpg`,
    heroTitle: "Plan Your Perfect Yokohama Itinerary",
    heroSubtitle:
      "Japan's vibrant port city — Chinatown, waterfront skyline, and ramen museum, right next to Tokyo.",
    metaTitle: "Yokohama Itinerary Planner — Chinatown, Waterfront & Ramen",
    metaDescription:
      "Plan your Yokohama trip with professional itineraries. Explore Chinatown, Minato Mirai, Cup Noodles Museum & more. Easy from Tokyo. Free planner.",
    keywords: [
      "Yokohama itinerary",
      "Yokohama trip planner",
      "things to do in Yokohama",
      "Yokohama Chinatown",
      "Yokohama travel guide",
      "Minato Mirai",
      "Cup Noodles Museum",
      "Yokohama from Tokyo",
    ],
    intro:
      "Yokohama, Japan's second-largest city, sits just 30 minutes from Tokyo and offers a completely different vibe. With the largest Chinatown in Japan, a stunning waterfront skyline, and unique museums, Yokohama is a fantastic addition to any Japan itinerary.",
    highlights: [
      {
        title: "Yokohama Chinatown",
        description:
          "Explore the largest Chinatown in Japan with over 500 shops and restaurants. Try nikuman (steamed buns) and authentic Chinese cuisine.",
        icon: "🥟",
      },
      {
        title: "Minato Mirai Waterfront",
        description:
          "Walk along the stunning harbor with views of the Landmark Tower, Cosmo World ferris wheel, and the Red Brick Warehouse.",
        icon: "🎡",
      },
      {
        title: "Cup Noodles Museum",
        description:
          "Discover the history of instant noodles and create your own custom Cup Noodles at this interactive and fun museum.",
        icon: "🍜",
      },
      {
        title: "Sankeien Garden",
        description:
          "Wander through a spacious Japanese garden featuring historic buildings relocated from Kyoto, Kamakura, and other parts of Japan.",
        icon: "🌿",
      },
    ],
    bestFor: ["Food lovers", "Families", "Architecture fans", "Easy side trip from Tokyo"],
    suggestedDays: "1 day (half-day to full-day trip)",
    bestSeason: "Year-round, spring and autumn are most pleasant",
    gettingThere: "Take the JR or Tokyu Toyoko Line from Shibuya (about 30 minutes).",
  },
  fukuoka: {
    area: "fukuoka",
    label: "Fukuoka",
    emoji: "🍜",
    heroImageUrl: `${SUPABASE_STORAGE}/fukuoka.jpg`,
    heroTitle: "Plan Your Perfect Fukuoka Itinerary",
    heroSubtitle:
      "Japan's ramen capital — yatai street stalls, historic temples, and a gateway to Kyushu, planned by experts.",
    metaTitle: "Fukuoka Itinerary Planner — Ramen, Yatai & Kyushu Gateway",
    metaDescription:
      "Plan your Fukuoka trip with professional itineraries. Famous ramen, yatai food stalls, Ohori Park, and Dazaifu Shrine. Free drag-and-drop planner.",
    keywords: [
      "Fukuoka itinerary",
      "Fukuoka trip planner",
      "things to do in Fukuoka",
      "Fukuoka ramen",
      "Fukuoka travel guide",
      "yatai food stalls",
      "Fukuoka sightseeing",
      "Hakata ramen",
    ],
    intro:
      "Fukuoka, the largest city on Kyushu island, is famous for its incredible food scene — especially Hakata-style tonkotsu ramen and yatai street food stalls along the river. With a relaxed atmosphere, beautiful parks, and easy access to the rest of Kyushu, our travel agents have designed itineraries that showcase the best of this underrated destination.",
    highlights: [
      {
        title: "Yatai Food Stalls",
        description:
          "Experience Fukuoka's iconic open-air food stalls along the Naka River. Sit shoulder-to-shoulder with locals enjoying ramen, yakitori, and gyoza.",
        icon: "🏮",
      },
      {
        title: "Hakata Ramen",
        description:
          "Taste the city's signature creamy tonkotsu (pork bone) ramen at famous shops like Ichiran, Ippudo, or Shin Shin.",
        icon: "🍜",
      },
      {
        title: "Dazaifu Tenmangu",
        description:
          "Visit the beautiful shrine dedicated to the god of learning, famous for its plum blossoms and the unique Starbucks designed by Kengo Kuma.",
        icon: "⛩️",
      },
      {
        title: "Ohori Park",
        description:
          "Relax at this beautiful park built around a large pond, perfect for jogging, pedal boating, or visiting the adjacent art museum.",
        icon: "🌳",
      },
    ],
    bestFor: ["Ramen lovers", "Street food fans", "Off-the-beaten-path travelers", "Kyushu explorers"],
    suggestedDays: "2–3 days",
    bestSeason: "March–May and September–November",
    gettingThere: "Fly into Fukuoka Airport (just 5 minutes by subway to the city center) or Shinkansen from Osaka (about 2.5 hours).",
  },
};
