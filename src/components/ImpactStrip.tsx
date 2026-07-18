"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { eyebrow } from "@/lib/ui";

/**
 * Homepage impact snapshot — quantified proof that continues the hero story.
 * No card chrome: one job (outcomes), hairline separators instead of a dashboard panel.
 */
export function ImpactStrip() {
  const reduceMotion = useReducedMotion();
  const stats = siteConfig.impactStats;

  return (
    <section
      id="impact"
      className="scroll-mt-28 border-t border-hairline px-4 pt-12 pb-14 md:pt-14 md:pb-16"
      aria-label="Impact snapshot"
    >
      <div className="mx-auto max-w-6xl">
        <p className={`${eyebrow} text-center`}>Impact snapshot</p>
        <ul className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-3 xl:grid-cols-5 xl:gap-x-6">
          {stats.map((item, i) => (
            <motion.li
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04, duration: 0.35, ease: "easeOut" }}
              className="text-center sm:text-left xl:text-center"
            >
              <p className="font-display text-3xl font-semibold tracking-tight text-accent md:text-[2rem]">
                {item.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-fg">{item.label}</p>
              <p className="mt-1 text-xs leading-snug text-muted">{item.context}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
