"use client";

import { motion, useReducedMotion } from "framer-motion";
import { publicPath } from "@/lib/publicPath";

const ORGS = [
  {
    name: "Charles Schwab",
    src: "/charles-schwab-corporation-logo.svg.png",
  },
  {
    name: "Cornell University",
    src: "/Cornell_University_seal.svg.png",
  },
  {
    name: "Break Through Tech",
    src: "/break_through_tech_logo.jpg",
  },
  {
    name: "ICS / Global Nonprofit",
    src: "/1200x675size-English-square.jpg",
  },
  {
    name: "BYU–Idaho",
    src: "/byui-logo.jpg",
  },
] as const;

/**
 * Muted org marks — trust strip for hiring managers (monochrome treatment).
 */
export function CredentialsStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-y border-hairline py-12" aria-label="Organizations">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-[13px] font-medium tracking-[0.03em] text-muted">
          Trusted in regulated and institutional environments
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {ORGS.map((org, i) => (
            <motion.li
              key={org.name}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="flex h-12 w-28 items-center justify-center opacity-60 grayscale transition hover:opacity-90 hover:grayscale-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- /public logos on static export */}
              <img
                src={publicPath(org.src)}
                alt={org.name}
                className="max-h-10 max-w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
