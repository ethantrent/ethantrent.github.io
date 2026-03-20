"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ProfileAvatar } from "@/components/ProfileAvatar";

const PILLARS = [
  {
    n: "01",
    title: "Ship on real infrastructure",
    body:
      "I’ve led AWS migrations (EC2 → ECS Fargate), built internal AI programs (LangChain, OpenAI, RAG), and delivered production features in TypeScript and Python — not just prototypes.",
  },
  {
    n: "02",
    title: "Own the product arc",
    body:
      "From roadmaps and PRDs to stakeholder alignment and user research, I treat delivery as a product problem: clear narrative, measurable outcomes, and tight loops with engineering.",
  },
  {
    n: "03",
    title: "Scale impact with AI",
    body:
      "Whether it’s a campus-wide support agent for 20,000+ students or conversational AI at a global financial firm, I focus on responsible, user-centered AI that teams can trust and adopt.",
  },
] as const;

const EDU_ENTRIES = [
  {
    mark: "BYU–I",
    dates: "Sep 2023 – Jul 2026",
    org: "Brigham Young University–Idaho",
    detail: "B.S. Computer Science · Full Stack Web & App Development certificate",
  },
  {
    mark: "CU",
    dates: "May – Aug 2026",
    org: "Cornell University",
    detail: "Machine Learning certificate (remote)",
  },
  {
    mark: "CMU",
    dates: "Prospective · Fall 2030 – Spring 2032",
    org: "Carnegie Mellon University — Tepper School of Business",
    detail:
      "Prospective Accelerate Online Hybrid MBA (Consortium / R1 path). Targeting the Technology Strategy & Product Management track and concentrations in AI in Business, Business Technologies, Strategy, and Marketing — aligned with AI product management.",
  },
] as const;

/**
 * About page: split hero, bio, numbered pillars, education path.
 */
export function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-6xl space-y-20 px-4 py-12 md:py-16">
      <section className="grid items-center gap-12 lg:grid-cols-2" aria-labelledby="about-intro">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">About</p>
          <h1 id="about-intro" className="font-display mt-3 text-4xl font-bold tracking-tight text-fg md:text-5xl">
            Product-minded builder at the intersection of AI, cloud, and delivery.
          </h1>
          <p className="mt-6 text-pretty text-base leading-relaxed text-muted">
            I’m a Computer Science student at BYU–Idaho with hands-on experience across nonprofit and startup
            environments ranging from modernizing financial audit infrastructure on AWS, utility billing and property management SaaS, to standing up internal AI tooling and
            prototyping a RAG-based campus support agent.
          </p>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
            I am an incoming Digital Product Manager on Charles Schwab’s Conversational AI team and an AI Fellow with
            Cornell Tech × Break Through Tech, building fluency in applied ML and product leadership.
          </p>
          <Link
            href="/contact"
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
          <ProfileAvatar
            size={400}
            className="relative h-auto w-full max-w-sm rounded-3xl border border-fg/10 object-cover"
          />
        </motion.div>
      </section>

      <section aria-labelledby="pillars-heading">
        <h2 id="pillars-heading" className="font-display text-3xl font-bold text-fg">
          What I bring to the table
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Engineering depth, product judgment, and a bias for shipping, especially where AI meets real users and real
          systems.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.n}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-fg/10 bg-surface/70 p-6 backdrop-blur"
            >
              <p className="font-display text-4xl font-bold text-accent/90">{p.n}</p>
              <h3 className="mt-4 font-display text-lg font-semibold text-fg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section aria-labelledby="edu-heading">
        <h2 id="edu-heading" className="font-display text-3xl font-bold text-fg">
          Education & trajectory
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
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-fg/15 bg-surface/90 font-display text-xs font-bold text-accent shadow-sm"
                  aria-hidden
                >
                  {e.mark}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{e.dates}</p>
                  <p className="mt-1 font-display text-lg font-bold text-fg">{e.org}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{e.detail}</p>
                </div>
              </div>
            </li>
          ))}
          </ol>
        </div>
        <p className="mt-6 text-sm text-muted">
          Currently based in Dallas, TX.
        </p>
      </section>
    </div>
  );
}
