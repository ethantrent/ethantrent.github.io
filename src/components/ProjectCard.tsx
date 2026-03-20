"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types";
import { projectCategoryChipClassName, projectTagChipClassName } from "@/lib/projectChips";
import { publicPath } from "@/lib/publicPath";
import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";

type Props = {
  project: Project;
  className?: string;
};

/**
 * Project tile: year badge, tags, bullets, mockup, external link.
 */
export function ProjectCard({ project, className }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-fg/10 bg-surface/80 shadow-sm backdrop-blur-sm transition hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/20">
        <Image
          src={publicPath(project.imageSrc)}
          alt={project.imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
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
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, ti) => (
            <span key={tag} className={projectTagChipClassName(ti)}>
              {tag}
            </span>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold tracking-tight text-fg">{project.name}</h2>

        <ul className="space-y-2 text-sm leading-relaxed text-muted">
          {project.description.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-2">
          <Link
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-fg/15 px-5 py-2.5 text-sm font-semibold text-fg transition group-hover:border-accent group-hover:text-accent"
          >
            {project.ctaLabel ?? "Visit"}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
