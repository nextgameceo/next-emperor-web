"use client";

import { useEffect, useRef } from "react";

/**
 * ヒーロー背景のビジュアル「夜明けの地平線」
 * ・夜空の星（ゆっくり瞬き、マウスに合わせてわずかに奥行きが動く）
 * ・画面右下に、惑星の縁のような地平線と、そこから昇る金色の光
 * ・読み込み時に、光が地平線からゆっくり立ち上がる
 * ・「動きを減らす」設定の端末では、静止画として表示
 */
type Star = { x: number; y: number; z: number; r: number; tw: number; sp: number };

export default function HeroHorizon({ variant = "home" }: { variant?: "home" | "page" }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let raf = 0;
    let visible = true;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    // オープニング表示中は、光が昇るのを幕が上がった後にずらす
    const t0 = performance.now() + (document.documentElement.classList.contains("intro") ? 1700 : 0);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // iPhoneはスクロールでアドレスバーが伸び縮みするたびに resize が起きるため、
      // 横幅が変わったときと、高さが大きく変わったときだけ作り直す
      if (w && Math.abs(rect.width - w) < 1 && Math.abs(rect.height - h) < 120) return;
      dpr = Math.min(window.devicePixelRatio || 1, rect.width < 768 ? 1.25 : 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(220, (w * h) / 5000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(), // 奥行き（大きいほど手前）
        r: Math.random() * 1.1 + 0.25,
        tw: Math.random() * Math.PI * 2,
        sp: 0.4 + Math.random() * 1.2,
      }));
    };

    // 地平線（大きな円の縁）の位置
    const planet = () => {
      const mobile = w < 768;
      const R = mobile ? w * 2.6 : Math.max(w, h) * 1.5;
      const cx = w * (mobile ? 0.62 : variant === "page" ? 0.84 : 0.8);
      const top = variant === "page" ? h * (mobile ? 0.9 : 0.84) : h * (mobile ? 0.8 : 0.68); // 地平線のいちばん高い位置
      return { R, cx, cy: top + R };
    };

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      const rise = reduce ? 1 : Math.min(1, Math.max(0, t) / 2.8);
      const ease = 1 - Math.pow(1 - rise, 3);
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      ctx.clearRect(0, 0, w, h);

      // 空のグラデーション（上は漆黒、地平線に近づくほど夜明けの色）
      const { R, cx, cy } = planet();
      const horizonY = cy - R;
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#000000");
      sky.addColorStop(0.55, "#04050a");
      sky.addColorStop(1, "#0a0d16");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // 星
      for (const s of stars) {
        const px = s.x + mouse.x * (6 + s.z * 18);
        const py = s.y + mouse.y * (4 + s.z * 12);
        // 地平線の光に近い星は薄くする
        const distToGlow = Math.hypot(px - cx, py - horizonY);
        const fade = Math.min(1, distToGlow / (Math.max(w, h) * 0.55));
        const a = (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(s.tw + t * s.sp))) * (0.25 + s.z * 0.75) * fade;
        ctx.fillStyle = s.z > 0.82 ? `rgba(242,221,180,${a})` : s.z < 0.18 ? `rgba(182,237,251,${a})` : `rgba(245,240,232,${a})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r * (0.6 + s.z * 0.7), 0, Math.PI * 2);
        ctx.fill();
      }

      // 夜明けの光（地平線の上に広がる）
      const glowR = Math.max(w, h) * (0.35 + 0.45 * ease);
      const pulse = 0.92 + 0.08 * Math.sin(t * 0.6);
      const g1 = ctx.createRadialGradient(cx, horizonY + 8, 0, cx, horizonY + 8, glowR);
      g1.addColorStop(0, `rgba(255,236,196,${0.55 * ease * pulse})`);
      g1.addColorStop(0.18, `rgba(221,180,110,${0.32 * ease * pulse})`);
      g1.addColorStop(0.5, `rgba(127,214,242,${0.08 * ease})`);
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // 惑星（地平線より下を暗く塗る）
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      const body = ctx.createRadialGradient(cx, cy - R, R * 0.02, cx, cy, R);
      body.addColorStop(0, "#0b0c12");
      body.addColorStop(0.15, "#050608");
      body.addColorStop(1, "#000000");
      ctx.fillStyle = body;
      ctx.fill();

      // 地平線の縁の光（中央が最も明るく、左右へ金→水色に溶ける）
      const rim = ctx.createLinearGradient(cx - R * 0.55, 0, cx + R * 0.55, 0);
      rim.addColorStop(0, "rgba(127,214,242,0)");
      rim.addColorStop(0.3, `rgba(127,214,242,${0.35 * ease})`);
      rim.addColorStop(0.5, `rgba(255,240,210,${0.95 * ease})`);
      rim.addColorStop(0.7, `rgba(221,180,110,${0.45 * ease})`);
      rim.addColorStop(1, "rgba(221,180,110,0)");
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, Math.PI * 1.08, Math.PI * 1.92);
      ctx.strokeStyle = rim;
      ctx.lineWidth = 1.4;
      ctx.shadowColor = "rgba(242,217,168,0.9)";
      ctx.shadowBlur = w < 768 ? 0 : 10 * ease;
      ctx.stroke();
      ctx.restore();

      // 薄い大気の層
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R + 14, Math.PI * 1.15, Math.PI * 1.85);
      ctx.strokeStyle = `rgba(127,214,242,${0.08 * ease})`;
      ctx.lineWidth = 22;
      ctx.stroke();
      ctx.restore();

      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(draw);
    });

    resize();
    raf = requestAnimationFrame(draw);
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [variant]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
