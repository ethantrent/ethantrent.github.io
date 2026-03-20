"use client";

import { Code2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { SkillCategory } from "@/types";
import { cn } from "@/lib/utils";
import { TECH_ICON_MAP } from "@/lib/tech-icons";

type Props = {
  categories: SkillCategory[];
};

/**
 * Sugith-style icon chips grouped by category with springy scroll reveals.
 */
export function SkillsGrid({ categories }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-14">
      {categories.map((cat, ci) => (
        <section key={cat.title} aria-labelledby={`skill-cat-${ci}`}>
          <h2 id={`skill-cat-${ci}`} className="font-display text-xl font-bold text-fg">
            {cat.title}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {cat.items.map((item, ii) => {
              const Icon = TECH_ICON_MAP[item.iconKey] ?? Code2;
              return (
                <motion.div
                  key={item.name}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 8 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ type: "spring", stiffness: 380, damping: 22, delay: ii * 0.03 }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border bg-surface/70 px-4 py-2 text-sm font-medium text-fg shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent/10",
                    item.borderClass,
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
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
