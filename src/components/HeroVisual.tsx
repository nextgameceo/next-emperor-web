import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Starfield, Zuiun } from "./Decor";

/**
 * メインビジュアルの背景
 * 星空 → 瑞雲 → 夜明けの街並み、の三層構成。
 * siteConfig.heroImage に写真を設定すると、街並みイラストの代わりに写真を表示します。
 */
export default function HeroVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden>
      {siteConfig.heroImage ? (
        <>
          <Image src={siteConfig.heroImage} alt="" fill priority sizes="100vw" className="object-cover object-bottom" />
          <div className="absolute inset-0 bg-ink/60" />
        </>
      ) : (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#08080A" />
              <stop offset="0.5" stopColor="#0D0E13" />
              <stop offset="0.8" stopColor="#1E1A14" />
              <stop offset="1" stopColor="#3B3020" />
            </linearGradient>
            <radialGradient id="dawn" cx="0.5" cy="1" r="0.55">
              <stop offset="0" stopColor="#DCC086" stopOpacity="0.32" />
              <stop offset="1" stopColor="#DCC086" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#sky)" />
          <rect width="1440" height="900" fill="url(#dawn)" />
          {/* 地平線から昇る朝日 */}
          <circle cx="720" cy="842" r="58" fill="#E6D3A3" opacity="0.45" />
          {/* 遠景のビル群 */}
          <path
            fill="#141418"
            d="M0 760h60v-60h40v40h50v-110h30v-30h40v140h55v-80h45v-60h35v120h60v-170h18v-40h14v40h18v170h50v-90h70v120h40v-200h30v-30h30v30h30v200h55v-70h45v-80h60v150h40v-120h50v100h45v-60h60v80h35v-140h22v-30h26v30h22v140h60v-90h55v110h45v-60h60v40h40v-100h45v120h70v-50h60v30h30V900H0z"
          />
          {/* 近景のビル群 */}
          <path
            fill="#0A0A0C"
            d="M0 830h90v-70h70v90h40v-140h60v160h50v-60h80v-90h40v-30h50v120h60v-60h90v100h50v-170h20v-26h30v26h20v170h70v-80h60v60h80v-110h60v130h50v-70h70v90h40v-120h60v100h70v-50h80v60H1440V900H0z"
          />
          <g fill="#DCC086" opacity="0.4">
            <rect x="248" y="600" width="3" height="5" />
            <rect x="262" y="630" width="3" height="5" />
            <rect x="470" y="580" width="3" height="5" />
            <rect x="490" y="640" width="3" height="5" />
            <rect x="1052" y="660" width="3" height="5" />
            <rect x="1068" y="690" width="3" height="5" />
            <rect x="1236" y="680" width="3" height="5" />
          </g>
        </svg>
      )}

      {/* 上空の星 */}
      <div className="absolute inset-x-0 top-0 h-[70%]">
        <Starfield count={110} sparkles={10} seed={11} />
      </div>

      {/* 左右に浮かぶ瑞雲 */}
      <div className="absolute -left-16 top-[22%] sm:left-[2%]">
        <Zuiun className="w-56 sm:w-[420px]" opacity={0.2} />
      </div>
      <div className="absolute right-[3%] top-[52%] hidden sm:block">
        <Zuiun className="w-60 sm:w-[460px]" stroke="#DCC086" opacity={0.22} flip />
      </div>
    </div>
  );
}
