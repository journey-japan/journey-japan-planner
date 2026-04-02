/**
 * Osaka Image Quality Fix Script
 *
 * Searches Unsplash for replacement images for spots with quality issues.
 * Generates a fix SQL file.
 *
 * Usage: node scripts/fix-osaka-images.js
 */

const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

// Load env
const envPath = resolve(__dirname, "../.env.local");
function loadEnv() {
  try {
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch (e) {}
}
loadEnv();

const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!UNSPLASH_KEY) {
  console.error("Missing UNSPLASH_ACCESS_KEY in .env.local");
  process.exit(1);
}

// Spots that need fixes with their search queries
const FIXES = [
  {
    id: "b3000000-0000-0000-0000-000000000004",
    name: "Abeno Harukas",
    issue: "INSUFFICIENT_COUNT",
    detail: "Only 1 image (need 3)",
    query: "Abeno Harukas tallest skyscraper osaka japan",
    needCount: 2, // need 2 MORE images
    keepExisting: true,
    existingUrls: [
      "https://images.unsplash.com/photo-1672492636238-422d4703930f?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwxfHxBYmVubyUyMEhhcnVrYXMlMjBvc2FrYSUyMGphcGFufGVufDF8MHx8fDE3NzQ4MzUxMTl8MA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80"
    ]
  },
  {
    id: "b3000000-0000-0000-0000-000000000006",
    name: "Shitenno-ji",
    issue: "WRONG_SUBJECT",
    detail: "All 3 photos are generic Osaka city/station photos, not the temple",
    query: "Shitennoji temple pagoda osaka japan",
    needCount: 3,
    keepExisting: false
  },
  {
    id: "b3000000-0000-0000-0000-000000000012",
    name: "Shinsaibashi-suji Shopping Street",
    issue: "DUPLICATE",
    detail: "Photos 2-3 duplicated from Kuromon Market (same photographer/URL)",
    query: "Shinsaibashi shopping arcade neon osaka",
    needCount: 2, // replace photos 2-3
    keepExisting: true,
    existingUrls: [
      "https://images.unsplash.com/photo-1759466752889-5774bc433fea?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwxfHxTaGluc2FpYmFzaGktc3VqaSUyMFNob3BwaW5nJTIwU3RyZWV0JTIwb3Nha2ElMjBqYXBhbnxlbnwxfDB8fHwxNzc0ODM5NTIyfDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80"
    ]
  },
  {
    id: "b3000000-0000-0000-0000-000000000013",
    name: "Namba Grand Kagetsu",
    issue: "WRONG_SUBJECT",
    detail: "Photo 1 is 'Osaka Station sign', not comedy theater",
    query: "Namba Grand Kagetsu yoshimoto comedy theater osaka",
    needCount: 1, // replace photo 1 only
    keepExisting: true,
    existingUrls: [], // will prepend new photo, keep photos 2-3
    existingUrlsEnd: [
      "https://images.unsplash.com/photo-1731758832047-8363e8eed735?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwyfHxOYW1iYSUyMEdyYW5kJTIwS2FnZXRzdSUyMG9zYWthJTIwamFwYW58ZW58MXwwfHx8MTc3NDgzOTUyNXww&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80",
      "https://images.unsplash.com/photo-1773798438246-599a1f10fb56?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwzfHxOYW1iYSUyMEdyYW5kJTIwS2FnZXRzdSUyMG9zYWthJTIwamFwYW58ZW58MXwwfHx8MTc3NDgzOTUyNXww&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80"
    ]
  },
  {
    id: "b3000000-0000-0000-0000-000000000014",
    name: "Den Den Town",
    issue: "WRONG_SUBJECT",
    detail: "Photo 1 is Osaka Station sign, Photos 2-3 are river views — not electronics district",
    query: "Nipponbashi otaku anime electronics shop osaka japan",
    needCount: 3,
    keepExisting: false
  },
  {
    id: "b3000000-0000-0000-0000-000000000015",
    name: "Tenjinbashi-suji Shopping Street",
    issue: "ALL_DUPLICATES",
    detail: "All 3 photos duplicated from Kuromon/Shinsaibashi/Dotonbori",
    query: "Tenjinbashi longest shopping street osaka japan",
    needCount: 3,
    keepExisting: false
  },
  {
    id: "b3000000-0000-0000-0000-000000000016",
    name: "Osaka Museum of Housing and Living",
    issue: "WRONG_SUBJECT",
    detail: "Photo 1 is Osaka Station sign, Photos 2-3 generic street views — not museum",
    query: "Osaka Museum Housing Living edo period traditional townscape",
    needCount: 3,
    keepExisting: false
  },
  {
    id: "b3000000-0000-0000-0000-000000000017",
    name: "National Museum of Art Osaka",
    issue: "WRONG_SUBJECT",
    detail: "Photo 1 is ferris wheel, Photo 2 is Osaka Station sign — not the museum",
    query: "National Museum Art Osaka Nakanoshima contemporary",
    needCount: 2, // replace photos 1-2, keep photo 3
    keepExisting: true,
    existingUrls: [], // will prepend new photos
    existingUrlsEnd: [
      "https://images.unsplash.com/photo-1762245751404-1ed86d34f495?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwzfHxOYXRpb25hbCUyME11c2V1bSUyMG9mJTIwQXJ0JTIwT3Nha2ElMjBvc2FrYSUyMGphcGFufGVufDF8MHx8fDE3NzQ4Mzk1MzJ8MA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80"
    ]
  },
  {
    id: "b3000000-0000-0000-0000-000000000018",
    name: "Osaka Tenmangu",
    issue: "WRONG_SUBJECT",
    detail: "Photo 2 is Osaka Station sign — not the shrine",
    query: "Osaka Tenmangu shrine tenjin festival japan",
    needCount: 1, // replace photo 2 only
    keepExisting: true,
    existingUrls: [
      "https://images.unsplash.com/photo-1764643682871-582237139e96?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwxfHxPc2FrYSUyMFRlbm1hbmd1JTIwb3Nha2ElMjBqYXBhbnxlbnwxfDB8fHwxNzc0ODM5NTM0fDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80"
    ],
    existingUrlsEnd: [
      "https://images.unsplash.com/photo-1734537055934-dafc55785973?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwzfHxPc2FrYSUyMFRlbm1hbmd1JTIwb3Nha2ElMjBqYXBhbnxlbnwxfDB8fHwxNzc0ODM5NTM0fDA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80"
    ]
  },
  {
    id: "b3000000-0000-0000-0000-000000000019",
    name: "Osaka Castle Park",
    issue: "DUPLICATE",
    detail: "Photo 1 same as Osaka Castle (ID 001) — both use Jeremy Santana photo",
    query: "Osaka Castle Park cherry blossom garden Nishinomaru",
    needCount: 1, // replace photo 1 only
    keepExisting: true,
    existingUrls: [], // prepend new photo
    existingUrlsEnd: [
      "https://images.unsplash.com/photo-1629569320448-a5504a24d384?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwyfHxPc2FrYSUyMENhc3RsZSUyMFBhcmslMjBvc2FrYSUyMGphcGFufGVufDF8MHx8fDE3NzQ4Mzk1MzZ8MA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80",
      "https://images.unsplash.com/photo-1589451814294-26d36298ac22?ixid=M3w5MDE3OTJ8MHwxfHNlYXJjaHwzfHxPc2FrYSUyMENhc3RsZSUyMFBhcmslMjBvc2FrYSUyMGphcGFufGVufDF8MHx8fDE3NzQ4Mzk1MzZ8MA&ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80"
    ]
  }
];

// Known photo IDs already used across ALL osaka spots (to avoid duplicates)
const USED_PHOTO_IDS = new Set([
  "photo-1596240748549", "photo-1705695469571", "photo-1704003671784",
  "photo-1762245751994", "photo-1758961340413", "photo-1763312181253",
  "photo-1712992508013", "photo-1712542864632", "photo-1631273866870",
  "photo-1672492636238",
  "photo-1670432875216", "photo-1562250393", "photo-1573576232755",
  "photo-1697871965881", "photo-1718165948278", "photo-1721737158516",
  "photo-1750661158204", "photo-1758464989277", "photo-1723446130829",
  "photo-1713067783167", "photo-1718166082716", "photo-1727698285403",
  "photo-1704004363915", "photo-1713925105002", "photo-1614988371365",
  "photo-1573674451487", "photo-1718034824165", "photo-1767519818605",
  "photo-1716348230181", "photo-1560291544", "photo-1601957424598",
  "photo-1759466752889",
  "photo-1731758832047", "photo-1773798438246",
  "photo-1686670794208", "photo-1712372510791",
  "photo-1616145652428", "photo-1762245751404",
  "photo-1764643682871", "photo-1734537055934",
  "photo-1629569320448", "photo-1589451814294",
  "photo-1660111451643", "photo-1727712439522", "photo-1589451907323",
  "photo-1712544310522", "photo-1712372277975",
  "photo-1734018959721", "photo-1740669312198", "photo-1621139204393",
  "photo-1732906364920", "photo-1721993706872"
]);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function buildImageUrl(rawUrl) {
  const base = rawUrl.split("?")[0];
  // Construct standard URL with resize params
  return `${base}?ixlib=rb-4.1.0&w=800&h=500&fit=crop&q=80`;
}

async function searchUnsplash(query, count) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${Math.max(count + 3, 5)}&orientation=landscape`;
  const resp = await fetch(url, {
    headers: { "Authorization": `Client-ID ${UNSPLASH_KEY}` }
  });

  if (resp.status === 403) {
    const remaining = resp.headers.get("x-ratelimit-remaining");
    console.error(`  ⚠️ Rate limited (remaining: ${remaining}). Waiting for reset...`);
    // Wait 5 minutes then retry in a loop
    for (let attempt = 0; attempt < 12; attempt++) {
      const waitMin = 5;
      console.error(`  ⏳ Waiting ${waitMin} min (attempt ${attempt + 1}/12)...`);
      await sleep(waitMin * 60 * 1000);
      const retry = await fetch(url, {
        headers: { "Authorization": `Client-ID ${UNSPLASH_KEY}` }
      });
      if (retry.ok) {
        const data = await retry.json();
        const rem = retry.headers.get("x-ratelimit-remaining");
        console.error(`  📊 Rate limit remaining: ${rem}`);
        return data.results || [];
      }
      if (retry.status !== 403) {
        console.error(`  ❌ API error: ${retry.status}`);
        return [];
      }
    }
    console.error(`  ❌ Rate limit did not reset after 60 min`);
    return [];
  }

  if (!resp.ok) {
    console.error(`  ❌ API error: ${resp.status}`);
    return [];
  }

  const data = await resp.json();
  const remaining = resp.headers.get("x-ratelimit-remaining");
  console.error(`  📊 Rate limit remaining: ${remaining}`);
  return data.results || [];
}

async function main() {
  const sqlLines = [];
  const timestamp = new Date().toISOString();

  sqlLines.push("-- ============================================");
  sqlLines.push(`-- Journey Japan - Osaka Image Quality Fixes`);
  sqlLines.push(`-- Generated: ${timestamp}`);
  sqlLines.push("-- Run this AFTER the original images SQL in Supabase SQL Editor");
  sqlLines.push("-- ============================================");
  sqlLines.push("");

  let successCount = 0;
  let failCount = 0;

  for (const fix of FIXES) {
    console.error(`\n🔍 Searching: ${fix.name} (${fix.issue})`);
    console.error(`   Query: "${fix.query}"`);

    const results = await searchUnsplash(fix.query, fix.needCount);

    if (results.length === 0) {
      // Try alternative query
      const altQuery = fix.name + " japan";
      console.error(`   No results, trying: "${altQuery}"`);
      const altResults = await searchUnsplash(altQuery, fix.needCount);
      if (altResults.length === 0) {
        console.error(`   ❌ No images found for ${fix.name}`);
        sqlLines.push(`-- ❌ ${fix.name}: No replacement images found (manual search needed)`);
        sqlLines.push("");
        failCount++;
        await sleep(1200);
        continue;
      }
      results.push(...altResults);
    }

    // Filter out already-used photos
    const fresh = results.filter(r => {
      const photoBase = r.urls.raw.match(/photo-\d+(-[a-f0-9]+)?/)?.[0] || "";
      return !USED_PHOTO_IDS.has(photoBase);
    });

    const selected = fresh.slice(0, fix.needCount);

    if (selected.length < fix.needCount) {
      console.error(`   ⚠️ Only found ${selected.length}/${fix.needCount} unique images`);
    }

    // Build final URL array
    let finalUrls = [];

    if (fix.keepExisting && fix.existingUrls) {
      finalUrls.push(...fix.existingUrls);
    }

    for (const photo of selected) {
      const imgUrl = buildImageUrl(photo.urls.raw);
      finalUrls.push(imgUrl);
      USED_PHOTO_IDS.add(photo.urls.raw.match(/photo-\d+(-[a-f0-9]+)?/)?.[0] || photo.id);
    }

    if (fix.keepExisting && fix.existingUrlsEnd) {
      finalUrls.push(...fix.existingUrlsEnd);
    }

    // Trim to 3 max
    finalUrls = finalUrls.slice(0, 3);

    // Generate SQL comment and UPDATE
    sqlLines.push(`-- ${fix.name} (${fix.issue}: ${fix.detail})`);
    for (const photo of selected) {
      sqlLines.push(`-- Photo by ${photo.user.name} on Unsplash`);
      const photoSlug = photo.slug || photo.id;
      sqlLines.push(`-- https://unsplash.com/photos/${photoSlug}`);
    }

    const urlArray = finalUrls.map(u => `'${u}'`).join(", ");
    sqlLines.push(`UPDATE public.spots SET photo_urls = ARRAY[${urlArray}] WHERE id = '${fix.id}';`);
    sqlLines.push("");

    successCount++;
    console.error(`   ✅ ${selected.length} replacement images selected`);

    // Rate limit courtesy delay
    await sleep(1200);
  }

  sqlLines.push("-- ============================================");
  sqlLines.push(`-- Summary: ${successCount} fixed, ${failCount} failed`);
  sqlLines.push("-- ============================================");

  const outputPath = resolve(__dirname, "../supabase-spots-osaka-images-fix.sql");
  writeFileSync(outputPath, sqlLines.join("\n") + "\n", "utf-8");
  console.error(`\n📄 Fix SQL written to: supabase-spots-osaka-images-fix.sql`);
  console.error(`   ${successCount} spots fixed, ${failCount} failed`);
}

main().catch(console.error);
