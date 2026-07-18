"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types";
import { ProjectCardMedia } from "@/components/ProjectCardMedia";
import { ProjectHeading } from "@/components/ProjectHeading";
import { projectCategoryChipClassName } from "@/lib/projectChips";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Layers } from "lucide-react";

type Props = {
  project: Project;
  className?: string;
};

/**
 * Compact home teaser: problem → outcome → case study link (business context, no tag cloud).
 */
export function ProjectTeaserCard({ project, className }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35 }}
      className={cn("h-full", className)}
    >
      <Link
        href={project.href}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-surface text-left transition hover:border-hairline-strong hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={`${project.teaserCta ?? "Read case study"} — ${project.name}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-hairline bg-surface-2">
          <ProjectCardMedia
            imageSrc={project.imageSrc}
            imageAlt={project.imageAlt}
            artifactLabel={project.artifactLabel}
            sizes="(max-width:768px) 100vw, 33vw"
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
        <div className="flex flex-1 flex-col gap-3 p-5">
          {project.category && (
            <span className={cn("w-fit", projectCategoryChipClassName())}>
              <Layers className="h-4 w-4 shrink-0 text-muted" aria-hidden />
              {project.category}
            </span>
          )}
          <ProjectHeading
            project={project}
            as="h3"
            className="font-display text-xl font-semibold tracking-tight text-fg"
          />
          <p className="line-clamp-3 text-sm leading-relaxed text-muted">{project.problem}</p>
          <p className="text-sm font-semibold leading-snug text-fg">{project.outcome}</p>
          <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-accent">
            {project.teaserCta ?? "Read case study →"}
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
