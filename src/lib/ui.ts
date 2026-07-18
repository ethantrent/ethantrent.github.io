/**
 * Shared Linear-style component classes — single source of truth so buttons,
 * cards, and eyebrows stay consistent across pages.
 */

export const buttonPrimary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const buttonSecondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-hairline bg-surface px-5 py-2.5 text-sm font-medium text-fg transition hover:border-hairline-strong hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** Opaque surface card with hairline border; hover lifts one surface step. */
export const cardSurface =
  "rounded-xl border border-hairline bg-surface transition hover:border-hairline-strong";

/** Static card (no hover behavior). */
export const cardStatic = "rounded-xl border border-hairline bg-surface";

/** Section eyebrow: small, medium weight, slight positive tracking, sentence case. */
export const eyebrow = "text-[13px] font-medium tracking-[0.03em] text-muted";
