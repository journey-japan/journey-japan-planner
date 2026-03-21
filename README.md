# Journey Japan Trip Planner

日本旅行に特化した旅程作成・共有プラットフォーム。

## セットアップ手順

### 前提条件

- **Node.js** v18以上がインストール済み（[ダウンロード](https://nodejs.org/)）
- **Git** がインストール済み
- **GitHub アカウント**

### 1. プロジェクトをGitHubにアップロード

```bash
# このフォルダに移動
cd journey-japan-planner

# Gitリポジトリを初期化
git init
git add .
git commit -m "Initial project setup: Next.js + Tailwind + dnd-kit"

# GitHubで新しいリポジトリを作成（journey-japan-planner）してから：
git remote add origin https://github.com/YOUR_USERNAME/journey-japan-planner.git
git branch -M main
git push -u origin main
```

### 2. 依存パッケージをインストール

```bash
npm install
```

### 3. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開く。

### 4. Vercelにデプロイ

1. [vercel.com](https://vercel.com) にGitHubアカウントでログイン
2. 「Import Project」→ GitHubリポジトリ「journey-japan-planner」を選択
3. 設定はそのままで「Deploy」をクリック
4. デプロイ完了後、Settings → Domains で `plan.journeyjpn.com` を設定

### 5. カスタムドメイン設定

Vercelで `plan.journeyjpn.com` を追加した後、ConoHa WINGのDNS設定で：
- CNAME レコード: `plan` → `cname.vercel-dns.com`

## プロジェクト構造

```
src/
├── app/
│   ├── page.tsx                    # トップページ
│   ├── layout.tsx                  # 共通レイアウト
│   ├── globals.css                 # Tailwind CSS
│   ├── editor/[id]/page.tsx        # 旅程エディタ（D&D）
│   └── itineraries/[id]/page.tsx   # 旅程詳細（閲覧）
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # 共通ヘッダー
│   │   └── Footer.tsx              # 共通フッター
│   ├── itinerary/
│   │   ├── ItineraryCard.tsx       # 旅程カード（一覧用）
│   │   ├── SortableSpotCard.tsx    # D&D対応スポットカード
│   │   └── SpotSearchPanel.tsx     # スポット検索パネル
│   └── ui/                         # 共通UIコンポーネント（今後追加）
├── lib/
│   └── sample-data.ts              # サンプルデータ（東京12スポット）
└── types/
    └── index.ts                    # TypeScript型定義
```

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **dnd-kit** (ドラッグ&ドロップ)
- 今後追加: Supabase（DB・認証）、Google Maps API

## 次のステップ

1. [ ] `npm install` → `npm run dev` で動作確認
2. [ ] GitHubにpush → Vercelでデプロイ
3. [ ] Supabase接続（DB・ユーザー認証）
4. [ ] Google Maps API連携
5. [ ] スポット検索の実装（現在はサンプルデータ）
