/**
 * Prefix paths to files in `/public` when the site is built with a GitHub Pages subpath
 * (`NEXT_PUBLIC_BASE_PATH`, same value as `GITHUB_PAGES_BASE_PATH` in CI).
 * `next/link` handles routes; `next/image` and plain URLs to public files need this.
 */
export function publicPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
  const p = path.startsWith("/") ? path : `/${path}`;
  if (!base) return p;
  const normalized = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${normalized}${p}`;
}
