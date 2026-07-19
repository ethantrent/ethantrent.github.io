"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/data/site";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";
import { cn } from "@/lib/utils";

const fieldClassName =
  "mt-2 w-full min-h-11 rounded-lg border border-hairline bg-surface px-4 py-2.5 text-sm text-fg placeholder:text-muted transition duration-200 focus:border-accent focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * Single-screen hire form; posts to Formspree when `NEXT_PUBLIC_FORMSPREE_FORM_ID` is set.
 * Direct lines aside stays a one-click escape hatch for busy recruiters.
 */
export function ContactForm() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
  const action = formId ? `https://formspree.io/f/${formId}` : "";
  const mailtoHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Portfolio inquiry")}`;

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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14 lg:items-start">
      <div>
        {!action && process.env.NODE_ENV === "development" ? (
          <p className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-fg">
            Dev only: set <code className="rounded bg-surface-2 px-1">NEXT_PUBLIC_FORMSPREE_FORM_ID</code> in{" "}
            <code className="rounded bg-surface-2 px-1">.env.local</code> for Formspree. Production builds omit
            this note.
          </p>
        ) : null}

        {status === "success" ? (
          <motion.div
            role="status"
            aria-live="polite"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-xl border border-hairline bg-surface px-6 py-8 md:px-8 md:py-10"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-available" aria-hidden />
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight text-fg">
                  Message sent
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Thanks — I usually reply within a few business days. Prefer not to wait on the form? Email me
                  directly or grab the resume from the side panel.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={mailtoHref} className={buttonPrimary}>
                    <Mail className="h-4 w-4" aria-hidden />
                    Email me
                  </a>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className={buttonSecondary}
                  >
                    Send another message
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <form
            action={action || undefined}
            method="POST"
            onSubmit={onSubmit}
            className="space-y-5"
            noValidate
          >
            <input type="hidden" name="_subject" value={`Portfolio inquiry from ${siteConfig.name}`} />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-[13px] font-medium text-fg-muted">
                  Name <span className="text-muted">(required)</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={fieldClassName}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[13px] font-medium text-fg-muted">
                  Email <span className="text-muted">(required)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={fieldClassName}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-[13px] font-medium text-fg-muted">
                Company <span className="text-muted">(optional)</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className={fieldClassName}
                placeholder="Company or team"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[13px] font-medium text-fg-muted">
                Message <span className="text-muted">(required)</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                autoComplete="off"
                className={cn(fieldClassName, "min-h-[8.5rem] resize-y py-3")}
                placeholder="Role, timeline, team size, or anything else that helps me respond."
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={status === "submitting"}
                className={cn(buttonPrimary, "disabled:cursor-not-allowed disabled:opacity-50")}
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
              <p className="text-xs text-muted">
                Or{" "}
                <a href={mailtoHref} className="cursor-pointer text-accent transition duration-200 hover:underline">
                  email me directly
                </a>
                .
              </p>
            </div>

            {status === "error" ? (
              <div
                role="alert"
                className="rounded-lg border border-red-500/35 bg-red-500/10 px-4 py-3 text-sm text-fg"
              >
                <p className="font-medium text-red-300">Couldn’t send the form.</p>
                <p className="mt-1 text-muted">
                  Please try again, or reach me at{" "}
                  <a href={mailtoHref} className="cursor-pointer font-medium text-accent hover:underline">
                    {siteConfig.email}
                  </a>
                  .
                </p>
              </div>
            ) : null}
          </form>
        )}
      </div>

      <aside
        className="h-fit space-y-6 border-t border-hairline pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8"
        aria-label="Contact details"
      >
        <h2 className="font-display text-lg font-semibold tracking-tight text-fg">Direct lines</h2>
        <p className="text-sm leading-relaxed text-muted">
          Prefer a quick path? Email, LinkedIn, or resume — no form required.
        </p>
        <div className="space-y-4 text-sm">
          <p>
            <span className="block text-[13px] font-medium text-muted">Email</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-1 inline-block cursor-pointer text-accent transition duration-200 hover:underline"
            >
              {siteConfig.email}
            </a>
          </p>
          <p>
            <span className="block text-[13px] font-medium text-muted">Location</span>
            <span className="mt-1 block text-fg-muted">{siteConfig.location}</span>
          </p>
          <p>
            <span className="block text-[13px] font-medium text-muted">Resume</span>
            <Link
              href={siteConfig.resumePath}
              className="mt-1 inline-block cursor-pointer text-accent transition duration-200 hover:underline"
              download
            >
              Download PDF
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[13px] font-medium text-muted">Social</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-hairline bg-surface px-4 text-sm font-medium text-fg-muted transition duration-200 hover:border-hairline-strong hover:bg-surface-2 hover:text-fg"
            >
              <FaLinkedin className="h-4 w-4 shrink-0" aria-hidden />
              LinkedIn
            </a>
            {siteConfig.social.github ? (
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-hairline bg-surface px-4 text-sm font-medium text-fg-muted transition duration-200 hover:border-hairline-strong hover:bg-surface-2 hover:text-fg"
              >
                <FaGithub className="h-4 w-4 shrink-0" aria-hidden />
                GitHub
              </a>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
