/**
 * シェア画像（OGP）用のフォント読み込み（ビルド時だけ使用）
 * ------------------------------------------------------------
 * Noto Sans JP は文字の範囲ごとに細かいファイルに分かれているため、
 * 画像に使う文字が含まれるファイルだけを選んで読み込みます（軽く・速く）。
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

type Font = { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" };

const NOTO_DIR = join(process.cwd(), "node_modules/@fontsource/noto-sans-jp");
const OXANIUM_DIR = join(process.cwd(), "node_modules/@fontsource/oxanium");

const toAB = (b: Buffer) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;

/** CSS の unicode-range を読み、「どのファイルにどの文字範囲が入っているか」の一覧を作る */
function subsets(weight: 400 | 700) {
  const css = readFileSync(join(NOTO_DIR, `${weight}.css`), "utf8");
  const list: { file: string; ranges: [number, number][] }[] = [];
  for (const block of css.split("@font-face").slice(1)) {
    const file = block.match(/url\(\.\/files\/([^)]+?\.woff)\)/)?.[1];
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
    if (!file || !range) continue;
    const ranges = range.split(",").map((r) => {
      const [a, b] = r.trim().replace(/^U\+/i, "").split("-");
      const start = parseInt(a, 16);
      return [start, b ? parseInt(b, 16) : start] as [number, number];
    });
    list.push({ file, ranges });
  }
  return list;
}

const cache = new Map<string, ArrayBuffer>();
const load = (path: string) => {
  if (!cache.has(path)) cache.set(path, toAB(readFileSync(path)));
  return cache.get(path)!;
};

/**
 * text に含まれる文字を描くのに必要なフォントだけを返す
 * ※ 画像の描画エンジンは「同じ名前・同じ太さ」のフォントを1つしか使わないため、
 *   分割ファイルごとに別の名前（NJP-番号）を付け、family にまとめて指定します。
 */
export function ogFonts(text: string): { fonts: Font[]; family: string } {
  const codes = new Set(Array.from(text).map((c) => c.codePointAt(0)!));
  const fonts: Font[] = [];
  const names: string[] = [];
  for (const weight of [400, 700] as const) {
    subsets(weight).forEach((s) => {
      const hit = [...codes].some((c) => s.ranges.some(([a, b]) => c >= a && c <= b));
      if (!hit) return;
      const name = `NJP-${s.file.match(/jp-(\d+)-/)?.[1] ?? s.file}`;
      if (!names.includes(name)) names.push(name);
      fonts.push({ name, data: load(join(NOTO_DIR, "files", s.file)), weight, style: "normal" });
    });
  }
  // 英字の見出し用（サイトと同じ Oxanium）
  for (const weight of [400, 700] as const) {
    try {
      fonts.push({ name: "Oxanium", data: load(join(OXANIUM_DIR, "files", `oxanium-latin-${weight}-normal.woff`)), weight, style: "normal" });
    } catch {
      /* 見つからなければ Noto Sans JP で代用 */
    }
  }
  return { fonts, family: names.map((n) => `"${n}"`).join(", ") };
}
