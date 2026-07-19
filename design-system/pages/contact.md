# Contact Page Overrides

> **PROJECT:** Ethan Trent Portfolio  
> Overrides [`../MASTER.md`](../MASTER.md) for `/contact/` only.

---

## Goal

Low-friction hire conversion. One screen, not a multi-step wizard.

## Layout

- **Max width:** `max-w-6xl` with header capped ~`max-w-2xl`
- **Composition:** Form (primary) + Direct lines aside (parallel path)
- **Aside:** Hairline separator (left on desktop, top on mobile) — not a heavy card panel

## Form rules

| Field | Required | Notes |
|---|---|---|
| Name | Yes | Single line |
| Email | Yes | `type="email"` |
| Company | No | Optional for recruiters |
| Message | Yes | Textarea; role / timeline / context |

- Primary CTA: **Send message** (`buttonPrimary`, `min-h-11`)
- Inline escape: mailto under the submit row
- Keep Formspree `fetch` + `NEXT_PUBLIC_FORMSPREE_FORM_ID`
- Hidden `_subject` for inbox clarity

## Success / error

- **Success:** Replace the form with a confirmation block (check icon + short copy + Email me / Send another)
- **Error:** Alert with mailto fallback — never leave recruiters stranded
- Motion: opacity + `translateY` on success only; respect `prefers-reduced-motion`

## Out

- Multi-step / conversational wizards
- Progress bars for 4 fields
- Purple chrome, glass panels, inventing testimonials on this page

## Checklist

- [ ] All fields visible without paging
- [ ] Focus rings visible; `cursor-pointer` on links/buttons
- [ ] Transitions 150–300ms
- [ ] Privacy link present
