/**
 * Unsplash画像一括取得スクリプト
 *
 * 使い方:
 * 1. https://unsplash.com/developers でアプリを作成
 * 2. Access Keyをコピー
 * 3. 実行: node scripts/fetch-unsplash-images.js YOUR_ACCESS_KEY
 *
 * 出力: supabase-spots-images.sql が生成される
 */

const ACCESS_KEY = process.argv[2];

if (!ACCESS_KEY) {
  console.error("Usage: node scripts/fetch-unsplash-images.js YOUR_UNSPLASH_ACCESS_KEY");
  console.error("");
  console.error("Get your key at: https://unsplash.com/developers");
  process.exit(1);
}

// 50 spots with their IDs and search queries
const spots = [
  { id: "a1000000-0000-0000-0000-000000000001", name: "Meiji Jingu Shrine", query: "meiji jingu shrine tokyo torii" },
  { id: "a1000000-0000-0000-0000-000000000002", name: "Takeshita Street", query: "takeshita street harajuku tokyo" },
  { id: "a1000000-0000-0000-0000-000000000003", name: "Shibuya Crossing", query: "shibuya crossing tokyo pedestrian" },
  { id: "a1000000-0000-0000-0000-000000000004", name: "Shibuya Sky", query: "shibuya sky observation deck tokyo" },
  { id: "a1000000-0000-0000-0000-000000000005", name: "Fuunji Tsukemen", query: "tsukemen ramen noodles japan bowl" },
  { id: "a1000000-0000-0000-0000-000000000006", name: "teamLab Borderless", query: "teamlab borderless digital art tokyo" },
  { id: "a1000000-0000-0000-0000-000000000007", name: "Senso-ji Temple", query: "sensoji temple asakusa tokyo gate" },
  { id: "a1000000-0000-0000-0000-000000000008", name: "Akihabara Electric Town", query: "akihabara tokyo neon anime electric" },
  { id: "a1000000-0000-0000-0000-000000000009", name: "Tsukiji Outer Market", query: "tsukiji market tokyo sushi seafood" },
  { id: "a1000000-0000-0000-0000-000000000010", name: "Tokyo Skytree", query: "tokyo skytree tower" },
  { id: "a1000000-0000-0000-0000-000000000011", name: "Shinjuku Gyoen", query: "shinjuku gyoen garden cherry blossom" },
  { id: "a1000000-0000-0000-0000-000000000012", name: "Imperial Palace Gardens", query: "imperial palace tokyo gardens moat" },
  { id: "a1000000-0000-0000-0000-000000000013", name: "Nezu Shrine", query: "nezu shrine tokyo torii gates azalea" },
  { id: "a1000000-0000-0000-0000-000000000014", name: "Zojo-ji Temple", query: "zojoji temple tokyo tower buddhist" },
  { id: "a1000000-0000-0000-0000-000000000015", name: "Gotokuji Temple", query: "gotokuji temple maneki neko cat tokyo" },
  { id: "a1000000-0000-0000-0000-000000000016", name: "Meiji Jingu Outer Garden", query: "ginkgo avenue tokyo autumn yellow trees" },
  { id: "a1000000-0000-0000-0000-000000000017", name: "Tokyo Tower", query: "tokyo tower night red" },
  { id: "a1000000-0000-0000-0000-000000000018", name: "Tokyo Metropolitan Government Building", query: "tokyo metropolitan government building shinjuku" },
  { id: "a1000000-0000-0000-0000-000000000019", name: "Rainbow Bridge", query: "rainbow bridge tokyo bay night" },
  { id: "a1000000-0000-0000-0000-000000000020", name: "Roppongi Hills Mori Tower", query: "roppongi hills tokyo city view observation" },
  { id: "a1000000-0000-0000-0000-000000000021", name: "Toyosu Fish Market", query: "toyosu fish market tokyo tuna" },
  { id: "a1000000-0000-0000-0000-000000000022", name: "Omoide Yokocho", query: "omoide yokocho memory lane shinjuku yakitori" },
  { id: "a1000000-0000-0000-0000-000000000023", name: "Hoppy Street", query: "hoppy street asakusa tokyo izakaya" },
  { id: "a1000000-0000-0000-0000-000000000024", name: "Yanaka Ginza", query: "yanaka ginza shopping street tokyo retro" },
  { id: "a1000000-0000-0000-0000-000000000025", name: "Golden Gai", query: "golden gai shinjuku tokyo narrow bars" },
  { id: "a1000000-0000-0000-0000-000000000026", name: "Ameyoko", query: "ameyoko ueno market street tokyo" },
  { id: "a1000000-0000-0000-0000-000000000027", name: "Ghibli Museum", query: "ghibli museum mitaka tokyo studio" },
  { id: "a1000000-0000-0000-0000-000000000028", name: "Edo-Tokyo Museum", query: "edo tokyo museum ryogoku" },
  { id: "a1000000-0000-0000-0000-000000000029", name: "National Museum of Nature and Science", query: "ueno science museum tokyo dinosaur" },
  { id: "a1000000-0000-0000-0000-000000000030", name: "Tokyo National Museum", query: "tokyo national museum ueno park" },
  { id: "a1000000-0000-0000-0000-000000000031", name: "Robot Restaurant", query: "robot restaurant shinjuku neon show" },
  { id: "a1000000-0000-0000-0000-000000000032", name: "Samurai Museum", query: "samurai armor sword japan museum" },
  { id: "a1000000-0000-0000-0000-000000000033", name: "Ueno Park", query: "ueno park tokyo cherry blossom pond" },
  { id: "a1000000-0000-0000-0000-000000000034", name: "Yoyogi Park", query: "yoyogi park tokyo green nature" },
  { id: "a1000000-0000-0000-0000-000000000035", name: "Rikugien Garden", query: "rikugien garden tokyo japanese traditional" },
  { id: "a1000000-0000-0000-0000-000000000036", name: "Inokashira Park", query: "inokashira park kichijoji tokyo pond boat" },
  { id: "a1000000-0000-0000-0000-000000000037", name: "Hamarikyu Gardens", query: "hamarikyu gardens tokyo teahouse skyline" },
  { id: "a1000000-0000-0000-0000-000000000038", name: "Ginza", query: "ginza tokyo shopping street luxury" },
  { id: "a1000000-0000-0000-0000-000000000039", name: "Nakamise Shopping Street", query: "nakamise shopping street asakusa senso-ji" },
  { id: "a1000000-0000-0000-0000-000000000040", name: "Shimokitazawa", query: "shimokitazawa tokyo vintage bohemian" },
  { id: "a1000000-0000-0000-0000-000000000041", name: "Kichijoji", query: "kichijoji tokyo harmonica yokocho" },
  { id: "a1000000-0000-0000-0000-000000000042", name: "Odaiba", query: "odaiba tokyo bay gundam statue" },
  { id: "a1000000-0000-0000-0000-000000000043", name: "Ikebukuro Sunshine City", query: "ikebukuro tokyo sunshine city" },
  { id: "a1000000-0000-0000-0000-000000000044", name: "Owl Cafe", query: "owl cafe japan cute bird" },
  { id: "a1000000-0000-0000-0000-000000000045", name: "Mario Kart Street Tour", query: "mario kart tokyo go kart street" },
  { id: "a1000000-0000-0000-0000-000000000046", name: "Oedo Onsen Monogatari", query: "japanese onsen hot spring bath traditional" },
  { id: "a1000000-0000-0000-0000-000000000047", name: "Kabukicho Tower", query: "kabukicho shinjuku tokyo neon night" },
  { id: "a1000000-0000-0000-0000-000000000048", name: "teamLab Planets", query: "teamlab planets tokyo immersive art" },
  { id: "a1000000-0000-0000-0000-000000000049", name: "Sumo Wrestling", query: "sumo wrestling japan ryogoku tournament" },
  { id: "a1000000-0000-0000-0000-000000000050", name: "Nihonbashi", query: "nihonbashi bridge tokyo historic" },
];

async function searchUnsplash(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  if (data.results && data.results.length > 0) {
    const photo = data.results[0];
    return {
      url: photo.urls.raw + "&w=600&h=400&fit=crop&q=80",
      photographer: photo.user.name,
      profileUrl: photo.user.links.html,
      photoUrl: photo.links.html,
    };
  }
  return null;
}

// Rate limit: 50 requests/hour for demo apps
// We'll add a 1.5 second delay between requests
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("-- ============================================");
  console.log("-- Journey Japan - Spot Images from Unsplash");
  console.log("-- Run this in Supabase SQL Editor");
  console.log("-- ============================================");
  console.log("");

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i];
    process.stderr.write(`[${i + 1}/${spots.length}] Searching: ${spot.name}...`);

    try {
      const result = await searchUnsplash(spot.query);

      if (result) {
        console.log(`-- ${i + 1}. ${spot.name}`);
        console.log(`-- Photo by ${result.photographer} on Unsplash`);
        console.log(`-- ${result.photoUrl}`);
        console.log(
          `UPDATE public.spots SET photo_urls = ARRAY['${result.url}'] WHERE id = '${spot.id}';`
        );
        console.log("");
        successCount++;
        process.stderr.write(` OK\n`);
      } else {
        console.log(`-- ${i + 1}. ${spot.name} - NO RESULTS FOUND`);
        console.log("");
        failCount++;
        process.stderr.write(` NO RESULTS\n`);
      }
    } catch (err) {
      console.log(`-- ${i + 1}. ${spot.name} - ERROR: ${err.message}`);
      console.log("");
      failCount++;
      process.stderr.write(` ERROR: ${err.message}\n`);

      // If rate limited, wait longer
      if (err.message.includes("403") || err.message.includes("429")) {
        process.stderr.write("  Rate limited. Waiting 60 seconds...\n");
        await sleep(60000);
      }
    }

    // Delay between requests to avoid rate limiting
    if (i < spots.length - 1) {
      await sleep(1500);
    }
  }

  process.stderr.write(`\nDone! ${successCount} images found, ${failCount} failed.\n`);
  process.stderr.write(
    `Output SQL has been printed to stdout.\n`
  );
  process.stderr.write(
    `Save it: node scripts/fetch-unsplash-images.js YOUR_KEY > supabase-spots-images.sql\n`
  );
}

main();
