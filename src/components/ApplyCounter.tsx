"use client";

import { useEffect, useRef, useState } from "react";
import { fetchApplyTotal } from "@/lib/applyCount";

/**
 * LINE応募フォームからの応募数（総合計）
 * ・数値は /api/apply-count から読み込みます。
 * ・画面に入ると、数字が1桁ずつ縦に回転して止まります（スロットのような動き）。
 * ・SHOW_FROM 未満のあいだは表示しません（0 のときから表示する設定）。
 */
const SHOW_FROM = 0;
const STRIP = Array.from({ length: 20 }, (_, i) => i % 10); // 0〜9 を2周分

function RollingDigit({ digit, active, index }: { digit: number; active: boolean; index: number }) {
  // 2周目の位置で止めることで、しっかり回って見えるようにする
  const pos = active ? 10 + digit : 0;
  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-top" aria-hidden>
      <span
        className="block transition-transform duration-[1900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{ transform: `translateY(-${pos}em)`, transitionDelay: `${index * 140}ms` }}
      >
        {STRIP.map((n, i) => (
          <span key={i} className="metal-gold shimmer block h-[1em] px-[0.02em] leading-[1em]">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function ApplyCounter() {
  const [total, setTotal] = useState<number | null>(null);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchApplyTotal().then(setTotal);
  }, []);

  useEffect(() => {
    if (total === null || !ref.current) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [total]);

  if (total === null || total < SHOW_FROM) return null;

  const digits = String(total).split("").map(Number);

  return (
    <div ref={ref} className="relative py-10 sm:py-12">
      {/* 上下の細いライン（画面に入ると中央から伸びる） */}
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-px origin-center bg-gradient-to-r from-transparent via-gold/70 to-transparent transition-transform duration-[1400ms] ease-out ${active ? "scale-x-100" : "scale-x-0"}`}
      />
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-px origin-center bg-gradient-to-r from-transparent via-ice/60 to-transparent transition-transform delay-300 duration-[1400ms] ease-out ${active ? "scale-x-100" : "scale-x-0"}`}
      />

      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:text-left">
        <div className={`transition-all duration-1000 ${active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
          <p className="flex items-center justify-center gap-2.5 font-display text-[0.68rem] tracking-[0.32em] text-ice sm:justify-start">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ice opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ice" />
            </span>
            Live Count
          </p>
          <p className="mt-3 font-display text-xl tracking-[0.14em] text-ivory sm:text-2xl">Applications</p>
          <p className="mt-1 text-sm tracking-[0.12em] text-ivory-muted">LINE応募フォームからの応募</p>
        </div>

        <p className="flex items-baseline gap-2">
          <span className="sr-only">{total}件</span>
          <span className="font-display text-[4.8rem] font-light leading-none tabular-nums sm:text-[6.4rem]">
            {digits.map((d, i) => (
              <RollingDigit key={`${digits.length}-${i}`} digit={d} active={active} index={i} />
            ))}
          </span>
          <span
            aria-hidden
            className={`font-display text-sm tracking-[0.2em] text-gold transition-opacity delay-700 duration-700 ${active ? "opacity-100" : "opacity-0"}`}
          >
            件
          </span>
        </p>
      </div>

      <p className="mt-6 text-center text-[0.7rem] leading-relaxed text-ivory-dim sm:text-right">
        ※ 応募フォームからLINEを開いた数（同日の重複を除く）
      </p>
    </div>
  );
}
