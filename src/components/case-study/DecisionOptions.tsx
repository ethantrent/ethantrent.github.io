"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { eyebrow } from "@/lib/ui";

export type DecisionOption = {
  title: string;
  body: string;
  /** "chosen" | "rejected" | "parked" */
  status: "chosen" | "rejected" | "parked";
};

type Props = {
  intro?: string;
  options: readonly DecisionOption[];
  /** Closing line after the interactive cards. */
  closing?: string;
};

const STATUS_LABEL: Record<DecisionOption["status"], string> = {
  chosen: "Chosen",
  rejected: "Rejected",
  parked: "Parked",
};

/**
 * Progressive disclosure for “Options explored” — select a card to read tradeoffs.
 */
export function DecisionOptions({ intro, options, closing }: Props) {
  const reduceMotion = useReducedMotion();
  const defaultIndex = Math.max(
    0,
    options.findIndex((o) => o.status === "chosen"),
  );
  const [active, setActive] = useState(defaultIndex);
  const current = options[active];

  return (
    <div className="my-6 space-y-4">
      {intro ? <p>{intro}</p> : null}
      <p className={eyebrow}>Explore the tradeoffs</p>
      <div
        className="flex flex-col gap-2"
        role="tablist"
        aria-label="Options considered"
      >
        {options.map((option, i) => {
          const selected = i === active;
          return (
            <button
              key={option.title}
              type="button"
              role="tab"
              aria-selected={selected}
              id={`decision-tab-${i}`}
              aria-controls={`decision-panel-${i}`}
              onClick={() => setActive(i)}
              className={cn(
                "flex min-h-11 w-full cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-left transition duration-200",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                selected
                  ? "border-accent/50 bg-surface-2"
                  : "border-hairline bg-surface hover:border-hairline-strong hover:bg-surface-2",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide",
                  option.status === "chosen"
                    ? "bg-accent/15 text-accent"
                    : "bg-surface-3 text-muted",
                )}
              >
                {STATUS_LABEL[option.status]}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-fg">{option.title}</span>
                {selected ? null : (
                  <span className="mt-0.5 block text-xs text-muted line-clamp-1">
                    Tap to read the tradeoff
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {current ? (
          <motion.div
            key={current.title}
            role="tabpanel"
            id={`decision-panel-${active}`}
            aria-labelledby={`decision-tab-${active}`}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-xl border border-hairline bg-surface p-5 text-sm leading-relaxed text-muted"
          >
            <p className="font-medium text-fg">{current.title}</p>
            <p className="mt-2">{current.body}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {closing ? <p>{closing}</p> : null}
    </div>
  );
}
