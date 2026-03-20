"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const HIGHLIGHT_CLASS = [
  "text-keyword-orange font-semibold",
  "text-keyword-teal font-semibold",
  "text-accent-violet font-semibold",
] as const;

/**
 * Two-column manifesto between hero and lower home sections; inline keyword highlights.
 */
function renderBodyWithHighlights(body: string, words: readonly string[]): ReactNode {
  if (!words.length) return body;
  const parts: ReactNode[] = [];
  let remaining = body;
  let key = 0;
  words.forEach((word, wi) => {
    const idx = remaining.indexOf(word);
    if (idx === -1) return;
    if (idx > 0) {
      parts.push(<span key={`t-${key++}`}>{remaining.slice(0, idx)}</span>);
    }
    parts.push(
      <span key={`h-${key++}`} className={cn(HIGHLIGHT_CLASS[wi % HIGHLIGHT_CLASS.length])}>
        {word}
      </span>,
    );
    remaining = remaining.slice(idx + word.length);
  });
  if (remaining) parts.push(<span key={`t-${key++}`}>{remaining}</span>);
  return parts.length ? parts : body;
}

export function ManifestoBlock() {
  const reduceMotion = useReducedMotion();
  const m = siteConfig.manifesto;

  return (
    <section
      className="border-y border-fg/10 bg-surface/30 py-16 backdrop-blur-sm md:py-20"
      aria-labelledby="manifesto-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:gap-16 md:items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <h2 id="manifesto-heading" className="font-display text-3xl font-bold leading-tight text-fg sm:text-4xl md:text-5xl">
            {m.line1}
            <span className="block text-accent/90">{m.line2}</span>
          </h2>
        </motion.div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="space-y-6"
        >
          <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {renderBodyWithHighlights(m.body, m.highlightWords)}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-accent transition hover:text-accent-violet"
          >
            About Me
            <span aria-hidden className="text-lg">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
