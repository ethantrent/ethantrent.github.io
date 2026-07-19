"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { publicPath } from "@/lib/publicPath";
import { cn } from "@/lib/utils";
import { eyebrow } from "@/lib/ui";

export type WalkthroughStep = {
  title: string;
  body: string;
};

type Props = {
  label: string;
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  steps: readonly WalkthroughStep[];
};

/**
 * Annotated step-through over a case-study artifact — stands in for a live demo.
 */
export function ArtifactWalkthrough({
  label,
  imageSrc,
  imageAlt,
  caption,
  steps,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const current = steps[step];
  const total = steps.length;

  const go = (next: number) => {
    if (next < 0 || next >= total) return;
    setStep(next);
  };

  return (
    <figure className="my-8">
      <p className={eyebrow}>{label}</p>
      <div className="mt-3 overflow-hidden rounded-xl border border-hairline bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element -- /public diagrams on static export */}
        <img
          src={publicPath(imageSrc)}
          alt={imageAlt}
          className="h-auto w-full object-contain"
          loading="lazy"
          decoding="async"
        />
        <div className="border-t border-hairline p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[13px] font-medium text-muted">
              Step {step + 1} of {total}
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => go(step - 1)}
                disabled={step === 0}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-muted transition duration-200 hover:bg-surface-2 hover:text-fg disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label="Previous step"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(step + 1)}
                disabled={step === total - 1}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-muted transition duration-200 hover:bg-surface-2 hover:text-fg disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label="Next step"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Walkthrough steps">
            {steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={i === step}
                onClick={() => setStep(i)}
                className={cn(
                  "min-h-8 cursor-pointer rounded-md px-2.5 text-[12px] font-medium transition duration-200",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  i === step
                    ? "bg-accent/15 text-accent"
                    : "bg-surface-2 text-muted hover:text-fg",
                )}
              >
                {i + 1}. {s.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={current.title}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="mt-4"
                role="tabpanel"
              >
                <p className="font-display text-base font-semibold text-fg">{current.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{current.body}</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-xs text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
