/**
 * Cross-component API for opening Ask Ethan with optional seed prompt / context.
 * Dispatched from case-study footers and home CTA; listened to by AskEthanWidget.
 */

export const ASK_ETHAN_OPEN_EVENT = "ask-ethan:open";

export type AskEthanOpenDetail = {
  /** Prefills and optionally auto-sends when the panel opens. */
  prompt?: string;
  /** Short label shown above the thread (e.g. case study name). */
  context?: string;
  /** When true, send the prompt immediately after open (requires prompt). */
  autoSend?: boolean;
};

export function openAskEthan(detail: AskEthanOpenDetail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<AskEthanOpenDetail>(ASK_ETHAN_OPEN_EVENT, { detail }),
  );
}
