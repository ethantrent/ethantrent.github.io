"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "name", label: "Step 01", question: "What's your name?", type: "text", name: "name", autoComplete: "name" },
  { id: "email", label: "Step 02", question: "What's your email?", type: "email", name: "email", autoComplete: "email" },
  { id: "company", label: "Step 03", question: "What company are you from?", type: "text", name: "company", autoComplete: "organization" },
  { id: "message", label: "Step 04", question: "What would you like to discuss?", type: "textarea", name: "message", autoComplete: "off" },
] as const;

type FormState = Record<string, string>;

/**
 * Conversational multi-step contact flow; posts to Formspree when `NEXT_PUBLIC_FORMSPREE_FORM_ID` is set.
 */
export function ContactForm() {
  const reduceMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormState>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
  const action = formId ? `https://formspree.io/f/${formId}` : "";

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  const canAdvance = (values[current.name] ?? "").trim().length > 0;

  const goNext = () => {
    if (!canAdvance) return;
    if (isLast) {
      formRef.current?.requestSubmit();
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!action) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch(action, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        setValues({});
        setStep(0);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div>
        {!action && (
          <p className="mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-fg">
            Set <code className="rounded bg-black/10 px-1 dark:bg-white/10">NEXT_PUBLIC_FORMSPREE_FORM_ID</code> in{" "}
            <code className="rounded bg-black/10 px-1 dark:bg-white/10">.env.local</code> to enable submissions. See{" "}
            <a href="https://formspree.io" className="font-semibold text-accent underline" target="_blank" rel="noreferrer">
              Formspree
            </a>
            .
          </p>
        )}

        <form ref={formRef} onSubmit={onSubmit} className="space-y-8" noValidate>
          <input type="hidden" name="_subject" value={`Portfolio inquiry from ${siteConfig.name}`} />
          {STEPS.map((s, i) => {
            if (i === step) return null;
            const val = values[s.name];
            if (!val) return null;
            return <input key={s.name} type="hidden" name={s.name} value={val} readOnly />;
          })}

          <div className="h-1 w-full overflow-hidden rounded-full bg-fg/10" aria-hidden>
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduceMotion ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">{current.label}</p>
              <label htmlFor={current.name} className="mt-2 block font-display text-2xl font-bold text-fg">
                {current.question}
              </label>
              {current.type === "textarea" ? (
                <textarea
                  id={current.name}
                  name={current.name}
                  required
                  rows={5}
                  value={values[current.name] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [current.name]: e.target.value }))}
                  className="mt-4 w-full rounded-2xl border border-fg/15 bg-surface/80 px-4 py-3 text-fg placeholder:text-muted focus:border-accent focus:outline-none"
                  placeholder="Role, timeline, team size, or anything else that helps me respond."
                  autoComplete={current.autoComplete}
                />
              ) : (
                <input
                  id={current.name}
                  name={current.name}
                  type={current.type}
                  required
                  value={values[current.name] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [current.name]: e.target.value }))}
                  className="mt-4 w-full rounded-2xl border border-fg/15 bg-surface/80 px-4 py-3 text-fg placeholder:text-muted focus:border-accent focus:outline-none"
                  placeholder="Your answer"
                  autoComplete={current.autoComplete}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap gap-3" aria-live="polite">
            {step > 0 && (
              <button
                type="button"
                onClick={goBack}
                className="rounded-full border border-fg/15 px-5 py-2.5 text-sm font-semibold text-fg hover:border-accent hover:text-accent"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={goNext}
              disabled={!canAdvance || status === "submitting"}
              className={cn(
                "rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              {isLast ? (status === "submitting" ? "Sending…" : "Submit") : "Continue"}
            </button>
          </div>

          {status === "success" && (
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Thanks — your message is on its way.</p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              Something went wrong. Double-check your Formspree ID or try again.
            </p>
          )}
        </form>
      </div>

      <aside className="h-fit space-y-6 rounded-2xl border border-fg/10 bg-surface/70 p-6 backdrop-blur" aria-label="Contact details">
        <h2 className="font-display text-lg font-bold text-fg">Direct lines</h2>
        <div className="space-y-3 text-sm text-muted">
          <p>
            <span className="block text-xs font-semibold uppercase tracking-wider text-fg/70">Email</span>
            <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
              {siteConfig.email}
            </a>
          </p>
          <p>
            <span className="block text-xs font-semibold uppercase tracking-wider text-fg/70">Location</span>
            {siteConfig.location}
          </p>
          <p>
            <span className="block text-xs font-semibold uppercase tracking-wider text-fg/70">Resume</span>
            <Link href={siteConfig.resumePath} className="text-accent hover:underline" download>
              Download PDF
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-fg/15 px-3 py-1.5 text-xs font-semibold hover:border-accent"
          >
            LinkedIn
          </a>
          {siteConfig.social.github ? (
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-fg/15 px-3 py-1.5 text-xs font-semibold hover:border-accent"
            >
              GitHub
            </a>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
