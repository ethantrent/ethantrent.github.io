"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types";
import { ProjectCardMedia } from "@/components/ProjectCardMedia";
import { ProjectHeading } from "@/components/ProjectHeading";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type Props = {
  project: Project;
  className?: string;
  /** Full-width lead treatment on the home featured strip. */
  variant?: "default" | "lead";
};

/**
 * Compact home teaser: artifact first → problem → outcome → case study link.
 * Minimal chrome — no overlay Featured/year badges.
 */
export function ProjectTeaserCard({ project, className, variant = "default" }: Props) {
  const reduceMotion = useReducedMotion();
  const isLead = variant === "lead";

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("h-full", className)}
    >
      <Link
        href={project.href}
        className={cn(
          "group flex h-full cursor-pointer overflow-hidden rounded-xl border border-hairline bg-surface text-left transition duration-200",
          "hover:border-hairline-strong hover:bg-surface-2",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          isLead ? "flex-col md:flex-row md:items-stretch" : "flex-col",
        )}
        aria-label={`${project.teaserCta ?? "Read case study"} — ${project.name}`}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden border-hairline bg-surface-2",
            isLead
              ? "aspect-[16/10] border-b md:aspect-auto md:min-h-[17rem] md:w-[48%] md:shrink-0 md:border-b-0 md:border-r"
              : "aspect-[16/10] border-b",
          )}
        >
          <ProjectCardMedia
            imageSrc={project.imageSrc}
            imageAlt={project.imageAlt}
            artifactLabel={project.artifactLabel}
            sizes={
              isLead
                ? "(max-width:768px) 100vw, 48vw"
                : "(max-width:768px) 100vw, 33vw"
            }
          />
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col",
            isLead ? "gap-4 p-6 md:justify-center md:p-8 lg:p-10" : "gap-3 p-5",
          )}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
            {project.category ? <span>{project.category}</span> : null}
            {project.category && project.year ? (
              <span className="h-1 w-1 shrink-0 rounded-full bg-hairline-strong" aria-hidden />
            ) : null}
            {project.year ? <span>{project.year}</span> : null}
          </div>

          <ProjectHeading
            project={project}
            as="h3"
            className={cn(
              "font-display font-semibold tracking-tight text-fg",
              isLead ? "text-2xl md:text-[1.75rem]" : "text-xl",
            )}
          />

          <div className="space-y-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted">
                Problem
              </p>
              <p
                className={cn(
                  "mt-1 leading-relaxed text-muted",
                  isLead ? "text-sm md:line-clamp-none line-clamp-4" : "line-clamp-3 text-sm",
                )}
              >
                {project.problem}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted">
                Outcome
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-fg">{project.outcome}</p>
            </div>
          </div>

          <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-accent transition duration-200 group-hover:gap-1.5">
            {project.teaserCta ?? "Read case study →"}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
