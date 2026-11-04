"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";

const SRC = "/videos/next-emperor-pv.mp4";
const POSTER = "/videos/next-emperor-pv-poster.webp";

/**
 * ブランドムービー（60秒）
 * ・最初は表紙の画像と再生ボタンだけを表示し、動画は読み込まない（ページを重くしない）
 * ・押すと音付きで最初から再生する（言葉と音で見せる動画のため、自動再生はしない）
 */
export default function VisionFilm() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  const start = () => {
    setStarted(true);
    track("video_play", { video: "vision_film" });
    requestAnimationFrame(() => {
      const v = ref.current;
      if (!v) return;
      v.play().catch(() => {
        /* 再生がブロックされた場合は、表示されたコントロールから再生できる */
      });
    });
  };

  return (
    <div className="card corners relative overflow-hidden bg-black p-0" data-reveal>
      <div className="relative aspect-video w-full">
        {started ? (
          <video
            ref={ref}
            className="absolute inset-0 h-full w-full bg-black"
            src={SRC}
            poster={POSTER}
            controls
            playsInline
            preload="auto"
            onEnded={() => track("video_complete", { video: "vision_film" })}
          >
            お使いのブラウザでは動画を再生できません。
          </video>
        ) : (
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 block h-full w-full cursor-pointer"
            aria-label="ブランドムービーを再生する（60秒・音が出ます）"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={POSTER} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            <span aria-hidden className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/5" />
            <span className="absolute bottom-[4%] left-[4%] flex items-center gap-3 sm:gap-4">
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 bg-black/60 backdrop-blur transition-all duration-500 group-hover:scale-105 group-hover:border-gold group-hover:bg-gold/20 sm:h-16 sm:w-16"
              >
                <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 text-gold sm:h-6 sm:w-6" fill="currentColor">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
              <span className="text-left font-display text-[0.6rem] tracking-[0.28em] text-ivory/80 sm:text-xs">
                PLAY
                <span className="block text-ivory/50">60 SEC ・ SOUND ON</span>
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
