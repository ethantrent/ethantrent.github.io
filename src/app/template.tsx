"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Per-route enter animation (App Router `template` remounts on navigation).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.28 }}
    >
      {children}
    </motion.div>
  );
}
