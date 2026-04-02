/**
 * Unsplash画像一括取得スクリプト v2
 *
 * Supabaseからスポット情報を取得し、Unsplash APIで画像を検索。
 * SQL出力またはSupabase直接更新の2モードに対応。
 *
 * 使い方:
 *   1. https://unsplash.com/developers でアプリを作成し Access Key を取得
 *   2. .env.local に UNSPLASH_ACCESS_KEY=xxx を追加（または引数で渡す）
 *
 *   # SQL出力モード（デフォルト）- SQLファイルを生成
 *   node scripts/fetch-unsplash-images.js > output.sql
 *
 *   # 直接更新モード - Supabaseに直接書き込み
 *   node scripts/fetch-unsplash-images.js --update
 *
 *   # エリア指定（デフォルトは全エリア）
 *   node scripts/fetch-unsplash-images.js --area tokyo
 *   node scripts/fetch-unsplash-images.js --area tokyo,kyoto,osaka
 *
 *   # 画像が未設定のスポットのみ対象
 *   node scripts/fetch-unsplash-images.js --missing-only
 *
 *   # 1スポットあたりの取得画像数（デフォルト: 3）
 *   node scripts/fetch-unsplash-images.js --count 5
 *
 *   # Unsplash Access Keyを引数で渡す
 *   node scripts/fetch-unsplash-images.js --key YOUR_ACCESS_KEY
 *
 *   # 組み合わせ例: 京都の画像なしスポットだけ直接更新
 *   node scripts/fetch-unsplash-images.js --area kyoto --missing-only --update
 */

const { readFileSync } = require("fs");
const { resolve } = require("path");

// ── .env.local か���環境変数を読み込み ──

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
  } catch {
    // .env.local がなくても続行
  }
}

loadEnv();

// ── 引数パース ──

const args = process.argv.slice(2);

function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1) return undefined;
  return args[idx + 1];
}

function hasFlag(name) {
  return args.includes(`--${name}`);
}

const UNSPLASH_KEY = getArg("key") || process.env.UNSPLASH_ACCESS_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const MODE = hasFlag("update") ? "update" : "sql";
const AREAS = getArg("area")?.split(",") || null; // null = all areas
const MISSING_ONLY = hasFlag("missing-only");
const IMAGES_PER_SPOT = parseInt(getArg("count") || "3", 10);

if (!UNSPLASH_KEY) {
  console.error("Error: Unsplash Access Key が必要です。");
  console.error("");
  console.error("方法1: .env.local に追加");
  console.error("  UNSPLASH_ACCESS_KEY=your_key_here");
  console.error("");
  console.error("方法2: 引数で渡す");
  console.error("  node scripts/fetch-unsplash-images.js --key YOUR_KEY");
  console.error("");
  console.error("キーの取得: https://unsplash.com/developers");
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY が .env.local に必要です。");
  process.exit(1);
}

// ── Supabase REST API ──

async function supabaseFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: options.method === "PATCH" ? "return=minimal" : "return=representation",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase ${res.status}: ${text}`);
  }
  if (options.method === "PATCH") return null;
  return res.json();
}

async function fetchSpots() {
  let path = "/spots?select=id,name_en,name_ja,category,area,photo_urls&order=area,name_en";

  if (AREAS) {
    path += `&area=in.(${AREAS.join(",")})`;
  }

  const spots = await supabaseFetch(path);

  if (MISSING_ONLY) {
    return spots.filter(
      (s) => !s.photo_urls || s.photo_urls.length === 0 || s.photo_urls.every((u) => !u)
    );
  }

  return spots;
}

async function updateSpotPhotos(spotId, photoUrls) {
  await supabaseFetch(`/spots?id=eq.${spotId}`, {
    method: "PATCH",
    body: JSON.stringify({ photo_urls: photoUrls }),
  });
}

// ── Unsplash API ──

let requestCount = 0;
let rateLimitRemaining = 50;

async function unsplashSearch(query, perPage = 1) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape&content_filter=high`;

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  });

  requestCount++;

  // レートリミット情報を取得
  const remaining = res.headers.get("x-ratelimit-remaining");
  if (remaining) rateLimitRemaining = parseInt(remaining, 10);

  if (res.status === 403 || res.status === 429) {
    throw new Error(`RATE_LIMITED (${res.status})`);
  }

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  return (data.results || []).map((photo) => ({
    url: photo.urls.raw + "&w=800&h=500&fit=crop&q=80",
    photographer: photo.user.name,
    profileUrl: photo.user.links.html,
    photoUrl: photo.links.html,
    downloadLocation: photo.links.download_location,
  }));
}

// ── スマートクエリ生成 ──

const CATEGORY_KEYWORDS = {
  shrine: "shrine torii",
  temple: "temple buddhist",
  museum: "museum exhibit",
  park: "park garden green",
  observation: "observation deck view skyline",
  shopping: "shopping street market",
  food: "food stall izakaya japan",
  restaurant: "restaurant food japan",
  landmark: "landmark famous",
  onsen: "onsen hot spring bath",
  nature: "nature scenic japan",
  entertainment: "entertainment show",
  market: "market food stall",
};

function buildQueries(spot) {
  const { name_en, name_ja, category, area } = spot;
  const catKw = CATEGORY_KEYWORDS[category] || "";

  // 段階的にフォールバックするクエリリスト
  return [
    `${name_en} ${area} japan`,             // 1. スポット名 + エリア + japan
    `${name_en} japan`,                     // 2. スポット名 + japan
    `${name_en}`,                           // 3. スポット名のみ
    `${area} japan ${catKw}`,               // 4. エリア + カテゴリ（汎用フォールバック）
  ];
}

// ── メイン処理 ──

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function log(msg) {
  process.stderr.write(msg);
}

async function triggerDownload(downloadLocation) {
  try {
    await fetch(`${downloadLocation}?client_id=${UNSPLASH_KEY}`);
  } catch {
    // ダウンロードトラッキングの失敗は無視
  }
}

async function fetchImagesForSpot(spot) {
  const queries = buildQueries(spot);

  for (const query of queries) {
    try {
      const results = await unsplashSearch(query, IMAGES_PER_SPOT);
      if (results.length > 0) {
        // Unsplash API ガイドライン: ダウンロードイベントをトリガー
        for (const r of results) {
          await triggerDownload(r.downloadLocation);
        }
        return { query, results };
      }
    } catch (err) {
      if (err.message.includes("RATE_LIMITED")) {
        throw err; // レートリミットは上位で処理
      }
      // その他のエラーは次のクエリにフォールバック
    }

    await sleep(1200);
  }

  return null; // 全クエリで結果なし
}

async function main() {
  log(`\n🔍 Unsplash画像取得スクリプト v2\n`);
  log(`   モード: ${MODE === "update" ? "Supabase直接更新" : "SQL出力"}\n`);
  log(`   画像数/スポット: ${IMAGES_PER_SPOT}\n`);
  log(`   エリア: ${AREAS ? AREAS.join(", ") : "全エリア"}\n`);
  log(`   未設定のみ: ${MISSING_ONLY ? "はい" : "いいえ"}\n\n`);

  // Supabaseからスポット取得
  log("📡 Supabaseからスポット情報を取得中...\n");
  const spots = await fetchSpots();
  log(`   ${spots.length} スポットが対象\n\n`);

  if (spots.length === 0) {
    log("対象スポットがありません。\n");
    process.exit(0);
  }

  // SQLモードの場合はヘッダー出力
  if (MODE === "sql") {
    console.log("-- ============================================");
    console.log("-- Journey Japan - Spot Images from Unsplash");
    console.log(`-- Generated: ${new Date().toISOString()}`);
    console.log(`-- Areas: ${AREAS ? AREAS.join(", ") : "all"}`);
    console.log(`-- Images per spot: ${IMAGES_PER_SPOT}`);
    console.log("-- Run this in Supabase SQL Editor");
    console.log("-- ============================================");
    console.log("");
  }

  let successCount = 0;
  let failCount = 0;
  let currentArea = "";

  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i];

    // エリアが変わったら見出し表示
    if (spot.area !== currentArea) {
      currentArea = spot.area;
      log(`\n── ${currentArea.toUpperCase()} ──\n`);
      if (MODE === "sql") {
        console.log(`\n-- ═══════════════════════════════════════`);
        console.log(`-- ${currentArea.toUpperCase()}`);
        console.log(`-- ═══════════════════════════════════════\n`);
      }
    }

    const progress = `[${i + 1}/${spots.length}]`;
    log(`${progress} ${spot.name_en}...`);

    // レートリミットが近い場合は待機
    if (rateLimitRemaining <= 5) {
      log(` ⏳ レートリミット残り${rateLimitRemaining}。60秒待機...\n`);
      await sleep(60000);
    }

    try {
      const result = await fetchImagesForSpot(spot);

      if (result) {
        const { query, results } = result;
        const urls = results.map((r) => r.url);

        if (MODE === "update") {
          await updateSpotPhotos(spot.id, urls);
          log(` ✅ ${results.length}枚 (query: "${query}")\n`);
        } else {
          // SQL出力
          console.log(`-- ${spot.name_en} (${spot.name_ja})`);
          for (const r of results) {
            console.log(`-- Photo by ${r.photographer} on Unsplash`);
            console.log(`-- ${r.photoUrl}`);
          }
          const arrayLiteral = urls.map((u) => `'${u}'`).join(", ");
          console.log(
            `UPDATE public.spots SET photo_urls = ARRAY[${arrayLiteral}] WHERE id = '${spot.id}';`
          );
          console.log("");
        }

        successCount++;
      } else {
        if (MODE === "sql") {
          console.log(`-- ${spot.name_en} (${spot.name_ja}) - NO RESULTS FOUND`);
          console.log("");
        }
        failCount++;
        log(` ❌ 画像なし\n`);
      }
    } catch (err) {
      if (err.message.includes("RATE_LIMITED")) {
        log(` ⏳ レートリミット到達。60秒待機...\n`);
        await sleep(60000);
        i--; // リトライ
        continue;
      }

      failCount++;
      log(` ❌ エラー: ${err.message}\n`);
      if (MODE === "sql") {
        console.log(`-- ${spot.name_en} - ERROR: ${err.message}`);
        console.log("");
      }
    }

    // リクエスト間隔
    if (i < spots.length - 1) {
      await sleep(1200);
    }
  }

  // サマリー
  log(`\n${"═".repeat(50)}\n`);
  log(`✅ 完了: ${successCount} 成功 / ${failCount} 失敗 / ${spots.length} 合計\n`);
  log(`📊 APIリクエスト数: ${requestCount}\n`);

  if (MODE === "sql") {
    console.log(`-- ============================================`);
    console.log(`-- Summary: ${successCount} succeeded, ${failCount} failed`);
    console.log(`-- ============================================`);
    log(`\n💡 SQLの適用:`);
    log(`   出力をファイルに保存して Supabase SQL Editor で実行してください。\n`);
    log(`   例: node scripts/fetch-unsplash-images.js > supabase-spots-images-new.sql\n`);
  } else {
    log(`\n💾 Supabaseへの更新が完了しました。\n`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
