/**
 * SQL ファイルからスポット情報を読み取り、Unsplash 画像を取得して UPDATE SQL を生成
 * Supabase にスポットが未登録の場合のワークアラウンド
 *
 * 使い方:
 *   node scripts/fetch-unsplash-from-sql.js --file supabase-spots-kyoto.sql
 */

const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

// .env.local 読み込み
const envPath = resolve(__dirname, "../.env.local");
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
} catch {}

const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1) return undefined;
  return args[idx + 1];
}

const UNSPLASH_KEY = getArg("key") || process.env.UNSPLASH_ACCESS_KEY;
const SQL_FILE = getArg("file");
const IMAGES_PER_SPOT = parseInt(getArg("count") || "3", 10);

if (!UNSPLASH_KEY) {
  console.error("Error: UNSPLASH_ACCESS_KEY が必要です。");
  process.exit(1);
}
if (!SQL_FILE) {
  console.error("Error: --file <sql-file> を指定してください。");
  process.exit(1);
}

// SQL ファイルからスポット情報をパース
function parseSqlFile(filePath) {
  const content = readFileSync(resolve(__dirname, "..", filePath), "utf-8");
  const spots = [];
  // Match INSERT VALUES tuples
  const re = /\('([^']+)',\s*'([^']*(?:''[^']*)*)',\s*'([^']*(?:''[^']*)*)',\s*'([^']*(?:''[^']*)*)',\s*'([^']+)',\s*'([^']+)',/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    spots.push({
      id: match[1],
      name_en: match[2].replace(/''/g, "'"),
      name_ja: match[3].replace(/''/g, "'"),
      description: match[4].replace(/''/g, "'"),
      category: match[5],
      area: match[6],
    });
  }
  return spots;
}

// Unsplash API
let requestCount = 0;
let rateLimitRemaining = 50;

async function unsplashSearch(query, perPage = 1) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape&content_filter=high`;
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  });
  requestCount++;
  const remaining = res.headers.get("x-ratelimit-remaining");
  if (remaining) rateLimitRemaining = parseInt(remaining, 10);
  if (res.status === 403 || res.status === 429) throw new Error("RATE_LIMITED");
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.results || []).map((photo) => ({
    url: photo.urls.raw + "&w=800&h=500&fit=crop&q=80",
    photographer: photo.user.name,
    photoUrl: photo.links.html,
    downloadLocation: photo.links.download_location,
  }));
}

// Download triggers skipped to conserve API rate limit (Demo: 50 req/hr)
// async function triggerDownload(loc) {
//   try { await fetch(`${loc}?client_id=${UNSPLASH_KEY}`); } catch {}
// }

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }
function log(msg) { process.stderr.write(msg); }

const CATEGORY_KEYWORDS = {
  shrine: "shrine torii", temple: "temple buddhist", museum: "museum exhibit",
  park: "park garden green", observation: "observation deck view skyline",
  shopping: "shopping street market", food: "food stall izakaya japan",
  restaurant: "restaurant food japan", landmark: "landmark famous",
  onsen: "onsen hot spring bath", nature: "nature scenic japan",
  entertainment: "entertainment show", market: "market food stall",
};

function buildQueries(spot) {
  const catKw = CATEGORY_KEYWORDS[spot.category] || "";
  return [
    `${spot.name_en} ${spot.area} japan`,
    `${spot.name_en} japan`,
    `${spot.name_en}`,
    `${spot.area} japan ${catKw}`,
  ];
}

async function fetchImagesForSpot(spot) {
  const queries = buildQueries(spot);
  for (const query of queries) {
    try {
      const results = await unsplashSearch(query, IMAGES_PER_SPOT);
      if (results.length > 0) {
        // Download triggers skipped to conserve rate limit
        return { query, results };
      }
    } catch (err) {
      if (err.message.includes("RATE_LIMITED")) throw err;
    }
    await sleep(1200);
  }
  return null;
}

async function main() {
  const spots = parseSqlFile(SQL_FILE);
  log(`\n🔍 SQL ファイルベースの Unsplash 画像取得\n`);
  log(`   ファイル: ${SQL_FILE}\n`);
  log(`   スポット数: ${spots.length}\n`);
  log(`   画像数/スポット: ${IMAGES_PER_SPOT}\n\n`);

  if (spots.length === 0) {
    log("スポットが見つかりません。\n");
    process.exit(1);
  }

  const sqlLines = [];
  sqlLines.push("-- ============================================");
  sqlLines.push("-- Journey Japan - Kyoto Spot Images from Unsplash");
  sqlLines.push(`-- Generated: ${new Date().toISOString()}`);
  sqlLines.push(`-- Source: ${SQL_FILE}`);
  sqlLines.push("-- Run this AFTER the INSERT SQL in Supabase SQL Editor");
  sqlLines.push("-- ============================================");
  sqlLines.push("");

  // 逐次保存用のパスを先に決定
  const area = spots[0]?.area || "unknown";
  const outputPath = resolve(__dirname, `../supabase-spots-${area}-images.sql`);

  let successCount = 0;
  let failCount = 0;
  let rateLimitRetries = 0;
  const MAX_RATE_LIMIT_RETRIES = 3;

  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i];
    const progress = `[${i + 1}/${spots.length}]`;
    log(`${progress} ${spot.name_en}...`);

    if (rateLimitRemaining <= 3) {
      log(` ⏳ レートリミット残り${rateLimitRemaining}。60秒待機...\n`);
      await sleep(60000);
    }

    try {
      const result = await fetchImagesForSpot(spot);
      if (result) {
        const { query, results } = result;
        const urls = results.map((r) => r.url);
        sqlLines.push(`-- ${spot.name_en} (${spot.name_ja})`);
        for (const r of results) {
          sqlLines.push(`-- Photo by ${r.photographer} on Unsplash`);
          sqlLines.push(`-- ${r.photoUrl}`);
        }
        const arrayLiteral = urls.map((u) => `'${u.replace(/'/g, "''")}'`).join(", ");
        sqlLines.push(`UPDATE public.spots SET photo_urls = ARRAY[${arrayLiteral}] WHERE id = '${spot.id}';`);
        sqlLines.push("");
        successCount++;
        rateLimitRetries = 0;
        log(` ✅ ${results.length}枚 (query: "${query}")\n`);
      } else {
        sqlLines.push(`-- ${spot.name_en} (${spot.name_ja}) - NO RESULTS FOUND`);
        sqlLines.push("");
        failCount++;
        log(` ❌ 画像なし\n`);
      }
      // 逐次保存
      writeFileSync(outputPath, sqlLines.join("\n") + "\n");
    } catch (err) {
      if (err.message.includes("RATE_LIMITED")) {
        rateLimitRetries++;
        if (rateLimitRetries > MAX_RATE_LIMIT_RETRIES) {
          log(` ⛔ レートリミット超過回数上限。残りスポットをスキップ。\n`);
          sqlLines.push(`-- SKIPPED: ${spot.name_en} (rate limit exceeded)`);
          failCount++;
          // 逐次保存して続行（残りもスキップ）
          for (let j = i + 1; j < spots.length; j++) {
            sqlLines.push(`-- SKIPPED: ${spots[j].name_en} (rate limit exceeded)`);
            failCount++;
          }
          writeFileSync(outputPath, sqlLines.join("\n") + "\n");
          break;
        }
        log(` ⏳ レートリミット到達（${rateLimitRetries}/${MAX_RATE_LIMIT_RETRIES}）。60秒待機...\n`);
        await sleep(60000);
        i--;
        continue;
      }
      failCount++;
      log(` ❌ エラー: ${err.message}\n`);
      sqlLines.push(`-- ${spot.name_en} - ERROR: ${err.message}`);
      sqlLines.push("");
      writeFileSync(outputPath, sqlLines.join("\n") + "\n");
    }

    if (i < spots.length - 1) await sleep(1200);
  }

  sqlLines.push(`-- ============================================`);
  sqlLines.push(`-- Summary: ${successCount} succeeded, ${failCount} failed`);
  sqlLines.push(`-- ============================================`);

  // ファイル最終出力
  writeFileSync(outputPath, sqlLines.join("\n") + "\n");

  log(`\n${"═".repeat(50)}\n`);
  log(`✅ 完了: ${successCount} 成功 / ${failCount} 失敗 / ${spots.length} 合計\n`);
  log(`📊 APIリクエスト数: ${requestCount}\n`);
  log(`📄 SQL出力: supabase-spots-${area}-images.sql\n`);
  log(`\n💡 このSQLを INSERT SQL の後に Supabase SQL Editor で実行してください。\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
