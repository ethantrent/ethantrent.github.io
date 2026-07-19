# Ethan Trent Portfolio — Design System Master

Source of truth for UI work on this site. Tokens live in [`src/app/globals.css`](../src/app/globals.css); shared button/card classes in [`src/lib/ui.ts`](../src/lib/ui.ts). Dark-only — no light mode.

Generated/updated via ui-ux-pro-max CLI (`--design-system --persist`) on 2026-07-18, then **merged** with the established Linear-dark system. Keep site tokens below; do not adopt the CLI’s light-mode palette or Archivo/Space Grotesk pairing.

When building a page, check [`pages/`](pages/) for overrides first; otherwise follow this file.

Aligned with ui-ux-pro-max Portfolio/Personal: storytelling home, visuals-first case studies, restrained motion (no parallax stacks).

---

## Product context

| Field | Value |
|---|---|
| Product type | Personal PM / AI portfolio (hiring) |
| Visual direction | Linear-inspired dark system + storytelling home |
| CLI pattern (adapted) | Portfolio Grid — visuals first; conversion via project cards + contact |
| CLI style (adapted) | Motion-Driven — entrance + scroll reveals only; no parallax layers |
| Primary accent | Blue `#3b82f6` (scarce) |
| Insight accent | Cyan `#22d3ee` (Callouts only) |
| Anti-patterns | Purple/indigo gradients, cream+serif+terracotta, glassmorphism/aurora, decorative particles, corporate/generic templates |

---

## Color tokens

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#08090b` | Canvas |
| `--surface` | `#0f1011` | Cards, panels |
| `--surface-2` | `#141516` | Nested / hover lift |
| `--surface-3` | `#18191a` | Progress tracks, deep fill |
| `--fg` | `#f7f8f8` | Primary text |
| `--fg-muted` | `#d0d6e0` | Secondary body |
| `--muted` | `#8a8f98` | Eyebrows, captions |
| `--hairline` | `#23252a` | Default borders |
| `--hairline-strong` | `#34343a` | Hover / emphasis borders |
| `--accent` | `#3b82f6` | CTAs, links, key numbers |
| `--accent-cyan` | `#22d3ee` | Insight Callouts only |
| `--available-green` | `#22c55e` | Availability badge |

**Rules**

- One chromatic accent (blue) for interactive chrome; cyan is reserved for mid-narrative insight blocks.
- Prefer ink weight and surface steps over colored backgrounds for hierarchy.
- Credentials / org logos: muted + grayscale by default; slight opacity lift on hover is fine.
- Neutral canvas lets work shine — accent stays scarce.

---

## Typography

| Role | Family | CSS |
|---|---|---|
| Display (H1/H2, `.font-display`) | **Outfit** | `--font-outfit` via `next/font` in `layout.tsx` |
| Body / UI | **Inter** | `--font-inter` + `body` className |

| Scale | Usage |
|---|---|
| Display hero brand | `text-5xl`–`text-7xl`, `.font-display`, `font-semibold` — name is the H1 |
| Hero value line | `text-xl`–`text-2xl`, `.font-display`, muted foreground |
| Section H2 | `text-2xl`–`text-4xl`, `.font-display` |
| Body | `text-base` / `text-sm`, Inter, case-study body `leading-[1.75]` |
| Eyebrow | `text-[13px] font-medium tracking-[0.03em] text-muted` |

Sentence case for UI labels. No Inter-as-display — Outfit carries expressive hierarchy.

---

## Surfaces & layout

- Max content width: `max-w-6xl` for marketing strips; `max-w-3xl` for long-form case study prose.
- Cards: hairline border + `bg-surface`; hover → `border-hairline-strong` / `bg-surface-2`. Prefer no cards in hero.
- Radius: `rounded-lg` controls, `rounded-xl` panels/media.
- Sticky nav: 56px (`h-14`); compensate with `scroll-mt-28` on in-page targets.
- Touch targets: interactive controls ≥ `min-h-11` (44px); ≥8px gap between adjacent targets.
- Interactive elements: `cursor-pointer`; hover transitions 150–300ms; visible focus rings.

---

## Home hero (first viewport)

One composition — not a dashboard.

| Element | Rule |
|---|---|
| Brand | `siteConfig.name` is the H1 (hero-level signal) |
| Headline | One value line (Outfit, secondary to brand) |
| Support | One short positioning sentence |
| CTAs | Contact (primary) + Resume (secondary); ≥44px |
| Visual | Atmosphere-only bleed (`.hero-atmosphere` + `.hero-grid` + `.hero-bleed`) — no photo or diagram in the hero |
| Secondary | Email + socials in a quiet bottom row — not competing with CTAs |
| Out | No cards, floating badges, stat strips, or avatar chips in the hero |

Atmosphere classes live in [`src/app/globals.css`](../src/app/globals.css). Soft blue radial washes only — no aurora, glass, or particles.

Impact snapshot follows immediately: **no card wrapper**; hairline top border; one job = quantified outcomes.

Featured case studies: **visuals first** (artifact media), problem → outcome hierarchy, minimal badge chrome.

---

## Components (shared)

| Class | File | Notes |
|---|---|---|
| `buttonPrimary` / `buttonSecondary` | `src/lib/ui.ts` | `min-h-11`, blue primary / hairline secondary |
| `cardSurface` / `cardStatic` | `src/lib/ui.ts` | Opaque surface + hairline |
| `eyebrow` | `src/lib/ui.ts` | Section labels |
| `Callout` | `src/components/case-study/Callout.tsx` | Cyan left border; scroll reveal |
| `ArtifactFrame` | `src/components/case-study/ArtifactFrame.tsx` | Prefer real `imageSrc` over placeholder |
| `CaseStudyToc` + `ReadingProgress` | case-study/ | Desktop reading aids |

---

## Motion

- Max 1–2 key scroll reveals per view (impact numbers, featured cards, Callouts).
- Prefer opacity + `translateY` (~8–10px), 150–400ms, **ease-out** for enter; `whileInView` once.
- Always respect `prefers-reduced-motion` (`useReducedMotion` / CSS media query).
- No parallax stacks, bounce stacks, particles, or custom cursors.
- Infinite/`animate-bounce` only for true loading indicators — not decorative scroll cues.
- No layout-shifting hover scales on containers (media may use subtle `scale-[1.02]` inside overflow-hidden).

---

## Home storytelling sequence

Matches [`src/app/page.tsx`](../src/app/page.tsx):

1. Hero  
2. Impact snapshot  
3. Human cue (one-line origin → About)  
4. Featured case studies (AuditAI lead)  
5. How I work / manifesto  
6. Operating principles (expand → case study)  
7. Credentials strip  
8. Testimonial (only if `siteConfig.testimonial.quote` is set)  
9. Skills one-liner → `/skills/`  
10. CTA (Contact + soft Ask Ethan entry)  

Do not restore home skills grids or tech marquees.

---

## Content credibility

- Case cards and “What We Built” use real artifacts under [`/public/artifacts/`](../public/artifacts/).
- Do not invent metrics or testimonials — leave slots empty until shareable.
- Ask Ethan: visitor-facing empty state when API URL missing; no purple chrome; cyan not used for chat chrome.

---

## Pre-delivery checklist (ui-ux-pro-max)

- [ ] No emojis as icons (Lucide / react-icons)
- [ ] `cursor-pointer` on clickable elements
- [ ] Hover transitions 150–300ms
- [ ] Focus states visible
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375 / 768 / 1024 / 1440
- [ ] No content hidden behind sticky nav (`scroll-mt-28`)
- [ ] No horizontal scroll on mobile

---

## Out of scope

Light mode, glassmorphism, aurora backgrounds, AI-purple accents, full magazine restyle of case studies, CLI light palette (`#FAFAFA` canvas), Archivo / Space Grotesk swap.
