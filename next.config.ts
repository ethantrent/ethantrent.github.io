import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages — no Node server at runtime.
 * Project sites (`username.github.io/repo-name`) need a subpath: set `GITHUB_PAGES_BASE_PATH`
 * in CI (see `.github/workflows/deploy.yml`). User/org pages repo `username.github.io` uses root `/`.
 */
const raw = process.env.GITHUB_PAGES_BASE_PATH?.trim() ?? "";
const basePath = raw === "/" ? "" : raw;

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages serves /about/ from about/index.html, not from about.html at /about.
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
