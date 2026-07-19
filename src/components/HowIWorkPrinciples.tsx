"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { workPrinciples } from "@/data/workPrinciples";
import { cn } from "@/lib/utils";
import { eyebrow } from "@/lib/ui";

/**
 * Interactive principles strip on home — expand one principle → linked case study.
 * Sits under the manifesto so recruiters get “how I work” without opening About.
 */
export function HowIWorkPrinciples() {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(workPrinciples[0]?.id ?? null);

  return (
    <section className="pb-12 md:pb-14" aria-labelledby="principles-heading">
      <div className="mx-auto max-w-6xl px-4">
        <p className={eyebrow}>Operating principles</p>
        <h2
          id="principles-heading"
          className="font-display mt-2 text-xl font-semibold tracking-tight text-fg sm:text-2xl"
        >
          How I actually run product work
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Tap a principle to see the case study that forced it — not a generic values list.
        </p>

        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {workPrinciples.map((principle) => {
            const isOpen = openId === principle.id;
            return (
              <li
                key={principle.id}
                className={cn(
                  "rounded-xl border transition duration-200",
                  isOpen
                    ? "border-accent/40 bg-surface-2"
                    : "border-hairline bg-surface hover:border-hairline-strong",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : principle.id)}
                  aria-expanded={isOpen}
                  className="flex min-h-11 w-full cursor-pointer flex-col px-4 py-3.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="font-display text-sm font-semibold text-fg sm:text-base">
                    {principle.title}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-hairline px-4 pb-4 pt-3">
                        <p className="text-sm leading-relaxed text-muted">{principle.body}</p>
                        <Link
                          href={principle.caseHref}
                          className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent transition hover:underline"
                        >
                          See it in {principle.caseLabel}
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
