import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { skillCategories } from "@/data/skills";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Skills",
  description: siteConfig.seoPages.skills,
  openGraph: { title: "Skills", description: siteConfig.seoPages.skills },
};

const SkillsGrid = dynamic(
  () => import("@/components/SkillsGrid").then((m) => ({ default: m.SkillsGrid })),
  {
    ssr: true,
    loading: () => (
      <div className="py-12 text-center text-sm text-muted" aria-busy="true">
        Loading skills…
      </div>
    ),
  },
);

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 md:py-28">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Skills & tools</p>
        <h1 className="font-display mt-3 text-4xl font-bold text-fg md:text-5xl">Stack I ship with</h1>
        <p className="mt-4 text-pretty text-muted">{siteConfig.pageIntros.skills}</p>
      </header>
      <div className="mt-14">
        <SkillsGrid categories={skillCategories} />
      </div>
    </div>
  );
}
