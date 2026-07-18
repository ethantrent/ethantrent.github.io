import type { Metadata } from "next";
import Link from "next/link";
import { formatPostDate, readTimeMinutes, writingPosts } from "@/data/writing";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Writing",
  description: siteConfig.seoPages.writing,
  openGraph: { title: "Writing", description: siteConfig.seoPages.writing },
};

export default function WritingIndexPage() {
  const sorted = [...writingPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 md:py-28">
      <header>
        <p className="text-[13px] font-medium tracking-[0.03em] text-muted">Writing</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-fg md:text-5xl">
          Notes on AI PM craft
        </h1>
        <p className="mt-4 text-pretty text-muted">{siteConfig.pageIntros.writing}</p>
      </header>
      <ul className="mt-14 space-y-6">
        {sorted.map((post) => (
          <li
            key={post.slug}
            className="group rounded-xl border border-hairline bg-surface p-6 transition hover:border-hairline-strong hover:bg-surface-2 md:p-7"
          >
            <p className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
              <span>{formatPostDate(post.date)}</span>
              <span className="text-muted/50" aria-hidden>
                ·
              </span>
              <span>{readTimeMinutes(post)} min read</span>
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg">
              <Link href={`/writing/${post.slug}/`} className="transition group-hover:text-accent">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
            <Link
              href={`/writing/${post.slug}/`}
              className="mt-4 inline-flex text-sm font-medium text-accent transition hover:underline"
            >
              Read post →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
