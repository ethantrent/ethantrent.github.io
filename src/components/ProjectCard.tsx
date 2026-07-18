"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types";
import { ProjectCardMedia } from "@/components/ProjectCardMedia";
import { ProjectHeading } from "@/components/ProjectHeading";
import { projectCategoryChipClassName } from "@/lib/projectChips";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";

type Props = {
  project: Project;
  className?: string;
};

/**
 * Case study tile: artifact/mockup media, problem statement, bold outcome, role, case study link.
 * Tech tags intentionally live inside the case study — cards lead with business context.
 */
export function ProjectCard({ project, className }: Props) {
  const reduceMotion = useReducedMotion();
  const primaryLabel = project.ctaLabel ?? "Read case study";

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35 }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-surface transition hover:border-hairline-strong",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-hairline bg-surface-2">
        <ProjectCardMedia
          imageSrc={project.imageSrc}
          imageAlt={project.imageAlt}
          artifactLabel={project.artifactLabel}
          sizes="(max-width:768px) 100vw, 50vw"
        />
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-white">
            Featured
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
          {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        {project.category && (
          <span className={cn("w-fit", projectCategoryChipClassName())}>
            <Layers className="h-4 w-4 shrink-0 text-muted" aria-hidden />
            {project.category}
          </span>
        )}

        <ProjectHeading
          project={project}
          as="h2"
          className="font-display text-2xl font-semibold tracking-tight text-fg"
        />

        <p className="text-sm leading-relaxed text-muted">{project.problem}</p>

        <p className="text-sm font-semibold leading-snug text-fg">{project.outcome}</p>

        <p className="text-xs font-medium text-muted">{project.role}</p>

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <Link href={project.href} className={buttonPrimary}>
            {primaryLabel}
            <span aria-hidden>→</span>
          </Link>
          {project.externalHref ? (
            <a
              href={project.externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonSecondary}
            >
              {project.externalCtaLabel ?? "Live demo"}
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
