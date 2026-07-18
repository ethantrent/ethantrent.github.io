"use client";

import { Code2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { SkillCategory } from "@/types";
import { TECH_ICON_MAP } from "@/lib/tech-icons";

type Props = {
  categories: SkillCategory[];
};

/**
 * Neutral icon chips grouped by category with subtle scroll reveals.
 */
export function SkillsGrid({ categories }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-14">
      {categories.map((cat, ci) => (
        <section key={cat.title} aria-labelledby={`skill-cat-${ci}`}>
          <h2 id={`skill-cat-${ci}`} className="font-display text-xl font-semibold tracking-tight text-fg">
            {cat.title}
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {cat.items.map((item, ii) => {
              const Icon = TECH_ICON_MAP[item.iconKey] ?? Code2;
              return (
                <motion.div
                  key={item.name}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3, delay: ii * 0.02 }}
                  className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface-2 px-3 py-1.5 text-sm font-medium text-fg-muted transition hover:border-hairline-strong"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted" aria-hidden />
                  <span>{item.name}</span>
                </motion.div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
