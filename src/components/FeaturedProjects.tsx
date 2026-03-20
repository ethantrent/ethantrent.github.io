import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectTeaserCard } from "@/components/ProjectTeaserCard";
import { siteConfig } from "@/data/site";

/**
 * Home-page project teasers: featured first, three cards linking to `/projects`.
 */
export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  const list = featured.length ? featured : projects;
  const slice = list.slice(0, 3);

  return (
    <section id="projects" className="scroll-mt-28 py-14 md:py-16" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Selected work</p>
            <h2 id="projects-heading" className="font-display mt-2 text-3xl font-bold text-fg md:text-4xl">
              Projects
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">{siteConfig.pageIntros.featuredProjects}</p>
          </div>
          <Link
            href="/projects"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-fg/15 bg-surface/70 px-5 py-2.5 text-sm font-semibold text-fg backdrop-blur transition hover:border-accent hover:text-accent"
          >
            View all projects
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {slice.map((p) => (
            <ProjectTeaserCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
