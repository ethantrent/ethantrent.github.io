"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { publicPath } from "@/lib/publicPath";
import { siteConfig } from "@/data/site";
import { buttonPrimary } from "@/lib/ui";
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
    detail: "B.S. Computer Science · Full Stack Web Development.",
    detailFollowUp:
      "Shipped while studying: the campus RAG chatbot prototype now in institutional beta for 20,000+ students, and the Coding Interviews club scaled 11 → 30+ members with a 40% internship rate.",
    logoSrc: "/byui-logo.jpg",
    logoAlt: "BYU–Idaho logo",
  },
  {
    mark: "CU",
    dates: "May – Aug 2026",
    org: "Cornell University",
    detail: "Machine Learning Certificate.",
    detailFollowUp:
      "Selected from 3,500+ applicants for the Break Through Tech AI fellowship; partnering with an industry company through AI Studio on a real-world ML challenge.",
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

/** PM operating principles — pulled from how the case studies were actually run. */
const WORK_PRINCIPLES = [
  {
    title: "I define “good” before designing fallbacks",
    body: "Evaluation criteria come before prompts or retrieval. If we can’t say what a successful output looks like, we’re not ready to automate the workflow — that ordering shaped both AuditAI and the campus chatbot.",
  },
  {
    title: "I align stakeholders on constraints before solutions",
    body: "On AuditAI, General Counsel’s release criteria were a design input, not a blocker. Agreeing on constraints first turns compliance reviews from a veto at the end into guardrails from the start.",
  },
  {
    title: "Metrics only count when the denominator is agreed",
    body: "The ~30% / ~50% AuditAI numbers hold up because audit leadership signed off on what we counted. I’d rather report a smaller, defensible number than a bigger one nobody trusts.",
  },
  {
    title: "Human handoff is product, not a failure mode",
    body: "Escalation paths get designed with the same care as the happy path. When confidence is low, handing off to a human should feel like the system working — because it is.",
  },
] as const;

/** Signals intellectual curiosity — real programs and areas of active study. */
const LEARNING_ITEMS = [
  {
    title: "Applied machine learning",
    body: "Cornell University Machine Learning Certificate (in progress) through the Break Through Tech AI fellowship — including a year-long industry AI Studio challenge.",
  },
  {
    title: "Agent evaluation & observability",
    body: "Golden sets, regression harnesses, and operator playbooks — the product surface around AI that AuditAI taught me to prioritize earlier.",
  },
  {
    title: "Conversational AI in regulated fintech",
    body: "Living it daily on Charles Schwab’s Conversational AI team: trust, disclosure, and escalation patterns when the user’s money is on the line.",
  },
  {
    title: "Product strategy at business scale",
    body: "Targeting Carnegie Mellon’s Tepper MBA (Technology Strategy & Product Management track) to pair shipped-product instincts with formal strategy training.",
  },
] as const;

/**
 * About page: PM philosophy opener, bio narrative, working principles, education path, current learning.
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
          <p className="text-[13px] font-medium tracking-[0.03em] text-muted">About</p>
          <h1 id="about-intro" className="font-display mt-3 text-4xl font-semibold tracking-tight text-fg md:text-5xl">
            Product-minded builder at the intersection of AI, cloud, and delivery.
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium leading-relaxed text-fg-muted">
            Great AI products are judged by their worst output, not their best demo. So I start where trust is decided:
            defining “good” before building, treating escalation as first-class behavior, and measuring only what domain
            owners agree to count. Shipping the model is easy — shipping confidence is the job.
          </p>
          <p className="mt-6 text-pretty text-base leading-relaxed text-muted">
            Growing up, technology pulled me from gaming rigs to building my own PC — then into how software shapes real
            decisions. Shifting from pre-med to CS, I traded studying the human body for systems that still fail the same
            way when the <span className="font-medium text-fg">feedback loop between user and product</span> breaks.
            That lens — outcomes, trust, iteration — is why I do product work rather than pure engineering.
          </p>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
            I’m a Computer Science student at BYU–Idaho with hands-on experience across nonprofit and startup
            environments: modernizing financial audit infrastructure on AWS, utility billing and property management SaaS,
            standing up internal agentic AI programs, and prototyping a RAG-based campus support agent with clear
            escalation and evaluation criteria.
          </p>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
            I am currently a Digital Product Manager on Charles Schwab’s Conversational AI team and an AI Fellow with
            Cornell Tech × Break Through Tech, building fluency in applied ML and product leadership.
          </p>

          <section className="mt-10 rounded-xl border border-hairline bg-surface p-6" aria-labelledby="philosophy-heading">
            <h2 id="philosophy-heading" className="font-display text-lg font-semibold text-fg">
              {phil.title}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
              {phil.paragraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </section>

          {showTestimonial ? (
            <figure className="mt-10 rounded-xl border border-hairline bg-surface p-6">
              <blockquote className="text-pretty text-base italic leading-relaxed text-fg-muted">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-muted">
                <span className="font-semibold text-fg">{t.author}</span>
                {t.role ? <span className="block text-xs">{t.role}</span> : null}
              </figcaption>
            </figure>
          ) : null}

          <Link href="/contact/" className={cn("mt-8", buttonPrimary)}>
            Work with me
          </Link>
        </div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-sm lg:mx-0 lg:justify-self-end"
        >
          <div className="relative rounded-xl border border-hairline bg-surface p-2">
            <ProfileAvatar
              size={400}
              className="h-auto w-full max-w-sm rounded-lg border border-hairline object-cover"
            />
            <p className="mt-2 text-center text-xs text-muted">Ethan Trent</p>
          </div>
        </motion.div>
      </section>

      <section aria-labelledby="how-i-work-heading">
        <h2 id="how-i-work-heading" className="font-display text-3xl font-semibold tracking-tight text-fg">
          How I work
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {WORK_PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-hairline bg-surface p-6 transition hover:border-hairline-strong"
            >
              <h3 className="font-display text-lg font-semibold text-fg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="edu-heading">
        <h2 id="edu-heading" className="font-display text-3xl font-semibold tracking-tight text-fg">
          Education & trajectory
        </h2>
        <div className="relative mt-10">
          <div
            className="absolute left-[15px] top-4 bottom-4 w-px bg-hairline-strong md:left-[19px]"
            aria-hidden
          />
          <ol className="space-y-0">
            {EDU_ENTRIES.map((e) => (
              <li
                key={e.org}
                className="relative border-b border-hairline py-6 pl-10 last:border-b-0 md:pl-14"
              >
                <span
                  className="absolute left-[9px] top-[2.35rem] flex h-3 w-3 rounded-full border-2 border-accent bg-bg shadow-[0_0_0_4px_var(--color-bg)] md:left-[13px] md:top-[2.5rem]"
                  aria-hidden
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                  <div
                    className={cn(
                      "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-hairline bg-surface-2",
                      !e.logoSrc && "font-display text-xs font-semibold text-fg-muted",
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
                    <p className="text-xs font-medium tracking-[0.03em] text-muted">{e.dates}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-fg">{e.org}</p>
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

      <section aria-labelledby="learning-heading">
        <h2 id="learning-heading" className="font-display text-3xl font-semibold tracking-tight text-fg">
          Currently learning & interested in
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {LEARNING_ITEMS.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-hairline bg-surface p-6 transition hover:border-hairline-strong"
            >
              <p className="font-display text-lg font-semibold text-fg">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
