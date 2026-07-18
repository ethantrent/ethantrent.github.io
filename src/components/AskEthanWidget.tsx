"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";

/**
 * Floating “Ask Ethan” assistant.
 * Always shows the FAB. When `NEXT_PUBLIC_ASK_ETHAN_API_URL` is set, chats via API;
 * otherwise shows visitor-facing contact alternatives (never env setup copy).
 */
export function AskEthanWidget() {
  const apiUrl = process.env.NEXT_PUBLIC_ASK_ETHAN_API_URL?.replace(/\/$/, "") ?? "";
  return <AskEthanShell apiUrl={apiUrl} />;
}

function AskEthanShell({ apiUrl }: { apiUrl: string }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [lastQuestion, setLastQuestion] = useState<string | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const hasApi = Boolean(apiUrl);

  const send = useCallback(async () => {
    const q = message.trim();
    if (!q || !apiUrl) return;
    setLastQuestion(q);
    setStatus("loading");
    setReply(null);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = (await res.json().catch(() => null)) as { reply?: string } | null;
      if (!res.ok) throw new Error("bad_status");
      setReply(typeof data?.reply === "string" ? data.reply : "Thanks — I’ll get back with a richer answer soon.");
      setStatus("idle");
    } catch {
      setStatus("error");
      setReply("Couldn’t reach the assistant right now. Try email or LinkedIn instead.");
    }
  }, [apiUrl, message]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-white transition hover:bg-accent/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:bottom-8 md:right-8"
        aria-label="Open Ask Ethan assistant"
      >
        <MessageCircle className="h-6 w-6" aria-hidden />
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 md:bg-black/30"
              aria-label="Close assistant overlay"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Ask Ethan"
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="fixed bottom-24 right-4 z-[70] flex w-[min(100vw-2rem,400px)] flex-col overflow-hidden rounded-xl border border-hairline bg-surface shadow-2xl md:right-8"
            >
              <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
                <div>
                  <p className="font-display text-sm font-semibold text-fg">Ask Ethan</p>
                  <p className="text-xs text-muted">AI PM · portfolio assistant</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-fg"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <div className="max-h-[min(50vh,320px)] space-y-3 overflow-y-auto px-4 py-3 text-sm">
                {!hasApi ? (
                  <div className="space-y-3 text-muted">
                    <p>Chat is unavailable right now — email or LinkedIn instead.</p>
                    <p className="flex flex-wrap gap-x-3 gap-y-1">
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="font-medium text-accent hover:underline"
                      >
                        {siteConfig.email}
                      </a>
                      <a
                        href={siteConfig.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-accent hover:underline"
                      >
                        LinkedIn
                      </a>
                      <Link href="/contact/" className="font-medium text-accent hover:underline">
                        Contact form
                      </Link>
                    </p>
                  </div>
                ) : (
                  <>
                    {!lastQuestion && status === "idle" && !reply ? (
                      <p className="text-muted">
                        Ask about my PM experience, AI programs, or how I work with stakeholders.
                      </p>
                    ) : null}
                    {lastQuestion ? (
                      <div>
                        <p className="text-[11px] font-medium tracking-[0.04em] text-muted">You</p>
                        <p className="mt-1 text-fg-muted">{lastQuestion}</p>
                      </div>
                    ) : null}
                    {status === "loading" ? (
                      <div
                        className="flex items-center gap-2 text-muted"
                        role="status"
                        aria-live="polite"
                        aria-label="Thinking"
                      >
                        <span className="flex gap-1" aria-hidden>
                          <span
                            className={
                              reduceMotion
                                ? "h-1.5 w-1.5 rounded-full bg-accent-cyan"
                                : "h-1.5 w-1.5 animate-pulse rounded-full bg-accent-cyan"
                            }
                          />
                          <span
                            className={
                              reduceMotion
                                ? "h-1.5 w-1.5 rounded-full bg-accent-cyan opacity-70"
                                : "h-1.5 w-1.5 animate-pulse rounded-full bg-accent-cyan opacity-70 [animation-delay:150ms]"
                            }
                          />
                          <span
                            className={
                              reduceMotion
                                ? "h-1.5 w-1.5 rounded-full bg-accent-cyan opacity-40"
                                : "h-1.5 w-1.5 animate-pulse rounded-full bg-accent-cyan opacity-40 [animation-delay:300ms]"
                            }
                          />
                        </span>
                        <span className="text-xs">Thinking…</span>
                      </div>
                    ) : null}
                    {reply ? (
                      <div>
                        <p className="text-[11px] font-medium tracking-[0.04em] text-accent-cyan">Ethan</p>
                        <p className="mt-1 text-fg-muted">{reply}</p>
                      </div>
                    ) : null}
                  </>
                )}
              </div>

              <div className="border-t border-hairline p-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder={hasApi ? "Your question…" : "Chat unavailable — use links above"}
                    disabled={!hasApi || status === "loading"}
                    className="min-h-11 min-w-0 flex-1 rounded-lg border border-hairline bg-surface-2 px-3 py-2 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={send}
                    disabled={!hasApi || !message.trim() || status === "loading"}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-white transition hover:bg-accent/85 disabled:opacity-40"
                    aria-label="Send"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                    ) : (
                      <Send className="h-5 w-5" aria-hidden />
                    )}
                  </button>
                </div>
                {status === "error" ? <p className="mt-2 text-xs text-red-400">Request failed — try again.</p> : null}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
