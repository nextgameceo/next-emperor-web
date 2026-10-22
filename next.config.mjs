/**
 * Cloudflare 用の設定
 * サイトは「静的ファイル（out フォルダ）」として書き出し、
 * お問い合わせの送信だけを worker/index.ts（Cloudflare Workers）で処理します。
 * セキュリティ用のヘッダーは public/_headers で設定しています。
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // 静的書き出しでは画像の自動変換が使えないため、元画像をそのまま配信
    unoptimized: true,
  },
};

export default nextConfig;
