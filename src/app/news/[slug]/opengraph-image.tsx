import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/blog";
import { ogFonts } from "@/lib/ogFonts";

/**
 * 記事ごとのシェア画像（SNSやLINEで記事を共有したときに出る画像）
 * ・記事のタイトル入りで、ビルド時に自動で作られます（黒×金のデザイン）
 * ・記事に cover（アイキャッチ画像）を指定している場合は、そちらが優先されます
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "NEXT EMPEROR のコラム";
export const dynamic = "force-static";

export function generateStaticParams() {
  const list = getAllPosts().map((p) => ({ slug: p.slug }));
  return list.length > 0 ? list : [{ slug: "none" }];
}

const GOLD = "#DDB46E";
const ICE = "#7FD6F2";
const IVORY = "#F5F0E8";

const AUDIENCE_LABEL = { seeker: "FOR TALENT ・ 求職者の方へ", business: "FOR BUSINESS ・ 企業の方へ", general: "NEWS" } as const;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  const title = post?.title ?? "NEXT EMPEROR";
  const category = post?.category ?? "NEWS";
  const date = (post?.date ?? "").replace(/-/g, ".");
  const label = AUDIENCE_LABEL[post?.audience ?? "general"];
  const tagline = "夜の経験を、明日の可能性へ。";

  // タイトルが長いときは文字を小さくする
  const len = Array.from(title).length;
  const fontSize = len > 56 ? 46 : len > 40 ? 52 : len > 26 ? 60 : 68;

  const mark = `data:image/jpeg;base64,${readFileSync(join(process.cwd(), "public/images/emblem-mark.jpg")).toString("base64")}`;
  const { fonts, family } = ogFonts(`${title}${category}${label}${tagline}${date}NEXT EMPERORnext-emperor.comCOLUMN0123456789.・`);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "radial-gradient(ellipse 80% 70% at 50% 120%, #2a2112 0%, #0b0b0f 55%, #000 100%)",
          color: IVORY,
          fontFamily: family,
          padding: 36,
        }}
      >
        {/* 金の細い枠 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: `1.5px solid rgba(221,180,110,0.55)`,
            padding: "44px 56px 40px",
            position: "relative",
          }}
        >
          {/* 上段：ロゴとラベル */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mark} width={56} height={56} style={{ borderRadius: 999, border: `1px solid ${GOLD}` }} alt="" />
              <div style={{ display: "flex", fontFamily: "Oxanium", fontWeight: 700, fontSize: 26, letterSpacing: 6, color: IVORY }}>
                NEXT EMPEROR
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 3,
                color: ICE,
                border: `1px solid rgba(127,214,242,0.6)`,
                padding: "6px 16px",
              }}
            >
              {category}
            </div>
          </div>

          {/* 中段：読者ラベルとタイトル */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 20, letterSpacing: 4, color: GOLD }}>
              <div style={{ width: 10, height: 10, background: GOLD, transform: "rotate(45deg)" }} />
              {label}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize,
                fontWeight: 700,
                lineHeight: 1.45,
                letterSpacing: 1,
                color: IVORY,
              }}
            >
              {title}
            </div>
          </div>

          {/* 下段：タグラインと日付 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", height: 2, background: `linear-gradient(90deg, ${ICE}, ${GOLD} 45%, rgba(221,180,110,0))` }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, color: "rgba(245,240,232,0.75)" }}>
              <div style={{ display: "flex", letterSpacing: 3 }}>{tagline}</div>
              <div style={{ display: "flex", fontFamily: "Oxanium", letterSpacing: 3 }}>
                {date ? `${date}  ·  ` : ""}next-emperor.com
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
