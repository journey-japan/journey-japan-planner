# セキュリティ強化チェックリスト
## Next.js + Supabase + Vercel 構成

作成日: 2026-03-24
参考元: OMS (Operation Management System) に対して実施されたセキュリティ強化

---

## 1. API ルートの認証チェック

すべてのAPIルート（`/api/...`）で、リクエスト処理前にセッション認証を行う。
認証されていないリクエストは即座に 401 を返す。

```typescript
// src/app/api/example/route.ts
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ここから本処理
}
```

**ポイント:**
- `supabaseAdmin`（Service Role Key）を使っていた箇所は、可能な限りユーザーセッション経由の `createClient()` に切り替える
- Service Role Keyはcronジョブなど、ユーザーセッションが存在しない場面のみに限定する
- データ作成時は `created_by: session.user.id` を記録し、誰が作ったか追跡可能にする


---

## 2. ロールベースアクセス制御（RBAC）

管理者のみが実行できる操作（削除、割当変更など）にはロールチェックを追加する。

```typescript
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', session.user.id)
  .single();

if (!profile || !['admin', 'developer'].includes(profile.role)) {
  return NextResponse.json({ error: '権限がありません' }, { status: 403 });
}
```

**ポイント:**
- `profiles` テーブルに `role` カラム（admin, developer, staff, device 等）を設ける
- 破壊的操作（DELETE, 割当変更等）は admin/developer に限定
- 共通ヘルパーとして `checkRole()` 関数を用意すると便利

```typescript
// src/lib/security.ts
export async function checkRole(
  supabase: SupabaseClient,
  userId: string,
  allowedRoles: string[]
): Promise<{ allowed: boolean; role: string | null }> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();
  if (!profile) return { allowed: false, role: null };
  return {
    allowed: allowedRoles.includes(profile.role),
    role: profile.role,
  };
}
```


---

## 3. 入力サニタイズ

### 3-1. フィールドホワイトリスト

APIのPATCH/PUTで、クライアントから送られたフィールドをそのまま `.update(body)` に渡さない。
許可されたフィールドのみをフィルタリングする。

```typescript
const ALLOWED_FIELDS = [
  'name', 'email', 'phone', 'status', 'notes',
];

const sanitizedBody: Record<string, unknown> = {};
for (const key of ALLOWED_FIELDS) {
  if (key in body) {
    sanitizedBody[key] = body[key];
  }
}

if (Object.keys(sanitizedBody).length === 0) {
  return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
}

await supabase.from('table').update(sanitizedBody).eq('id', id);
```

**なぜ必要か:** `.update(body)` だとクライアントが `role` や `is_admin` などの意図しないフィールドを送りつけて権限昇格できる可能性がある。

### 3-2. HTMLエスケープ（XSS対策）

ユーザー入力をHTML（メール本文など）に埋め込む場合、必ずエスケープする。

```typescript
export function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 使用例
const safeName = escapeHtml(staffName);
const htmlBody = `<p>申請者: ${safeName}</p>`;
```

### 3-3. 入力バリデーション

APIの入力値に対して、期待する型・値かどうかをチェックする。

```typescript
if (!type || !['request', 'withdrawal', 'monthly_report'].includes(type)) {
  return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
}
```


---

## 4. 機密情報のマスキング

口座番号、APIキー、アカウントIDなどは画面上で全桁表示しない。

```typescript
// 下4桁のみ表示
const masked = accountNumber ? `••••${accountNumber.slice(-4)}` : '-';
```

**対象になりやすいフィールド:**
- 銀行口座番号
- クレジットカード番号
- 外部サービスのアカウントID（Wise等）
- パスポート番号


---

## 5. Supabase RLS（Row Level Security）ポリシー

Supabaseのテーブルには必ずRLSを有効化し、適切なポリシーを設定する。

```sql
-- RLS有効化
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;

-- SELECT: 認証ユーザーのみ
CREATE POLICY "select_authenticated"
  ON your_table FOR SELECT
  TO authenticated
  USING (true);

-- INSERT: 自分のデータのみ
CREATE POLICY "insert_own"
  ON your_table FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
  );

-- UPDATE/DELETE: 管理者のみ
CREATE POLICY "update_admin"
  ON your_table FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'developer')
    )
  );
```

**設計パターン:**
- SELECT → 基本は認証ユーザー全員（ただし個人情報テーブルは本人+管理者のみ）
- INSERT → 自分の `staff_id` / `user_id` に紐づくレコードのみ
- UPDATE → 自分のレコード or 管理者
- DELETE → 管理者のみ（一般ユーザーには削除させない）

**特に注意が必要なテーブル:**
- 勤怠（attendance）→ 自分のレコードのみ操作可能
- 申請（requests）→ 自分の申請のみ作成、取り下げは「申請中」のみ
- 有給残高（leave_balance）→ 本人は閲覧のみ、変更は管理者のみ
- Storageバケット → アップロード時に所有者チェック


---

## 6. PII（個人情報）アクセスログ

個人情報（パスポート、住所、生年月日等）へのアクセスを記録するテーブルを用意する。
GDPR対応やインシデント調査時に必須。

```sql
CREATE TABLE pii_access_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id),
  action TEXT NOT NULL,         -- 'view', 'update', 'delete', 'export'
  resource_type TEXT NOT NULL,  -- 'tour_application', 'passport', 'profile'
  resource_id TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

```typescript
// APIルート内での使用例
await logPIIAccess(supabase, session.user.id, {
  action: 'view',
  resourceType: 'tour_application',
  resourceId: id,
  ipAddress: request.headers.get('x-real-ip') || undefined,
});
```


---

## 7. レート制限

APIへの過剰なリクエストを防ぐ。本番では Upstash Redis を推奨、なければインメモリでフォールバック。

```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const rateLimiter = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(30, '1 m'),  // 1分間に30リクエスト
  prefix: 'ratelimit:api',
});

// middleware内で
const ip = request.headers.get('x-real-ip') || 'unknown';
const { success } = await rateLimiter.limit(ip);
if (!success) {
  return NextResponse.json(
    { error: 'リクエスト上限超過' },
    { status: 429, headers: { 'Retry-After': '60' } }
  );
}
```

**設定の目安:**
- 一般API → 30リクエスト/分
- ファイルアップロード → 10リクエスト/分

**パッケージ:**
```bash
npm install @upstash/ratelimit @upstash/redis
```


---

## 8. CSP（Content Security Policy）

`next.config.ts` のヘッダー設定で、`unsafe-eval` を削除する。

```typescript
// next.config.ts の headers 内
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",  // unsafe-eval は削除
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
  ].join('; '),
}
```

**`unsafe-eval` がなぜ危険か:** `eval()` や `new Function()` を通じた任意コード実行を許可してしまう。


---

## 9. エラーハンドリング（情報漏洩防止）

DB接続エラー等の内部情報をブラウザに返さない。

```typescript
// NG: 内部エラーをそのまま返す
catch (error) {
  return NextResponse.json({ error: error.message }, { status: 500 });
}

// OK: ユーザーには一般的なメッセージ、詳細はサーバーログのみ
catch (error) {
  console.error('Internal error:', error);
  return NextResponse.json(
    { error: 'サーバーエラーが発生しました' },
    { status: 500 }
  );
}
```

**特に注意:** DBパスワード、APIキー、スタックトレースがブラウザに表示される状態は絶対に避ける。


---

## チェックリスト（新規プロジェクト用）

| # | 項目 | 対象 |
|---|------|------|
| 1 | 全APIルートに認証チェック追加 | `src/app/api/**` |
| 2 | supabaseAdmin使用を最小限に | APIルート全般 |
| 3 | 破壊的操作にロールチェック追加 | DELETE, 権限変更系API |
| 4 | PATCH/PUTにフィールドホワイトリスト | 更新系API |
| 5 | ユーザー入力のHTMLエスケープ | メール送信、HTML生成 |
| 6 | 入力値バリデーション | 全APIルート |
| 7 | 機密情報のマスキング | 口座番号、ID等の表示 |
| 8 | RLSポリシー設定 | Supabase全テーブル |
| 9 | PIIアクセスログテーブル作成 | 個人情報を扱うテーブル |
| 10 | レート制限（Upstash Redis） | middleware.ts |
| 11 | CSPから unsafe-eval 削除 | next.config.ts |
| 12 | エラーメッセージから内部情報除去 | 全catchブロック |
