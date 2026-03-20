"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types";
import { publicPath } from "@/lib/publicPath";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  className?: string;
};

/**
 * Compact home teaser: links to `/projects` (full grid + external links live there).
 */
export function ProjectTeaserCard({ project, className }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className={cn("h-full", className)}
    >
      <Link
        href="/projects"
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-fg/10 bg-surface/80 text-left shadow-sm backdrop-blur-sm transition hover:border-accent/35 hover:shadow-lg hover:shadow-accent/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={`View all projects — featuring ${project.name}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/20">
          <Image
            src={publicPath(project.imageSrc)}
            alt={project.imageAlt}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
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
            <span className="w-fit rounded-full border border-fg/15 bg-fg/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
              {project.category}
            </span>
          )}
          <h3 className="font-display text-xl font-bold tracking-tight text-fg group-hover:text-accent">
            {project.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="mt-auto pt-2 text-sm font-semibold text-accent">Open projects →</span>
        </div>
      </Link>
    </motion.div>
  );
}
