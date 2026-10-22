import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * ブログ記事の読み込み
 * ------------------------------------------------------------
 * 記事は content/blog/ フォルダの Markdown ファイル（.md）です。
 * ・ファイル名がURLになります（career-tips.md → /blog/career-tips）
 * ・ファイル名が「_」で始まるもの、draft: true のものは表示されません
 * ・日付が未来の記事は表示されません（その日付以降にサイトを更新すると公開されます）
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: string;
  excerpt: string;
  cover?: string;
};

export type Post = PostMeta & { html: string };

marked.setOptions({ gfm: true, breaks: true });

function readFile(file: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      date,
      category: String(data.category ?? "お知らせ"),
      excerpt: String(data.excerpt ?? ""),
      cover: data.cover ? String(data.cover) : undefined,
    } satisfies PostMeta,
    draft: data.draft === true,
    content,
  };
}

function isPublic(draft: boolean, date: string) {
  if (draft) return false;
  const today = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10); // 日本時間
  return !date || date <= today;
}

function listFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && /^[a-z0-9-]+\.md$/i.test(f));
}

/** 公開中の記事（新しい順） */
export function getAllPosts(): PostMeta[] {
  return listFiles()
    .map(readFile)
    .filter((p) => isPublic(p.draft, p.meta.date))
    .map((p) => p.meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!listFiles().includes(file)) return null;
  const p = readFile(file);
  if (!isPublic(p.draft, p.meta.date)) return null;
  return { ...p.meta, html: marked.parse(p.content, { async: false }) as string };
}

export function getCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((p) => p.category)));
}

export function formatDate(date: string): string {
  return date.replace(/-/g, ".");
}
