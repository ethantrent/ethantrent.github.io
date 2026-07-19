"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Single human cue after impact — origin + path without putting a photo card in the hero.
 */
export function HumanCue() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-hairline py-8 md:py-10" aria-label="About Ethan in one line">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        >
          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
            <span className="font-medium text-fg">CS student → AI PM</span>
            {" · "}
            Digital PM at Schwab (Conversational AI), Cornell Tech × Break Through Tech AI Fellow — I ship
            ambiguous AI problems into trusted products.
          </p>
          <Link
            href="/about/"
            className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 text-sm font-medium text-accent transition duration-200 hover:underline"
          >
            Read my story
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
