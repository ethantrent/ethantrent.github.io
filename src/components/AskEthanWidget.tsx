"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import {
  ASK_ETHAN_OPEN_EVENT,
  type AskEthanOpenDetail,
} from "@/lib/askEthan";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const RECRUITER_PROMPTS = [
  "How do you define good for AI products?",
  "Tell me about the AuditAI tradeoffs",
  "What’s your focus at Schwab?",
  "Why PM instead of engineering?",
] as const;

/**
 * Floating “Ask Ethan” assistant.
 * Always shows the FAB. When API URL is set, chats via Worker;
 * otherwise shows visitor-facing contact alternatives.
 */
export function AskEthanWidget() {
  const fromEnv = process.env.NEXT_PUBLIC_ASK_ETHAN_API_URL;
  const raw = (fromEnv && fromEnv.length > 0 ? fromEnv : siteConfig.askEthanApiUrl) || "";
  const apiUrl = raw.replace(/\/$/, "");
  return <AskEthanShell apiUrl={apiUrl} />;
}

function AskEthanShell({ apiUrl }: { apiUrl: string }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [context, setContext] = useState<string | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const pendingAutoSend = useRef<string | null>(null);
  const hasApi = Boolean(apiUrl);

  const scrollThread = useCallback(() => {
    const el = threadRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollThread();
  }, [messages, status, scrollThread]);

  const sendText = useCallback(
    async (q: string) => {
      const trimmed = q.trim();
      if (!trimmed || !apiUrl) return;
      setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
      setMessage("");
      setStatus("loading");
      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ message: trimmed }),
        });
        const data = (await res.json().catch(() => null)) as { reply?: string } | null;
        if (!res.ok) throw new Error("bad_status");
        const reply =
          typeof data?.reply === "string"
            ? data.reply
            : "Thanks — I’ll get back with a richer answer soon.";
        setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
        setStatus("idle");
      } catch {
        setStatus("error");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Couldn’t reach the assistant right now. Try email or LinkedIn instead.",
          },
        ]);
      }
    },
    [apiUrl],
  );

  const send = useCallback(() => {
    void sendText(message);
  }, [message, sendText]);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<AskEthanOpenDetail>).detail ?? {};
      setOpen(true);
      if (detail.context) setContext(detail.context);
      if (detail.prompt) {
        if (detail.autoSend && apiUrl) {
          pendingAutoSend.current = detail.prompt;
        } else {
          setMessage(detail.prompt);
        }
      }
    };
    window.addEventListener(ASK_ETHAN_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(ASK_ETHAN_OPEN_EVENT, onOpen);
  }, [apiUrl]);

  useEffect(() => {
    if (!open || !pendingAutoSend.current || !apiUrl) return;
    const q = pendingAutoSend.current;
    pendingAutoSend.current = null;
    void sendText(q);
  }, [open, apiUrl, sendText]);

  const usePrompt = (prompt: string) => {
    if (!hasApi || status === "loading") {
      setMessage(prompt);
      return;
    }
    void sendText(prompt);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg bg-accent text-white transition duration-200 hover:bg-accent/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:bottom-8 md:right-8"
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
              className="fixed inset-0 z-[60] cursor-pointer bg-black/40 md:bg-black/30"
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
                  <p className="text-xs text-muted">
                    {context ? `About ${context}` : "AI PM · portfolio assistant"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg text-muted transition duration-200 hover:bg-surface-2 hover:text-fg"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <div
                ref={threadRef}
                className="max-h-[min(50vh,320px)] space-y-3 overflow-y-auto px-4 py-3 text-sm"
              >
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
                    {messages.length === 0 && status === "idle" ? (
                      <div className="space-y-3">
                        <p className="text-muted">
                          Ask about my PM experience, AI programs, or how I work with stakeholders.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {RECRUITER_PROMPTS.map((prompt) => (
                            <button
                              key={prompt}
                              type="button"
                              onClick={() => usePrompt(prompt)}
                              className="cursor-pointer rounded-lg border border-hairline bg-surface-2 px-2.5 py-1.5 text-left text-[12px] font-medium text-fg-muted transition duration-200 hover:border-hairline-strong hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {messages.map((m, i) => (
                      <div key={`${m.role}-${i}`}>
                        <p
                          className={
                            m.role === "user"
                              ? "text-[11px] font-medium tracking-[0.04em] text-muted"
                              : "text-[11px] font-medium tracking-[0.04em] text-accent-cyan"
                          }
                        >
                          {m.role === "user" ? "You" : "Ethan"}
                        </p>
                        <p className="mt-1 text-fg-muted">{m.text}</p>
                      </div>
                    ))}
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
                    className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-accent text-white transition duration-200 hover:bg-accent/85 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Send"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                    ) : (
                      <Send className="h-5 w-5" aria-hidden />
                    )}
                  </button>
                </div>
                {status === "error" ? (
                  <p className="mt-2 text-xs text-red-400" role="alert">
                    Request failed — try again or use email / LinkedIn.
                  </p>
                ) : null}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
