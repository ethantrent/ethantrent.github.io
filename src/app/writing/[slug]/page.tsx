import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, writingPosts } from "@/data/writing";
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
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
        <Link href="/writing/" className="text-accent hover:underline">
          Writing
        </Link>
        <span className="mx-2 text-fg/25" aria-hidden>
          /
        </span>
        {post.date}
      </p>
      <h1 className="font-display mt-4 text-4xl font-bold leading-tight text-fg md:text-5xl">{post.title}</h1>
      <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
      <div className="prose prose-invert mt-12 max-w-none space-y-6 text-base leading-relaxed text-fg/90">
        {post.content.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <footer className="mt-16 border-t border-fg/10 pt-10">
        <Link href="/writing/" className="text-sm font-semibold text-accent hover:underline">
          ← All writing
        </Link>
      </footer>
    </article>
  );
}
