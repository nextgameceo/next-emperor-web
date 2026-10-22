import type { Config } from "tailwindcss";

/*
 * ブランドカラー（ここを変えるとサイト全体の色が変わります）
 * 背景はチャコールの単色。金・銀・星の色は公式ロゴから抽出しています。
 *   金  … ロゴの「NEXT」
 *   銀  … ロゴの「EMPEROR」（わずかにラベンダーがかったクローム）
 *   水色 … ロゴの縁取り・星（金に次ぐ2番目の差し色）
 */
const BASE = "#000000"; // 背景のチャコール（全セクション共通）

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
          light: "#25242B",
        },
        charcoal: {
          DEFAULT: "#25242B", // カード等のわずかに明るい面
          light: "#2C2B33",
          line: "#3A3842", // 罫線
        },
        gold: {
          DEFAULT: "#DDB46E", // ロゴのゴールド（シャンパン寄り）
          soft: "#F2DDB4",
          deep: "#A97A3C",
        },
        silver: {
          DEFAULT: "#D6CCDC", // ロゴのクローム
          deep: "#9A90A6",
        },
        ice: {
          DEFAULT: "#7FD6F2", // 水色：ロゴの縁取りの色（金に次ぐ差し色）
          soft: "#B6EDFB",
          deep: "#3FA6D2",
        },
        ivory: {
          DEFAULT: "#F5F0E8", // 文字：アイボリー
          muted: "#BFB9C4",
          dim: "#8A8592",
        },
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', '"Hiragino Mincho ProN"', '"Yu Mincho"', "serif"],
        sans: ['"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', '"Yu Gothic"', "sans-serif"],
        display: ['"Cormorant Garamond"', '"Noto Serif JP"', "serif"],
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
