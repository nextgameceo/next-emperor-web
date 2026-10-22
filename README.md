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
3. `npm run dev` → http://localhost:3000（Cloudflare と同じ環境で確認する場合は `npm run preview`）

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

## 公開（Cloudflare Workers）

このサイトは「静的ファイル（out フォルダ）」＋「お問い合わせ送信用の小さなプログラム（worker/index.ts）」で動きます。
Cloudflare の無料プランで運用できます。

- Cloudflare の Worker 設定 → Build
  - Build command：`npm run build`
  - Deploy command：`npx wrangler deploy`
- `wrangler.jsonc` の `name` は、Cloudflare の Worker 名と同じにしてください。
- GitHub の main に反映されると、自動で再公開されます。

## お問い合わせフォーム（Resend）

Cloudflare の Worker → Settings → Variables and Secrets に、次の3つを登録します。

- `RESEND_API_KEY`（Secret として登録）
- `CONTACT_TO_EMAIL`（受け取るアドレス）
- `CONTACT_FROM_EMAIL`（例：`NEXT EMPEROR <noreply@next-emperor.com>`。Resend で認証済みのドメイン）

3つそろうまでは、フォームに「送信先が未設定」と表示され、送信成功は表示されません。

## サイトのURL

`src/config/site.ts` の `url`（初期値 `https://next-emperor.com`）が、シェア画像・サイトマップに使われます。

## ブログ

`content/blog/` に Markdown ファイルを追加します（書き方は `_template.md`）。
未来の日付の記事は、その日付以降にサイトが更新（再公開）されたタイミングで表示されます。

## 公開前チェック

- 職業紹介・募集情報等提供事業に関する法的確認（労働局・専門家）
- 提携企業の掲載承認
- プライバシーポリシーの専門家確認
