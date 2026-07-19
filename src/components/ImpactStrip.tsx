"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { eyebrow } from "@/lib/ui";
import { cn } from "@/lib/utils";

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
        <p className={`${eyebrow} text-center md:text-left`}>Impact snapshot</p>
        <ul className="mt-10 grid grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {stats.map((item, i) => (
            <motion.li
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.35, ease: "easeOut" }}
              className={cn(
                "border-t border-hairline py-6 sm:border-t-0 sm:px-5 sm:py-0 xl:px-4",
                i > 0 && "sm:border-l sm:border-hairline",
                i === 0 && "sm:pl-0",
                "first:border-t-0 first:pt-0 sm:first:pt-0",
              )}
            >
              <p className="font-display text-3xl font-semibold tracking-tight text-accent tabular-nums md:text-[2.05rem]">
                {item.value}
              </p>
              <p className="mt-2.5 text-sm font-semibold leading-snug text-fg">{item.label}</p>
              <p className="mt-1.5 max-w-[16rem] text-xs leading-snug text-muted xl:max-w-none">
                {item.context}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
