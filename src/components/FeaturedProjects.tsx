import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectTeaserCard } from "@/components/ProjectTeaserCard";
import { siteConfig } from "@/data/site";
import { buttonSecondary } from "@/lib/ui";
import { cn } from "@/lib/utils";

/**
 * Home case studies: AuditAI as full-width lead, remaining featured as a pair below.
 * Visuals-first cards — problem → outcome hierarchy, minimal badge chrome.
 */
export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  const list = featured.length ? featured : projects;
  const [lead, ...rest] = list.slice(0, 3);

  if (!lead) return null;

  return (
    <section id="projects" className="scroll-mt-28 py-14 md:py-16" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[13px] font-medium tracking-[0.03em] text-muted">Selected work</p>
            <h2
              id="projects-heading"
              className="font-display mt-2 text-3xl font-semibold tracking-tight text-fg md:text-4xl"
            >
              Case studies
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">{siteConfig.pageIntros.featuredProjects}</p>
          </div>
          <Link href="/projects/" className={cn("w-fit", buttonSecondary)}>
            View all case studies
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 space-y-6 md:space-y-8">
          <ProjectTeaserCard project={lead} variant="lead" />
          {rest.length > 0 ? (
            <div
              className={cn(
                "grid gap-6 md:gap-8",
                rest.length === 1 ? "md:mx-auto md:max-w-xl" : "md:grid-cols-2",
              )}
            >
              {rest.map((p) => (
                <ProjectTeaserCard key={p.id} project={p} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
