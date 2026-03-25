"use client";

import { useCallback, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
/**
 * Floating “Ask Ethan” assistant. Requires `NEXT_PUBLIC_ASK_ETHAN_API_URL` (HTTPS backend; static Pages has no API).
 * Without it, shows setup instructions instead of failing silently.
 */
export function AskEthanWidget() {
  const reduceMotion = useReducedMotion();
  const apiUrl = process.env.NEXT_PUBLIC_ASK_ETHAN_API_URL?.replace(/\/$/, "");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const send = useCallback(async () => {
    const q = message.trim();
    if (!q || !apiUrl) return;
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
      setReply("Couldn’t reach the assistant right now. Try email or LinkedIn from the hero.");
    }
  }, [apiUrl, message]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-xl shadow-accent/40 transition hover:scale-105 hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet md:bottom-8 md:right-8"
        aria-label="Open Ask Ethan assistant"
      >
        <MessageCircle className="h-7 w-7" aria-hidden />
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
              className="fixed bottom-24 right-4 z-[70] flex w-[min(100vw-2rem,400px)] flex-col overflow-hidden rounded-2xl border border-fg/15 bg-surface shadow-2xl backdrop-blur-md md:right-8"
            >
              <div className="flex items-center justify-between border-b border-fg/10 px-4 py-3">
                <div>
                  <p className="font-display text-sm font-bold text-fg">Ask Ethan</p>
                  <p className="text-xs text-muted">AI PM · portfolio assistant</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-muted hover:bg-fg/5 hover:text-fg"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <div className="max-h-[min(50vh,320px)] overflow-y-auto px-4 py-3 text-sm text-muted">
                {!apiUrl ? (
                  <p>
                    Wire up a small HTTPS API (e.g. Vercel / Cloudflare Worker) and set{" "}
                    <code className="rounded bg-fg/10 px-1 text-xs text-fg">NEXT_PUBLIC_ASK_ETHAN_API_URL</code> at
                    build time. This widget POSTs JSON <code className="text-xs">{"{ message }"}</code> and expects{" "}
                    <code className="text-xs">{"{ reply }"}</code> — ideal for RAG over your resume and projects.
                  </p>
                ) : reply ? (
                  <p className="text-fg/90">{reply}</p>
                ) : (
                  <p>Ask about my PM experience, AI programs, or how I work with stakeholders.</p>
                )}
              </div>

              <div className="border-t border-fg/10 p-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder={apiUrl ? "Your question…" : "Configure API URL to enable"}
                    disabled={!apiUrl || status === "loading"}
                    className="min-w-0 flex-1 rounded-xl border border-fg/15 bg-bg/50 px-3 py-2 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={send}
                    disabled={!apiUrl || !message.trim() || status === "loading"}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition hover:bg-accent/90 disabled:opacity-40"
                    aria-label="Send"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                    ) : (
                      <Send className="h-5 w-5" aria-hidden />
                    )}
                  </button>
                </div>
                {status === "error" ? <p className="mt-2 text-xs text-keyword-orange">Request failed — try again.</p> : null}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
