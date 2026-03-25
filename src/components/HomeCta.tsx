"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Mail } from "lucide-react";

export function HomeCta() {
  const reduceMotion = useReducedMotion();
  const c = siteConfig.homeCta;

  return (
    <section className="border-y border-fg/10 bg-gradient-to-br from-accent/10 via-surface/50 to-accent-violet/5 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="font-display text-3xl font-bold text-fg md:text-4xl">{c.title}</h2>
          <p className="mt-4 text-pretty text-muted">{c.body}</p>
          <Link
            href="/contact/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent/30 transition hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet"
          >
            <Mail className="h-5 w-5" aria-hidden />
            {c.buttonLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
