import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatPostDate,
  getPostBySlug,
  readTimeMinutes,
  writingPosts,
} from "@/data/writing";
import { getProject } from "@/data/projects";
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
    alternates: { canonical: `/writing/${slug}/` },
    openGraph: {
      url: `/writing/${slug}/`,
      images: ["/og.png"],
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedDate,
    },
  };
}
export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const project = getProject(post.projectId);
  return (
    <article className="shell py-10 md:py-12">
      <div className="mx-auto max-w-[760px]">
        <Link href="/writing/" className="text-link">
          All notes
        </Link>
        <p className="eyebrow mt-8">
          {readTimeMinutes(post)} min read · Product notes
        </p>
        <h1 className="editorial-title mt-5">{post.title}</h1>
        <p className="mt-5 text-xl leading-relaxed text-muted">
          {post.excerpt}
        </p>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Originally published{" "}
          <time dateTime={post.date}>{formatPostDate(post.date)}</time> ·
          Revised{" "}
          <time dateTime={post.updatedDate}>
            {formatPostDate(post.updatedDate)}
          </time>
        </p>
        <div className="prose-copy mt-10 border-t border-hairline pt-10">
          {post.content.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <footer className="mt-12 border-t border-hairline pt-7">
          <p className="eyebrow">The related work</p>
          <Link href={project.href} className="text-link mt-3">
            Explore {project.name}
          </Link>
        </footer>
      </div>
    </article>
  );
}
