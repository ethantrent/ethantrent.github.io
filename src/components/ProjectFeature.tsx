import Link from "next/link";
import Image from "next/image";
import { ProjectHeading } from "@/components/ProjectHeading";
import type { Project } from "@/types";
import { publicPath } from "@/lib/publicPath";

/** The available material determines the layout; an internal project need not have a thumbnail. */
export function ProjectFeature({
  project,
  heading = "h3",
  links,
}: {
  project: Project;
  heading?: "h2" | "h3";
  links?: readonly { label: string; href: string }[];
}) {
  const media = project.presentation;
  return (
    <article
      className="border-t border-hairline py-8 md:py-10"
      data-project={project.id}
    >
      <div className="grid gap-6 md:grid-cols-[.8fr_1.2fr] md:grid-rows-[min-content_1fr] md:gap-x-12 md:gap-y-3">
        <div>
          <p className="text-sm text-muted">
            {project.category} · {project.year}
          </p>
          <div className="mt-3 flex items-center gap-4">
            {media.kind === "logo" ? (
              <Image
                src={publicPath(media.src)}
                alt={media.alt}
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            ) : null}
            <Link href={project.href} className="hover:text-accent">
              <ProjectHeading
                project={project}
                as={heading}
                className="font-display text-2xl leading-snug md:text-[30px]"
              />
            </Link>
          </div>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-fg-muted">
            {project.problem}
          </p>
        </div>
        <div className="flex flex-col md:col-start-2 md:row-span-2 md:row-start-1">
          <div data-contribution>
            <p className="eyebrow mb-2">My contribution</p>
            <p className="text-base leading-relaxed text-fg">
              {project.contribution}
            </p>
          </div>
          {media.kind === "screenshot" ? (
            <figure className="mt-6 md:order-first md:mb-6 md:mt-0">
              <Link
                href={project.href}
                className="project-visual block"
                aria-label={`View ${project.name} case study`}
              >
                <Image
                  src={publicPath(media.src)}
                  alt={media.alt}
                  loading="eager"
                  width={960}
                  height={540}
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-contain"
                />
              </Link>
              <figcaption className="mt-3 text-sm leading-relaxed text-muted">
                {media.caption}
              </figcaption>
            </figure>
          ) : null}
          <div className="mt-4" data-outcome>
            <p className="eyebrow mb-2">Outcome</p>
            <p className="text-base leading-relaxed text-muted">
              {project.outcome}
            </p>
          </div>
        </div>
        <div
          className="flex flex-wrap gap-x-6 self-start md:col-start-1 md:row-start-2"
          data-project-links
        >
          {links ? links.map((link) => (
            <Link key={link.href} href={link.href} className="text-link">
              {link.label}
            </Link>
          )) : (
            <Link href={project.href} className="text-link">
              Read the case study
            </Link>
          )}
          {media.kind === "logo" && project.externalHref ? (
            <a href={project.externalHref} className="text-link">
              {project.externalCtaLabel}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
