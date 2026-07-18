"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";

/**
 * Homepage impact snapshot — big number → bold so-what label → italic context.
 * Carries `id="impact"` so nav/hero anchors can jump straight to it.
 */
export function ImpactStrip() {
  const reduceMotion = useReducedMotion();
  const stats = siteConfig.impactStats;

  return (
    <section
      id="impact"
      className="scroll-mt-28 px-4 pt-6 pb-12 md:pt-8 md:pb-14"
      aria-label="Impact snapshot"
    >
      <div className="mx-auto max-w-6xl rounded-xl border border-hairline bg-surface px-6 py-10">
        <p className="text-center text-[13px] font-medium tracking-[0.03em] text-muted">
          Impact snapshot
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {stats.map((item, i) => (
            <motion.li
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="text-center"
            >
              <p className="font-display text-3xl font-semibold tracking-tight text-accent">{item.value}</p>
              <p className="mt-1.5 text-sm font-semibold text-fg">{item.label}</p>
              <p className="mt-0.5 text-xs italic leading-snug text-muted">{item.context}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
