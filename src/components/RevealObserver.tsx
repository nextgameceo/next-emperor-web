"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * サイト全体の動き
 * ・なめらかなスクロール（Lenis）
 * ・data-reveal：画面に入ると is-visible が付き、ふわっと表示（"mask" は下から文字がせり上がる / "line" は線が伸びる）
 * ・data-parallax="0.1"：スクロールに合わせて、ゆっくり上下する（数値が大きいほど大きく動く）
 * ・.btn-pill / [data-magnetic]：マウスに少し吸い寄せられるボタン（PCのみ）
 * ・「動きを減らす」設定の端末では、すべて控えめ（またはなし）になります
 */
export default function RevealObserver() {
  const pathname = usePathname();

  // なめらかなスクロール・パララックス・マグネット（最初に1回だけ）
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.95 });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      // パララックス
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = Number(el.dataset.parallax) || 0.1;
        const center = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // マグネットボタン
    const fine = window.matchMedia("(pointer: fine)").matches;
    let current: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      if (!fine) return;
      const target = (e.target as HTMLElement)?.closest?.<HTMLElement>(".btn-pill, [data-magnetic]") ?? null;
      if (current && current !== target) {
        current.style.transform = "";
        current = null;
      }
      if (!target) return;
      current = target;
      const r = target.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
      target.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };
    const onLeave = () => {
      if (current) current.style.transform = "";
      current = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // ページを移動したら一番上へ（なめらかスクロール使用時のずれ防止）
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // スクロールで表示
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
