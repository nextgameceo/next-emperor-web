export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPublishedJobs } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const pages = ["", "/about", "/service", "/recruit", "/partner", "/business", "/blog", "/contact", "/privacy"];

  return [
    ...pages.map((p) => ({
      url: `${base}${p}`,
      lastModified: now,
      changeFrequency: (p === "/recruit" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: p === "" ? 1 : p === "/recruit" ? 0.9 : 0.7,
    })),
    ...getPublishedJobs().map((j) => ({
      url: `${base}/recruit/${j.slug}`,
      lastModified: j.updatedAt ? new Date(j.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getAllPosts().map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
