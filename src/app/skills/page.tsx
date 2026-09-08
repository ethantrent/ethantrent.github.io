import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { capabilities } from "@/data/capabilities";
export const metadata: Metadata = {
  openGraph: { url: "/skills/", images: ["/og.png"] },
  title: "Capabilities",
  description: siteConfig.seoPages.skills,
  alternates: { canonical: "/skills/" },
};
export default function SkillsPage() {
  return (
    <div className="shell pb-14">
      <header className="page-head">
        <h1 className="editorial-title mt-5">Capabilities</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          What I’ve worked on, with examples from the assistant and earlier projects.
        </p>
      </header>
      {capabilities.map((c) => (
        <section
          key={c.title}
          className="grid gap-5 border-t border-hairline py-9 md:grid-cols-[1fr_1.5fr]"
        >
          <div>
            <h2 className="font-display text-2xl">{c.title}</h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-relaxed text-fg-muted">
              {c.body}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{c.tools}</p>
            <Link href={c.href} className="text-link mt-4">
              {c.example}
            </Link>
            <div className="mt-5">
              <p className="eyebrow mb-3">Earlier work</p>
              <p className="text-sm leading-relaxed text-muted">{c.foundation}</p>
              <div className="mt-2 flex flex-wrap gap-x-6">
                {c.earlier.map((link) => <Link key={link.href} href={link.href} className="text-link">{link.label}</Link>)}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
