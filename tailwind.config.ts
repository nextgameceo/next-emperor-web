import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ブランドカラー（ここを変えるとサイト全体の色が変わります）
        ink: "#060A12", // ベース：ネイビーがかったブラック
        night: "#0B1526", // ミッドナイトネイビー（パネル背景）
        navy: {
          DEFAULT: "#0E1B30",
          deep: "#08111F",
          light: "#16274A",
        },
        charcoal: {
          DEFAULT: "#0F1A2E",
          light: "#15243F",
          line: "#24344F", // 罫線
        },
        gold: {
          DEFAULT: "#C6A46A", // シャンパンゴールド
          soft: "#E3C993",
          deep: "#9E7E45",
        },
        paper: {
          DEFAULT: "#F5F2EB", // 明るいセクションの背景（アイボリー）
          line: "#E3DDD0",
          ink: "#16202F", // 明るい背景上の文字色
          muted: "#5C6371",
        },
        silver: {
          DEFAULT: "#D3D3DA",
          deep: "#8C93A3",
        },
        ivory: {
          DEFAULT: "#F4EFE4", // 文字：アイボリー
          muted: "#B8BCC6",
          dim: "#7F8696",
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
        site: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
