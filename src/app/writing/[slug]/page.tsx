import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getPostBySlug, readTimeMinutes, writingPosts } from "@/data/writing";
import { siteConfig } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return writingPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-24 md:py-28">
      <p className="text-[13px] font-medium tracking-[0.03em] text-muted">
        <Link href="/writing/" className="text-accent hover:underline">
          Writing
        </Link>
        <span className="mx-2 text-muted/50" aria-hidden>
          /
        </span>
        {formatPostDate(post.date)}
        <span className="mx-2 text-muted/50" aria-hidden>
          ·
        </span>
        {readTimeMinutes(post)} min read
      </p>
      <h1 className="font-display mt-4 text-4xl font-semibold leading-tight tracking-tight text-fg md:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
      <div className="mt-12 max-w-none space-y-6 text-base leading-[1.75] text-fg-muted">
        {post.content.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <footer className="mt-16 border-t border-hairline pt-10">
        <Link href="/writing/" className="text-sm font-medium text-accent hover:underline">
          ← All writing
        </Link>
      </footer>
    </article>
  );
}
