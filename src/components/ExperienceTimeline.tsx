"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ExperienceEntry } from "@/types";
import { publicPath } from "@/lib/publicPath";
import { cn } from "@/lib/utils";

type Props = {
  entries: ExperienceEntry[];
};

/**
 * Vertical timeline with electric-blue spine and alternating cards (Sugith-inspired).
 * Each row expands for more detail.
 */
export function ExperienceTimeline({ entries }: Props) {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="relative mx-auto max-w-5xl px-2 md:px-0">
      <div
        className="absolute left-4 top-3 bottom-3 w-px bg-gradient-to-b from-accent via-accent/50 to-accent-violet md:left-1/2 md:-translate-x-px"
        aria-hidden
      />

      <ol className="space-y-14 md:space-y-20">
        {entries.map((entry, index) => {
          const isLeft = index % 2 === 0;
          const expanded = openId === entry.id;

          return (
            <li key={entry.id} className="relative md:grid md:grid-cols-2 md:gap-12">
              <div
                className={cn(
                  "md:col-span-1",
                  isLeft ? "md:col-start-1 md:justify-self-end md:pr-10" : "md:col-start-2 md:justify-self-start md:pl-10",
                )}
              >
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45 }}
                  className="ml-10 max-w-lg rounded-2xl border border-fg/10 bg-surface/80 p-6 text-left shadow-sm backdrop-blur md:ml-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-fg/10 bg-bg/50">
                      {entry.logoSrc ? (
                        <Image
                          src={publicPath(entry.logoSrc)}
                          alt={entry.logoAlt ?? `${entry.company} logo`}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center font-display text-lg font-bold text-accent">
                          {entry.company.slice(0, 1)}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                        {entry.dateRange}
                      </p>
                      <h3 className="font-display text-lg font-bold text-fg">{entry.role}</h3>
                      <p className="text-sm text-muted">{entry.company}</p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-fg/85">
                    {entry.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-violet" aria-hidden />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {entry.detail && (
                    <>
                      <button
                        type="button"
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent"
                        aria-expanded={expanded}
                        onClick={() => setOpenId(expanded ? null : entry.id)}
                      >
                        {expanded ? "Show less" : "More detail"}
                        <ChevronDown
                          className={cn("h-4 w-4 transition", expanded && "rotate-180")}
                          aria-hidden
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 text-sm leading-relaxed text-muted">{entry.detail}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </motion.div>
              </div>

              <span
                className="absolute left-4 top-10 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-bg shadow-[0_0_0_6px_rgba(59,130,246,0.15)] md:left-1/2 md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
                aria-hidden
              >
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
