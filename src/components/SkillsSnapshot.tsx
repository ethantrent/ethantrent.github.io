"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { TECH_ICON_MAP } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";
import { Code2 } from "lucide-react";

/**
 * Compact PM-framed skills bento: one card per category from `skills.ts`.
 */
export function SkillsSnapshot() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-14 md:py-16" aria-labelledby="skills-snapshot-heading">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">How I group my craft</p>
            <h2 id="skills-snapshot-heading" className="font-display mt-2 text-3xl font-bold text-fg md:text-4xl">
              PM · AI · Engineering · Cloud
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Strategist-first framing — not a flat logo strip. Full matrix on the skills page.
            </p>
          </div>
          <Link
            href="/skills/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-fg/15 bg-surface/70 px-5 py-2.5 text-sm font-semibold text-fg backdrop-blur transition hover:border-accent hover:text-accent"
          >
            Full skills matrix
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-2xl border border-fg/10 bg-surface/70 p-5 shadow-sm backdrop-blur-sm transition hover:border-accent/30"
            >
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-accent">{cat.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cat.items.slice(0, 8).map((item) => {
                  const Icon = TECH_ICON_MAP[item.iconKey] ?? Code2;
                  return (
                    <li
                      key={item.name}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium text-fg/90",
                        item.borderClass,
                      )}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
