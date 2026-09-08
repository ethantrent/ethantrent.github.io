import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { writingPosts } from "@/data/writing";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const root = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ethantrent.github.io"
  ).replace(/\/$/, "");
  const routes = [
    "/",
    "/about/",
    "/projects/",
    "/writing/",
    "/experience/",
    "/skills/",
    "/contact/",
    ...projects.map((p) => p.href),
    ...writingPosts.map((p) => `/writing/${p.slug}/`),
  ];
  return routes.map((path) => ({ url: root + path }));
}
