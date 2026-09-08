import type { Metadata } from "next";
import Link from "next/link";
import { writingPosts, formatPostDate } from "@/data/writing";
import { siteConfig } from "@/data/site";
export const metadata: Metadata = {
  title: "Notes",
  description: siteConfig.seoPages.writing,
  alternates: { canonical: "/writing/" },
  openGraph: { url: "/writing/", images: ["/og.png"] },
};
export default function NotesPage() {
  const posts = [...writingPosts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="shell pb-14">
      <header className="page-head">
        <h1 className="editorial-title">Notes</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          {siteConfig.pageIntros.writing}
        </p>
      </header>
      <div>
        {posts.map((post) => (
          <article
            key={post.slug}
            className="grid gap-4 border-t border-hairline py-7 md:grid-cols-[240px_minmax(0,1fr)]"
          >
            <time dateTime={post.date} className="text-sm text-muted">
              {formatPostDate(post.date)}
            </time>
            <div>
              <h2 className="text-2xl leading-snug">
                <Link
                  className="underline decoration-hairline-strong underline-offset-4 hover:text-accent"
                  href={`/writing/${post.slug}/`}
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
