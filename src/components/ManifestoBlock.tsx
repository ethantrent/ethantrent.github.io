"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";

/**
 * Two-column manifesto between hero and lower home sections.
 * Keywords are emphasized with ink weight, not color.
 */
function renderBodyWithHighlights(body: string, words: readonly string[]): ReactNode {
  if (!words.length) return body;
  const parts: ReactNode[] = [];
  let remaining = body;
  let key = 0;
  words.forEach((word) => {
    const idx = remaining.indexOf(word);
    if (idx === -1) return;
    if (idx > 0) {
      parts.push(<span key={`t-${key++}`}>{remaining.slice(0, idx)}</span>);
    }
    parts.push(
      <span key={`h-${key++}`} className="font-medium text-fg">
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
      className="border-y border-hairline py-12 md:py-14"
      aria-labelledby="manifesto-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-start md:gap-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[13px] font-medium tracking-[0.03em] text-muted">How I work</p>
          <h2
            id="manifesto-heading"
            className="font-display mt-2 text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-fg sm:text-3xl"
          >
            {m.line1}
            <span className="block text-muted">{m.line2}</span>
          </h2>
        </motion.div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="space-y-4"
        >
          <p className="text-pretty text-base leading-relaxed text-muted">
            {renderBodyWithHighlights(m.body, m.highlightWords)}
          </p>
          <Link
            href="/about/"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:underline"
          >
            About me
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
