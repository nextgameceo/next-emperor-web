/**
 * オリジナルのベクターアート（SVG）
 * ・線は画面に入ると「描かれる」ように現れます（親要素の data-reveal が is-visible になったとき）
 * ・すべて軽いSVGなので、スマホでも負担になりません
 * ・色は文字色（currentColor）と金・水色を使うため、黒背景・白背景のどちらでも使えます
 */

type IconName =
  | "hospitality"
  | "communication"
  | "sales"
  | "detail"
  | "impression"
  | "resilience"
  | "megaphone"
  | "target"
  | "solar"
  | "briefcase"
  | "network"
  | "compass";

const ICONS: Record<IconName, string[]> = {
  hospitality: ["M15 7h18l-2.5 14a6.5 6.5 0 0 1-13 0z", "M24 27.5v12", "M16.5 40h15", "M18 13h12"],
  communication: [
    "M7 9h21a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-10l-6 5v-5H7a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z",
    "M36 19h5a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4h-2v5l-6-5h-7a4 4 0 0 1-4-4v-1",
    "M10 17h14",
  ],
  sales: ["M6 41h36", "M8 33l9-9 8 6 15-16", "M32 14h8v8", "M12 41v-4", "M20 41v-8", "M28 41v-6", "M36 41v-12"],
  detail: ["M20 6a13 13 0 1 0 0 26 13 13 0 0 0 0-26z", "M29.5 29.5 42 42", "M20 13v14", "M13 20h14"],
  impression: ["M24 5c1.2 9.5 6.3 14.6 16 16-9.7 1.4-14.8 6.5-16 16-1.2-9.5-6.3-14.6-16-16 9.7-1.4 14.8-6.5 16-16z", "M38 34l2 6", "M8 8l3 3"],
  resilience: ["M38 17A15 15 0 0 0 10 19", "M10 11v8h8", "M10 31a15 15 0 0 0 28-2", "M38 37v-8h-8"],
  megaphone: ["M7 19v10h6l15 9V10l-15 9z", "M34 18a8 8 0 0 1 0 12", "M38.5 13a14 14 0 0 1 0 22", "M13 29l2.5 10h4.5L17.5 29"],
  target: ["M24 8a16 16 0 1 0 16 16", "M24 15a9 9 0 1 0 9 9", "M24 22a2 2 0 1 0 2 2", "M24 24 40 8", "M33 8h7v7"],
  solar: ["M6 32l7-15h29l-7 15z", "M9.5 24.5h29", "M22.5 17l-7 15", "M32 17l-7 15", "M20.5 32v8", "M14 40h13", "M40 4v4", "M46 10h-4", "M44.5 5.5l-2.5 2.5"],
  briefcase: ["M6 16h36v24H6z", "M17 16v-5h14v5", "M6 27h36", "M21 27v4h6v-4"],
  network: ["M12 12a4 4 0 1 0 0 .1", "M37 15a4 4 0 1 0 0 .1", "M24 37a4 4 0 1 0 0 .1", "M15.5 13.5l17.5 1.5", "M14 15.5l8 18", "M35 18.5 26 34"],
  compass: ["M24 5a19 19 0 1 0 0 38 19 19 0 0 0 0-38z", "M31 17l-4.5 9.5L17 31l4.5-9.5z", "M24 5v4", "M24 39v4", "M5 24h4", "M39 24h4"],
};

/** 線画アイコン（画面に入ると線が描かれる） */
export function LineIcon({ name, className = "h-12 w-12" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`draw-svg ${className}`} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ICONS[name].map((d, i) => (
        <path key={i} d={d} pathLength={1} style={{ "--k": i } as React.CSSProperties} />
      ))}
    </svg>
  );
}

/**
 * 「夜から昼へ」のイラスト
 * 三日月（夜）から太陽（昼）へ、軌道を光がめぐる構図
 */
export function NightToDayArt({ className = "" }: { className?: string }) {
  const stars = [
    [96, 120, 1.6], [150, 70, 1.1], [330, 64, 1.4], [400, 132, 1.1], [72, 214, 1.2], [420, 220, 1.5], [200, 40, 1], [280, 110, 1.2], [118, 168, 0.9], [366, 180, 1],
  ];
  return (
    <svg viewBox="0 0 480 400" className={`draw-svg art-night ${className}`} fill="none" aria-hidden>
      <defs>
        <linearGradient id="ndArc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7FD6F2" />
          <stop offset="0.5" stopColor="#F2DDB4" />
          <stop offset="1" stopColor="#DDB46E" />
        </linearGradient>
        <radialGradient id="ndSun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF3D6" />
          <stop offset="0.55" stopColor="#DDB46E" />
          <stop offset="1" stopColor="#A97A3C" />
        </radialGradient>
        <radialGradient id="ndGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#DDB46E" stopOpacity="0.35" />
          <stop offset="1" stopColor="#DDB46E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 軌道（同心円） */}
      <g stroke="currentColor" strokeOpacity="0.14">
        <circle cx="240" cy="290" r="200" strokeDasharray="2 6" pathLength={1} style={{ "--k": 0 } as React.CSSProperties} />
        <circle cx="240" cy="290" r="140" pathLength={1} style={{ "--k": 1 } as React.CSSProperties} />
        <circle cx="240" cy="290" r="80" pathLength={1} style={{ "--k": 2 } as React.CSSProperties} />
      </g>
      {/* 地平線 */}
      <path d="M10 290H470" stroke="currentColor" strokeOpacity="0.22" pathLength={1} style={{ "--k": 1 } as React.CSSProperties} />

      {/* 夜から昼へのアーチ */}
      <path id="ndPath" d="M60 290A180 180 0 0 1 420 290" stroke="url(#ndArc)" strokeWidth="1.6" pathLength={1} style={{ "--k": 2 } as React.CSSProperties} />

      {/* 星 */}
      <g className="art-stars">
        {stars.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="currentColor" fillOpacity="0.55" style={{ "--t": `${(i % 5) * 0.7}s` } as React.CSSProperties} />
        ))}
      </g>

      {/* 三日月 */}
      <g className="art-pop" style={{ "--k": 3 } as React.CSSProperties}>
        <path d="M60 266A24 24 0 1 0 60 314A30 30 0 0 1 60 266Z" fill="#7FD6F2" fillOpacity="0.9" />
        <text x="60" y="346" textAnchor="middle" className="art-label" fill="currentColor">NIGHT</text>
      </g>

      {/* 太陽 */}
      <g className="art-pop" style={{ "--k": 4 } as React.CSSProperties}>
        <circle cx="420" cy="290" r="54" fill="url(#ndGlow)" />
        <g className="art-rays" stroke="#DDB46E" strokeWidth="1.4" strokeLinecap="round">
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            return <line key={i} x1={420 + Math.cos(a) * 28} y1={290 + Math.sin(a) * 28} x2={420 + Math.cos(a) * (i % 2 ? 34 : 38)} y2={290 + Math.sin(a) * (i % 2 ? 34 : 38)} />;
          })}
        </g>
        <circle cx="420" cy="290" r="20" fill="url(#ndSun)" />
        <text x="420" y="346" textAnchor="middle" className="art-label" fill="currentColor">DAY</text>
      </g>

      {/* 中央のしるし */}
      <g className="art-pop" style={{ "--k": 2 } as React.CSSProperties}>
        <path d="M240 190c1.6 13 8.6 20 21.5 21.8-12.9 1.8-19.9 8.8-21.5 21.8-1.6-13-8.6-20-21.5-21.8 12.9-1.8 19.9-8.8 21.5-21.8z" fill="#DDB46E" />
        <text x="240" y="262" textAnchor="middle" className="art-label" fill="currentColor">NEXT</text>
      </g>

      {/* アーチを走る光 */}
      <circle r="4.5" fill="#FFF3D6" className="art-runner">
        <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
          <mpath href="#ndPath" />
        </animateMotion>
      </circle>
    </svg>
  );
}

/** ゆっくり回る円形のエンブレム（文字が円を描く） */
export function Emblem({ className = "h-32 w-32" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden>
      <defs>
        <path id="emblemCircle" d="M80 80m-62 0a62 62 0 1 1 124 0a62 62 0 1 1-124 0" />
      </defs>
      <g className="emblem-spin">
        <text className="emblem-text" fill="currentColor">
          <textPath href="#emblemCircle">NEXT EMPEROR ・ FROM NIGHT TO TOMORROW ・ </textPath>
        </text>
      </g>
      <circle cx="80" cy="80" r="44" fill="none" stroke="currentColor" strokeOpacity="0.2" />
      <path d="M80 56c1.8 14.5 9.5 22.2 24 24-14.5 1.8-22.2 9.5-24 24-1.8-14.5-9.5-22.2-24-24 14.5-1.8 22.2-9.5 24-24z" fill="#DDB46E" />
    </svg>
  );
}

export type { IconName };
