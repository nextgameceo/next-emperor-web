import type { Config } from "tailwindcss";

/*
 * ブランドカラー（ここを変えるとサイト全体の色が変わります）
 * 背景は黒。金・銀・星の色は公式ロゴから抽出しています。
 *   金  … ロゴの「NEXT」
 *   銀  … ロゴの「EMPEROR」（わずかにラベンダーがかったクローム）
 *   水色 … ロゴの縁取り・星（金に次ぐ2番目の差し色）
 */
const BASE = "#000000"; // 背景の黒（ヘッダー・ヒーロー・フッター）

/*
 * 色の実際の値は src/app/globals.css の「カラー設定」にあります。
 *   黒い部分（ヘッダー・ヒーロー・フッター）用 … :root / .theme-dark
 *   白い部分（各セクション）用 …………………… .theme-light
 * 同じクラス名（text-gold など）でも、置かれた場所に合わせて読みやすい色に切り替わります。
 */
const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: BASE,
        night: BASE,
        navy: {
          DEFAULT: BASE,
          deep: BASE,
          light: v("navy-light"),
        },
        charcoal: {
          DEFAULT: v("charcoal"), // カード等のわずかに明るい面
          light: v("charcoal-light"),
          line: v("charcoal-line"), // 罫線
        },
        gold: {
          DEFAULT: v("gold"), // ロゴのゴールド（シャンパン寄り）
          soft: v("gold-soft"),
          deep: v("gold-deep"),
        },
        silver: {
          DEFAULT: v("silver"), // ロゴのクローム
          deep: v("silver-deep"),
        },
        ice: {
          DEFAULT: v("ice"), // 水色：ロゴの縁取りの色（金に次ぐ差し色）
          soft: v("ice-soft"),
          deep: v("ice-deep"),
        },
        ivory: {
          DEFAULT: v("ivory"), // 文字色
          muted: v("ivory-muted"),
          dim: v("ivory-dim"),
        },
        danger: v("danger"), // エラー表示
      },
      fontFamily: {
        // 英数字は Oxanium、日本語は Noto（英数字だけ先頭のフォントが使われます）
        // 見出しも含め、日本語はすべてゴシック体（Noto Sans JP）
        serif: ['"Oxanium"', '"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', '"Yu Gothic"', "sans-serif"],
        sans: ['"Oxanium"', '"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', '"Yu Gothic"', "sans-serif"],
        display: ['"Oxanium"', '"Noto Sans JP"', "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.28em",
      },
      maxWidth: {
        site: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
