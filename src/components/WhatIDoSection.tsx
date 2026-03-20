"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cloud, Cpu, GitBranch, LineChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/data/site";

const TILES: { title: string; description: string; Icon: LucideIcon }[] = [
  {
    title: "AI Product Strategy",
    description: "Defining roadmaps, user stories, and success metrics.",
    Icon: LineChart,
  },
  {
    title: "Cloud & DevOps",
    description: "AWS, Terraform, Docker, and CI/CD pipelines.",
    Icon: Cloud,
  },
  {
    title: "Technical PM",
    description: "Bridging engineering teams and business stakeholders.",
    Icon: GitBranch,
  },
  {
    title: "Systems Thinking",
    description: "Legacy modernization, architecture, and scalability.",
    Icon: Cpu,
  },
];

/**
 * Four-tile “What I do” strip (Binil-style), separate from About numbered pillars.
 */
export function WhatIDoSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-20" aria-labelledby="what-i-do-heading">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">What I do</p>
        <h2 id="what-i-do-heading" className="font-display mt-2 text-3xl font-bold text-fg md:text-4xl">
          How I help teams ship
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">{siteConfig.pageIntros.whatIDo}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((tile, i) => (
            <motion.article
              key={tile.title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-2xl border border-fg/10 bg-surface/70 p-6 shadow-sm backdrop-blur transition hover:border-accent/30"
            >
              <tile.Icon className="h-8 w-8 text-accent" aria-hidden />
              <h3 className="mt-4 font-display text-lg font-semibold text-fg">{tile.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tile.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
