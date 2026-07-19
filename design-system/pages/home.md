# Home Page Overrides

> **PROJECT:** Ethan Trent Portfolio  
> Overrides [`../MASTER.md`](../MASTER.md) for `/` only.

---

## Layout

- **Max width:** `max-w-6xl` marketing strips (not the CLI’s 800px narrow landing).
- **Pattern:** Storytelling sequence — not masonry-only portfolio grid.
- **Density:** Spacious first viewport; proof and work follow immediately.

## Section order (canonical)

1. Hero (name / role / one value line / Contact + Resume)
2. Impact snapshot (quantified outcomes, no card chrome)
3. Human cue (one-line origin → About)
4. Featured case studies (AuditAI lead + pair) — visuals first
5. Manifesto / how I work
6. Operating principles (expand → case study)
7. Credentials
8. Testimonial (only if quote set)
9. Skills one-liner → `/skills/`
10. Home CTA → contact (+ soft Ask Ethan entry)

## Hero

- Atmosphere-only bleed; brand is H1.
- Availability is a quiet status line — not a floating promo badge or card cluster.
- Scroll cue: static or opacity pulse only — no `animate-bounce`.

## Impact

- One job: outcomes. Hairline separators; no dashboard panel / card grid.

## Featured work

- Conversion: artifact media first → problem → outcome → case study link.
- Avoid overlay “Featured” / year chips on media; put year in the meta row if needed.
- Lead card may be full-width; secondary pair in two columns.
- Hover: border/surface lift 150–300ms; no layout-shifting scale on the card shell.

## Color / motion

- Neutral dark canvas; scarce blue accent.
- Entrance + `whileInView` reveals only; respect reduced motion.
