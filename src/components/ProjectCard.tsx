"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types";
import { ProjectCardMedia } from "@/components/ProjectCardMedia";
import { ProjectHeading } from "@/components/ProjectHeading";
import { projectCategoryChipClassName, projectTagChipClassName } from "@/lib/projectChips";
import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";

type Props = {
  project: Project;
  className?: string;
};

function isInternalHref(href: string) {
  return href.startsWith("/");
}

/**
 * Project tile: year badge, tags, bullets, mockup, external link.
 */
export function ProjectCard({ project, className }: Props) {
  const reduceMotion = useReducedMotion();
  const primaryInternal = isInternalHref(project.href);
  const primaryLabel = project.ctaLabel ?? (primaryInternal ? "View details" : "Visit");

  const linkClassName =
    "inline-flex rounded-full border border-fg/15 px-5 py-2.5 text-sm font-semibold text-fg transition group-hover:border-accent group-hover:text-accent";

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-fg/10 bg-surface/80 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface/60">
        <ProjectCardMedia
          imageSrc={project.imageSrc}
          imageAlt={project.imageAlt}
          sizes="(max-width:768px) 100vw, 50vw"
        />
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow">
            Featured
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        {project.category && (
          <span className={cn("w-fit", projectCategoryChipClassName())}>
            <Layers className="h-4 w-4 shrink-0 text-accent" aria-hidden />
            {project.category}
          </span>
        )}
        {project.metrics && project.metrics.length > 0 ? (
          <p className="text-xs font-medium uppercase tracking-wider text-accent">
            {project.metrics.slice(0, 3).join(" · ")}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, ti) => (
            <span key={tag} className={projectTagChipClassName(ti)}>
              {tag}
            </span>
          ))}
        </div>

        <ProjectHeading
          project={project}
          as="h2"
          className="font-display text-2xl font-bold tracking-tight text-fg"
        />

        <ul className="space-y-2 text-sm leading-relaxed text-muted">
          {project.description.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {primaryInternal ? (
            <Link href={project.href} className={linkClassName}>
              {primaryLabel}
            </Link>
          ) : (
            <a href={project.href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
              {primaryLabel}
            </a>
          )}
          {project.externalHref ? (
            <a
              href={project.externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {project.externalCtaLabel ?? "Live demo"}
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
