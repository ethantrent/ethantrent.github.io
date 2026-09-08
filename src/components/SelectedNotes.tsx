import Link from "next/link";
import { writingPosts, formatPostDate } from "@/data/writing";
export function SelectedNotes() {
  return (
    <section
      className="shell border-t border-hairline py-10"
      aria-labelledby="notes-heading"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <h2 id="notes-heading" className="text-2xl font-medium">
          Notes
        </h2>
        <Link href="/writing/" className="text-link">
          All notes
        </Link>
      </div>
      <div className="mt-5">
        {writingPosts.slice(0, 2).map((post) => (
          <article
            key={post.slug}
            className="grid gap-2 py-4 md:grid-cols-[200px_1fr]"
          >
            <time className="text-sm text-muted" dateTime={post.date}>
              {formatPostDate(post.date)}
            </time>
            <h3 className="text-lg">
              <Link
                href={`/writing/${post.slug}/`}
                className="underline decoration-hairline-strong underline-offset-4 hover:text-accent"
              >
                {post.title}
              </Link>
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}
