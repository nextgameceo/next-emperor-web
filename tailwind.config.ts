import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ブランドカラー（ここを変えるとサイト全体の色が変わります）
        ink: "#08080A", // メイン：ブラック
        night: "#0E0F14", // 夜空のような深いチャコール（パネル背景）
        charcoal: {
          DEFAULT: "#1A1A1E", // サブ：チャコールグレー
          light: "#26262B",
          line: "#2F2F36",
        },
        gold: {
          DEFAULT: "#CDB177", // アクセント：シャンパンゴールド（ロゴの「NEXT」）
          soft: "#E6D3A3",
          deep: "#9C7B43",
        },
        silver: {
          DEFAULT: "#D3D3DA", // ロゴの「EMPEROR」のクローム
          deep: "#8C8E98",
        },
        ivory: {
          DEFAULT: "#F2ECDF", // 文字：アイボリー
          muted: "#B9B3A6",
          dim: "#86827A",
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
