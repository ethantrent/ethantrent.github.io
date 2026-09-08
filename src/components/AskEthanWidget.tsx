"use client";
import { useEffect, useRef, useState } from "react";
import { containDialogFocus, dismissOnBackdrop } from "@/lib/dialog";
import Link from "next/link";
import { X, Send } from "lucide-react";
import { siteConfig } from "@/data/site";
import { ASK_ETHAN_OPEN_EVENT, type AskEthanOpenDetail } from "@/lib/askEthan";

type Message = { role: "user" | "assistant"; text: string };
const prompts = [
  "Tell me about the citation-first assistant",
  "How does Ethan approach evaluation and teaching?",
  "How did Ethan get into product?",
];

/** Opened deliberately from the footer; native dialog handles focus trapping and Escape. */
export function AskEthanWidget() {
  const apiUrl = (
    process.env.NEXT_PUBLIC_ASK_ETHAN_API_URL ?? siteConfig.askEthanApiUrl
  )
    .trim()
    .replace(/\/$/, "");
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const thread = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  useEffect(() => {
    const open = (event: Event) => {
      const detail = (event as CustomEvent<AskEthanOpenDetail>).detail;
      returnFocus.current = document.activeElement as HTMLElement;
      if (detail?.prompt) setInput(detail.prompt);
      if (!dialog.current?.open) dialog.current?.showModal();
    };
    window.addEventListener(ASK_ETHAN_OPEN_EVENT, open);
    return () => window.removeEventListener(ASK_ETHAN_OPEN_EVENT, open);
  }, []);
  useEffect(() => {
    if (thread.current) thread.current.scrollTop = thread.current.scrollHeight;
  }, [messages, status]);
  async function send(question: string) {
    const message = question.trim();
    if (!message || !apiUrl || busy.current) return;
    busy.current = true;
    setStatus("loading");
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: message }]);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ message }),
        signal: controller.signal,
      });
      const data: { reply?: unknown } = await response.json();
      if (!response.ok || typeof data.reply !== "string" || !data.reply.trim())
        throw new Error("unavailable");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply as string },
      ]);
      setStatus("idle");
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      busy.current = false;
    }
  }
  return (
    <dialog
      ref={dialog}
      aria-labelledby="assistant-title"
      onClose={() => returnFocus.current?.focus()}
      onKeyDown={containDialogFocus}
      onClick={dismissOnBackdrop}
      className="editorial-dialog fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-lg p-0 shadow-xl"
    >
      <div className="flex items-center justify-between gap-5 border-b border-hairline px-6 py-4">
        <div>
          <h2 id="assistant-title" className="font-display text-2xl">
            Ask Ethan
          </h2>
          <p className="mt-1 text-xs text-muted">
            An AI portfolio assistant, not Ethan himself.
          </p>
        </div>
        <button
          onClick={() => dialog.current?.close()}
          className="flex h-11 w-11 shrink-0 items-center justify-center"
          aria-label="Close assistant"
        >
          <X size={21} />
        </button>
      </div>
      <div
        ref={thread}
        className="max-h-[45dvh] overflow-y-auto px-6 py-5"
        role="log"
        aria-live="polite"
        aria-label="Assistant conversation"
      >
        {!apiUrl ? (
          <p className="text-sm text-muted">
            The assistant is unavailable right now. You can reach Ethan directly
            using the links below.
          </p>
        ) : messages.length === 0 ? (
          <>
            <p className="text-sm leading-relaxed text-muted">
              Explore Ethan’s public work and background. For details that
              aren’t covered here, contact him directly.
            </p>
            <div className="mt-4 flex flex-col items-start gap-2">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => void send(prompt)}
                  disabled={status === "loading"}
                  className="min-h-11 border border-hairline bg-surface px-3 py-2 text-left text-sm hover:border-accent disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </>
        ) : (
          messages.map((m, i) => (
            <div key={i} className="mb-5">
              <p className="eyebrow mb-2">
                {m.role === "user" ? "You" : "AI assistant"}
              </p>
              <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-fg-muted">
                {m.text}
              </p>
            </div>
          ))
        )}
        {status === "loading" ? (
          <p role="status" className="text-sm text-muted">
            Thinking…
          </p>
        ) : null}
        {status === "error" ? (
          <p role="alert" className="text-sm text-red-800">
            Couldn’t reach the assistant. Try again, or email Ethan directly.
          </p>
        ) : null}
      </div>
      <form
        className="border-t border-hairline p-5"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <label className="sr-only" htmlFor="assistant-question">
          Your question
        </label>
        <div className="flex gap-2">
          <input
            id="assistant-question"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!apiUrl || status === "loading"}
            className="min-h-11 min-w-0 flex-1 border border-hairline bg-bg px-3 text-base"
            placeholder="Ask about the work…"
          />
          <button
            type="submit"
            disabled={!apiUrl || !input.trim() || status === "loading"}
            className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent text-white disabled:opacity-40"
            aria-label="Send question"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 text-xs">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex min-h-11 items-center underline underline-offset-4"
          >
            Email Ethan
          </a>
          <a
            href={siteConfig.social.linkedin}
            className="inline-flex min-h-11 items-center underline underline-offset-4"
          >
            LinkedIn
          </a>
          <Link
            href="/privacy/"
            onClick={() => dialog.current?.close()}
            className="inline-flex min-h-11 items-center text-muted"
          >
            Privacy
          </Link>
        </div>
      </form>
    </dialog>
  );
}
