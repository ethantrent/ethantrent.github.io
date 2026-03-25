"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types";
import { ProjectCardMedia } from "@/components/ProjectCardMedia";
import { ProjectHeading } from "@/components/ProjectHeading";
import { projectCategoryChipClassName, projectTagChipClassName } from "@/lib/projectChips";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Layers } from "lucide-react";

type Props = {
  project: Project;
  className?: string;
};

function teaserHref(project: Project) {
  if (project.href.startsWith("/")) return project.href;
  return "/projects/";
}

/**
 * Compact home teaser: links to case study or projects index.
 */
export function ProjectTeaserCard({ project, className }: Props) {
  const reduceMotion = useReducedMotion();
  const href = teaserHref(project);
  const metricLine = project.metrics?.slice(0, 2).join(" · ");

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className={cn("h-full", className)}
    >
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-fg/10 bg-surface/80 text-left shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={`${project.teaserCta ?? "View project"} — ${project.name}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface/60">
          <ProjectCardMedia
            imageSrc={project.imageSrc}
            imageAlt={project.imageAlt}
            sizes="(max-width:768px) 100vw, 33vw"
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
        <div className="flex flex-1 flex-col gap-3 p-5">
          {project.category && (
            <span className={cn("w-fit", projectCategoryChipClassName())}>
              <Layers className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              {project.category}
            </span>
          )}
          {metricLine ? (
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">{metricLine}</p>
          ) : null}
          <ProjectHeading
            project={project}
            as="h3"
            className="font-display text-xl font-bold tracking-tight text-fg group-hover:text-accent"
          />
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag, ti) => (
              <span key={tag} className={projectTagChipClassName(ti)}>
                {tag}
              </span>
            ))}
          </div>
          <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-accent">
            {project.teaserCta ?? "Project details →"}
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
