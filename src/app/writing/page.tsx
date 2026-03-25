import type { Metadata } from "next";
import Link from "next/link";
import { writingPosts } from "@/data/writing";
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
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Writing</p>
        <h1 className="font-display mt-3 text-4xl font-bold text-fg md:text-5xl">Notes on AI PM craft</h1>
        <p className="mt-4 text-pretty text-muted">{siteConfig.pageIntros.writing}</p>
      </header>
      <ul className="mt-14 space-y-10">
        {sorted.map((post) => (
          <li key={post.slug} className="border-b border-fg/10 pb-10 last:border-b-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">{post.date}</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-fg">
              <Link href={`/writing/${post.slug}/`} className="transition hover:text-accent">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
            <Link
              href={`/writing/${post.slug}/`}
              className="mt-4 inline-flex text-sm font-semibold text-accent transition hover:text-accent-violet"
            >
              Read post →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
