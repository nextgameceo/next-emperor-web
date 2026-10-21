# NEXT EMPEROR 公式サイト

Next.js（App Router）/ TypeScript / Tailwind CSS

## ファイル構成

```
next-emperor/
├─ public/images/            ← ロゴ・メインビジュアル写真を置く場所
├─ src/
│  ├─ config/site.ts         ← サイト設定（ロゴ・写真・会社情報・ナビ）
│  ├─ data/jobs.ts           ← 求人データ
│  ├─ data/partners.ts       ← 提携企業データ
│  ├─ lib/                   ← データ取得・入力チェック・メール設定判定
│  ├─ components/            ← ヘッダー/フッター/ロゴ/ボタン/カード/フォーム等
│  └─ app/
│     ├─ page.tsx            ← トップページ
│     ├─ about/ service/ recruit/ recruit/[slug]/ partner/ business/ contact/ privacy/
│     ├─ api/contact/route.ts← お問い合わせ送信API
│     ├─ sitemap.ts / robots.ts / opengraph-image.tsx
│     └─ layout.tsx / globals.css
├─ tailwind.config.ts        ← ブランドカラー
└─ .env.example              ← 環境変数の見本
```

## ローカル起動

1. Node.js 20以上をインストール
2. このフォルダで `npm install`
3. `npm run dev` → http://localhost:3000

## ロゴ・メインビジュアルの差し替え

- `public/images/logo.png` を置き、`src/config/site.ts` の `logo.src` を `"/images/logo.png"`、`width`/`height` を画像の実寸に
- `public/images/hero.jpg`（横長・2400px程度推奨）を置き、`heroImage` を `"/images/hero.jpg"` に

## 求人の追加・編集

`src/data/jobs.ts` の1ブロックをコピーして書き換え。
`status: "published"` かつ `applyUrl` が入っているものだけ公開されます。未確定の条件は `"draft"` のまま。

## 提携企業の追加

`src/data/partners.ts` に追加し、企業の掲載承認後に `approved: true`。

## 応募URL

求人の `applyUrl` に提携企業の公式応募フォームURL（https://〜）を入力。詳細ページのボタンが新しいタブでそのURLを開きます。

## お問い合わせフォーム（Resend）

1. resend.com でアカウント作成 → 送信ドメインを認証 → APIキー発行
2. `.env.local`（ローカル）または Vercel の Environment Variables に
   `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` を設定
3. 未設定の間はフォームに「送信先が未設定」と表示され、送信成功は表示されません

## Vercelへのデプロイ

1. このフォルダをGitHubにアップ（新規リポジトリ）
2. vercel.com → Add New → Project → リポジトリを選択 → Deploy
3. Settings → Environment Variables に上記3つと `NEXT_PUBLIC_SITE_URL`（本番URL）を設定 → Redeploy
4. Settings → Domains で独自ドメインを接続

## 公開前チェック

- 職業紹介・募集情報等提供事業に関する法的確認（労働局・専門家）
- 提携企業の掲載承認
- プライバシーポリシーの専門家確認
