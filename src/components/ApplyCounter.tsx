"use client";

import { useEffect, useRef, useState } from "react";
import { fetchApplyTotal } from "@/lib/applyCount";

/**
 * LINE応募フォームの送信数（総合計）をカウンター風に表示
 * ・数値は /api/apply-count から読み込みます（30秒ごとに最新化）。
 * ・SHOW_FROM 未満のあいだは表示しません（0 のときから表示する設定）。
 */
const SHOW_FROM = 0;
const MIN_DIGITS = 4;

export default function ApplyCounter() {
  const [total, setTotal] = useState<number | null>(null);
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    fetchApplyTotal().then(setTotal);
  }, []);

  // 画面に入ったら 0 からカウントアップ
  useEffect(() => {
    if (total === null || !ref.current) return;
    const el = ref.current;
    const run = () => {
      if (started.current) return;
      started.current = true;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || total === 0) return setShown(total);
      const dur = 1600;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        setShown(Math.round(total * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && run(), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [total]);

  if (total === null || total < SHOW_FROM) return null;

  const digits = String(shown).padStart(Math.max(MIN_DIGITS, String(total).length), "0").split("");

  return (
    <div ref={ref} className="theme-dark card corners relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-14">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(221,180,110,0.10),transparent_65%)]" />
      <p className="relative flex items-center justify-center gap-3 font-display text-xs tracking-[0.3em] text-ice">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ice opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ice" />
        </span>
        LIVE COUNT
      </p>
      <p className="relative mt-3 text-sm tracking-[0.12em] text-ivory/85">LINE応募フォームの送信数</p>

      <div className="relative mt-8 flex items-end justify-center gap-2 sm:gap-3" aria-hidden>
        {digits.map((d, i) => (
          <span
            key={i}
            className="relative flex h-[4.6rem] w-[3.3rem] items-center justify-center overflow-hidden border border-gold/35 bg-gradient-to-b from-[#16151a] to-[#0a0a0c] font-display text-[2.9rem] font-semibold leading-none shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:h-24 sm:w-[4.4rem] sm:text-[3.9rem]"
          >
            <span className="metal-gold">{d}</span>
            <span className="absolute inset-x-0 top-1/2 h-px bg-black/70" />
          </span>
        ))}
        <span className="mb-2 ml-1 text-sm tracking-[0.1em] text-gold sm:text-base">件</span>
      </div>
      <p className="sr-only">LINE応募フォームの送信数：{total}件</p>

      <p className="relative mx-auto mt-8 max-w-md text-[0.72rem] leading-relaxed text-ivory-dim">
        ※ 求人ページの応募フォームから、応募窓口のLINEを開いた回数です（同じ方・同じ日の重複は除きます）。実際の応募数とは異なる場合があります。
      </p>
    </div>
  );
}
