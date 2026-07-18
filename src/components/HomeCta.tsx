"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { buttonPrimary } from "@/lib/ui";
import { Mail } from "lucide-react";

export function HomeCta() {
  const reduceMotion = useReducedMotion();
  const c = siteConfig.homeCta;

  return (
    <section className="border-y border-hairline bg-surface py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">{c.title}</h2>
          <p className="mt-4 text-pretty text-muted">{c.body}</p>
          <Link href="/contact/" className={`mt-8 ${buttonPrimary}`}>
            <Mail className="h-4 w-4" aria-hidden />
            {c.buttonLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
