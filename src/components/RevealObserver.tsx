"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * サイト全体の動き
 * ・なめらかなスクロール（Lenis）
 * ・data-reveal：画面に入ると is-visible が付き、ふわっと表示（"mask" は下から文字がせり上がる / "line" は線が伸びる）
 * ・data-parallax="0.1"：スクロールに合わせて、ゆっくり上下する（数値が大きいほど大きく動く）
 * ・.btn-pill / [data-magnetic]：マウスに少し吸い寄せられるボタン（PCのみ）
 * ・.card / [data-tilt]：マウスの位置に合わせて、カードが少し傾く（PCのみ）
 * ・金色のカーソル、画面上部のスクロール量のバー
 * ・「動きを減らす」設定の端末では、すべて控えめ（またはなし）になります
 */
export default function RevealObserver() {
  const pathname = usePathname();

  // なめらかなスクロール・パララックス・マグネット（最初に1回だけ）
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // スマホ・タブレット（指で操作する端末）では、なめらかスクロールを使わない
    // （iPhoneの慣性スクロールと競合して、位置が飛ぶことがあるため）
    const touch = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    const lenis = touch ? null : new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.95 });
    let raf = 0;
    const root = document.documentElement;
    const bar = document.querySelector<HTMLElement>(".scroll-progress");
    let lastP = -1;

    // カーソル（PCのみ）
    const fine = window.matchMedia("(pointer: fine)").matches;
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    if (fine) document.body.append(dot, ring);
    const pos = { x: -100, y: -100, rx: -100, ry: -100 };

    // パララックスの対象（ページ移動や読み込み後に取り直す）
    let px: HTMLElement[] = [];
    const collect = () => {
      px = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    };
    collect();
    const mo = new MutationObserver(() => collect());
    mo.observe(document.body, { childList: true, subtree: true });
    let lastY = -1;
    let lastH = -1;

    const loop = (t: number) => {
      lenis?.raf(t);
      // スクロールしていない間は、位置の計算をしない（スマホの負担を減らす）
      const y = window.scrollY;
      const vh = window.innerHeight;
      const moved = y !== lastY || vh !== lastH;
      lastY = y;
      lastH = vh;
      // スクロール量のバー（バーだけを直接動かす：ページ全体の再計算を起こさない）
      if (moved) {
        const max = document.documentElement.scrollHeight - vh;
        const p = max > 0 ? Math.round((y / max) * 1000) / 1000 : 0;
        if (bar && p !== lastP) {
          bar.style.transform = `scaleX(${p})`;
          lastP = p;
        }
      }
      // カーソル
      if (fine) {
        pos.rx += (pos.x - pos.rx) * 0.16;
        pos.ry += (pos.y - pos.ry) * 0.16;
        dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        ring.style.transform = `translate3d(${pos.rx.toFixed(1)}px, ${pos.ry.toFixed(1)}px, 0)`;
      }
      // パララックス（先に位置をまとめて読み、あとでまとめて書く：再計算の連鎖を防ぐ）
      if (moved && px.length) {
        const reads = px.map((el) => {
          const r = el.getBoundingClientRect();
          const cur = Number(el.dataset.py || 0); // 今の移動量を戻して、元の位置で計算する
          return { el, top: r.top - cur, h: r.height };
        });
        for (const { el, top, h } of reads) {
          if (top + h < -200 || top > vh + 200) continue;
          const speed = Number(el.dataset.parallax) || 0.1;
          const off = -(top + h / 2 - vh / 2) * speed;
          el.dataset.py = off.toFixed(1);
          el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // マグネットボタン・カードの傾き
    let current: HTMLElement | null = null;
    let tilted: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      if (!fine) return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      root.classList.add("cursor-on");
      const el = e.target as HTMLElement;
      root.classList.toggle("cursor-hover", !!el?.closest?.("a, button, summary, label, input, select, textarea, [data-magnetic]"));

      const card = el?.closest?.<HTMLElement>(".card, [data-tilt]") ?? null;
      if (tilted && tilted !== card) {
        tilted.style.transform = "";
        tilted.style.removeProperty("--mx");
        tilted = null;
      }
      if (card && card.getBoundingClientRect().width < 900) {
        tilted = card;
        const cr = card.getBoundingClientRect();
        const px = (e.clientX - cr.left) / cr.width - 0.5;
        const py = (e.clientY - cr.top) / cr.height - 0.5;
        card.style.setProperty("--mx", `${(e.clientX - cr.left).toFixed(0)}px`);
        card.style.setProperty("--my", `${(e.clientY - cr.top).toFixed(0)}px`);
        card.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-4px)`;
      }

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
      if (tilted) tilted.style.transform = "";
      current = null;
      tilted = null;
      root.classList.remove("cursor-on");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      lenis?.destroy();
      dot.remove();
      ring.remove();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // ページを移動したら一番上へ（最初の表示では何もしない）
  const firstPath = useRef(true);
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  // 画面の外にあるセクションの「ずっと動き続けるアニメーション」を一時停止（スマホの負担を減らす）
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("main > *, footer"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("is-off", !e.isIntersecting)),
      { rootMargin: "200px 0px" },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
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
