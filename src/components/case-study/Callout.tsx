"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  /** Small label, e.g. “Key insight”. */
  label?: string;
  children: ReactNode;
};

/**
 * Highlighted insight block for mid-case-study moments — cyan left-border accent.
 * Scroll reveal is intentional motion (1 key element), not decoration.
 */
export function Callout({ label = "Key insight", children }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="my-8 rounded-r-xl border-l-2 border-accent-cyan bg-surface py-5 pl-6 pr-5"
    >
      <p className="text-[13px] font-medium tracking-[0.03em] text-accent-cyan">{label}</p>
      <div className="mt-2 text-base font-medium leading-[1.75] text-fg-muted">{children}</div>
    </motion.aside>
  );
}
