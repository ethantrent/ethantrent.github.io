"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";

/**
 * Homepage proof row — metrics from site config.
 */
export function ImpactStrip() {
  const reduceMotion = useReducedMotion();
  const stats = siteConfig.impactStats;

  return (
    <section
      className="border-y border-fg/10 bg-surface/40 py-10 backdrop-blur-sm"
      aria-label="Impact and scale"
    >
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">By the numbers</p>
        <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {stats.map((item, i) => (
            <motion.li
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="text-center"
            >
              <p className="font-display text-2xl font-bold text-accent sm:text-3xl">{item.value}</p>
              <p className="mt-1 text-xs leading-snug text-muted">{item.label}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
