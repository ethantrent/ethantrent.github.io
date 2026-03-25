"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { publicPath } from "@/lib/publicPath";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type EduEntry = {
  mark: string;
  dates: string;
  org: string;
  detail: string;
  /** Optional second paragraph (e.g. track / concentrations under a prospective line). */
  detailFollowUp?: string;
  logoSrc?: string;
  logoAlt?: string;
};

const EDU_ENTRIES: EduEntry[] = [
  {
    mark: "BYU–I",
    dates: "Sep 2023 – Jul 2026",
    org: "Brigham Young University–Idaho",
    detail: "B.S. Computer Science · Full Stack Web Development",
    logoSrc: "/byui-logo.jpg",
    logoAlt: "BYU–Idaho logo",
  },
  {
    mark: "CU",
    dates: "May – Aug 2026",
    org: "Cornell University",
    detail: "Machine Learning Certificate",
    logoSrc: "/Cornell_University_seal.svg.png",
    logoAlt: "Cornell University seal",
  },
  {
    mark: "CMU",
    dates: "Prospective · Fall 2030 – Spring 2032",
    org: "Carnegie Mellon University — Tepper School of Business",
    detail: "Accelerate Online Hybrid MBA.",
    detailFollowUp:
      "Targeting the Technology Strategy & Product Management track and concentrations in AI in Business, Business Technologies, Strategy, and Marketing.",
    logoSrc: "/tepper-logo.jpg",
    logoAlt: "Tepper School of Business logo",
  },
];

/**
 * About page: split hero, bio, education path.
 */
export function AboutSection() {
  const reduceMotion = useReducedMotion();
  const phil = siteConfig.aiPmPhilosophy;
  const t = siteConfig.testimonial;
  const showTestimonial = Boolean(t.quote?.trim());

  return (
    <div className="mx-auto max-w-6xl space-y-20 px-4 py-12 md:py-16">
      <section className="grid items-center gap-12 lg:grid-cols-2" aria-labelledby="about-intro">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">About</p>
          <h1 id="about-intro" className="font-display mt-3 text-4xl font-bold tracking-tight text-fg md:text-5xl">
            Product-minded builder at the intersection of AI, cloud, and delivery.
          </h1>
          <p className="mt-6 text-pretty text-base leading-relaxed text-muted">
            Growing up, technology pulled me from gaming rigs to building my own PC — then into how software shapes real
            decisions. Shifting from pre-med to CS, I traded studying the human body for systems that still fail the same
            way when the <span className="font-medium text-fg/90">feedback loop between user and product</span> breaks.
            That lens — outcomes, trust, iteration — is what I bring to AI PM work.
          </p>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
            I’m a Computer Science student at BYU–Idaho with hands-on experience across nonprofit and startup
            environments: modernizing financial audit infrastructure on AWS, utility billing and property management SaaS,
            standing up internal agentic AI programs, and prototyping a RAG-based campus support agent with clear
            escalation and evaluation criteria.
          </p>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
            I am an incoming Digital Product Manager on Charles Schwab’s Conversational AI team and an AI Fellow with
            Cornell Tech × Break Through Tech, building fluency in applied ML and product leadership.
          </p>

          <section className="mt-10 rounded-2xl border border-fg/10 bg-surface/50 p-6 backdrop-blur-sm" aria-labelledby="philosophy-heading">
            <h2 id="philosophy-heading" className="font-display text-lg font-bold text-fg">
              {phil.title}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
              {phil.paragraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </section>

          {showTestimonial ? (
            <figure className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6">
              <blockquote className="text-pretty text-base italic leading-relaxed text-fg/90">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-muted">
                <span className="font-semibold text-fg">{t.author}</span>
                {t.role ? <span className="block text-xs">{t.role}</span> : null}
              </figcaption>
            </figure>
          ) : null}

          <Link
            href="/contact/"
            className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25"
          >
            Work with me
          </Link>
        </div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-sm lg:mx-0 lg:justify-self-end"
        >
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-accent/30 to-accent-violet/25 blur-2xl" aria-hidden />
          <div
            className={cn(
              "relative rotate-[-2deg] rounded-2xl border-4 border-fg/10 bg-surface p-2 shadow-xl",
              "dark:border-fg/20",
            )}
          >
            <ProfileAvatar
              size={400}
              className="h-auto w-full max-w-sm rounded-lg border border-fg/10 object-cover"
            />
            <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-muted">Ethan Trent</p>
          </div>
        </motion.div>
      </section>

      <section aria-labelledby="edu-heading">
        <h2 id="edu-heading" className="font-display text-3xl font-bold text-fg">
          Education & Trajectory
        </h2>
        <div className="relative mt-10">
          <div
            className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-accent via-accent/50 to-accent-violet md:left-[19px]"
            aria-hidden
          />
          <ol className="space-y-0">
            {EDU_ENTRIES.map((e) => (
              <li
                key={e.org}
                className="relative border-b border-fg/10 py-6 pl-10 last:border-b-0 md:pl-14"
              >
                <span
                  className="absolute left-[9px] top-[2.35rem] flex h-3 w-3 rounded-full border-2 border-accent bg-bg shadow-[0_0_0_4px_var(--color-bg)] md:left-[13px] md:top-[2.5rem]"
                  aria-hidden
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                  <div
                    className={cn(
                      "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-fg/15 bg-surface/90 shadow-sm",
                      !e.logoSrc && "font-display text-xs font-bold text-accent",
                    )}
                    {...(e.logoSrc ? {} : { "aria-hidden": true })}
                  >
                    {e.logoSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element -- /public logos on static export
                      <img
                        src={publicPath(e.logoSrc)}
                        alt={e.logoAlt ?? ""}
                        className="h-full w-full object-contain p-1"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      e.mark
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{e.dates}</p>
                    <p className="mt-1 font-display text-lg font-bold text-fg">{e.org}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{e.detail}</p>
                    {e.detailFollowUp ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted">{e.detailFollowUp}</p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-6 text-sm text-muted">Currently based in Dallas, TX.</p>
      </section>
    </div>
  );
}
