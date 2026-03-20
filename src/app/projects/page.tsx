import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: siteConfig.seoPages.projects,
  openGraph: { title: "Projects", description: siteConfig.seoPages.projects },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 md:py-28">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Projects</p>
        <h1 className="font-display mt-3 text-4xl font-bold text-fg md:text-5xl">Shipped & in flight</h1>
        <p className="mt-4 text-pretty text-muted">{siteConfig.pageIntros.projects}</p>
      </header>
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
