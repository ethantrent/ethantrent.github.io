"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { TECH_ICON_MAP } from "@/lib/tech-icons";
import { buttonSecondary } from "@/lib/ui";
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
            <p className="text-[13px] font-medium tracking-[0.03em] text-muted">How I group my craft</p>
            <h2
              id="skills-snapshot-heading"
              className="font-display mt-2 text-3xl font-semibold tracking-tight text-fg md:text-4xl"
            >
              PM · AI · Engineering · Cloud
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Strategist-first framing — not a flat logo strip. Full matrix on the skills page.
            </p>
          </div>
          <Link href="/skills/" className={cn("w-fit", buttonSecondary)}>
            Full skills matrix
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="rounded-xl border border-hairline bg-surface p-5 transition hover:border-hairline-strong"
            >
              <h3 className="font-display text-sm font-semibold text-fg">{cat.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cat.items.slice(0, 8).map((item) => {
                  const Icon = TECH_ICON_MAP[item.iconKey] ?? Code2;
                  return (
                    <li
                      key={item.name}
                      className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-medium text-fg-muted"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-muted" aria-hidden />
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
