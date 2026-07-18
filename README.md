# Portfolio (Next.js + GitHub Pages)

Personal portfolio for an AI Product Manager profile. **Deployed to GitHub Pages** — not Vercel.

## Live site

**[https://ethantrent.github.io](https://ethantrent.github.io)** ([`ethantrent/ethantrent.github.io`](https://github.com/ethantrent/ethantrent.github.io))

## Stack

- Next.js (App Router) with **static export** (`output: "export"`)
- TypeScript, Tailwind CSS v4, Framer Motion
- Contact form via **Formspree** (no Node backend on Pages)
- Optional **Ask Ethan** chat via Cloudflare Worker (`workers/ask-ethan/`)
- Routes: `/`, `/about`, `/experience`, `/projects`, `/skills`, `/writing`, `/contact`, `/privacy`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` for local Formspree / Ask Ethan testing.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (no trailing slash). Local: `http://localhost:3000`. CI sets `https://ethantrent.github.io` automatically. |
| `NEXT_PUBLIC_BASE_PATH` | Leave unset locally. Only for simulating a **project** site (`/repo-name`). |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Formspree form id from `https://formspree.io/f/{id}` (required for contact form POST). |
| `NEXT_PUBLIC_ASK_ETHAN_API_URL` | Optional. HTTPS Worker URL that accepts `POST { "message" }` → `{ "reply" }`. |
| `NEXT_PUBLIC_VISITOR_COUNTER_JSON` | Optional. JSON URL returning `{ "count": number }` with CORS. |

## GitHub Actions secrets (production)

Repo → **Settings → Secrets and variables → Actions** → **New repository secret**.

| Secret name | Required | Notes |
|-------------|----------|--------|
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | **Yes** for working contact form | Only the form id (not the full URL). Already wired in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). |
| `NEXT_PUBLIC_ASK_ETHAN_API_URL` | No | Set after deploying [`workers/ask-ethan`](workers/ask-ethan/README.md). Without it, the FAB still opens with email / LinkedIn / Contact fallbacks. |

After adding or changing a secret, re-run **Actions → Deploy to GitHub Pages** (or push to `main`) so the static build inlines the new `NEXT_PUBLIC_*` values.

### Formspree setup (first time)

1. Create a form at [formspree.io](https://formspree.io) and copy the id from `https://formspree.io/f/{id}`.
2. Add secret `NEXT_PUBLIC_FORMSPREE_FORM_ID` = `{id}`.
3. Redeploy. Test a submission on `/contact/`.

### Ask Ethan (optional)

```bash
cd workers/ask-ethan
npm install
npx wrangler login
npx wrangler deploy
# optional LLM answers:
npx wrangler secret put OPENAI_API_KEY
```

Copy the Worker URL into Actions secret `NEXT_PUBLIC_ASK_ETHAN_API_URL`, then redeploy Pages. Details: [`workers/ask-ethan/README.md`](workers/ask-ethan/README.md).

## Customize content

- `src/data/site.ts` — name, email, socials, hero, testimonial, SEO
- `src/data/projects.ts` — case study cards
- `src/data/experience.ts` — timeline
- `src/data/skills.ts` — skill categories
- `src/data/writing.ts` — essays
- `public/artifacts/` — case study diagrams
- Resume PDF in `public/` (keep `siteConfig.resumePath` in sync)

## GitHub Pages deployment

1. **Settings → Pages → Source:** **GitHub Actions**
2. Push **`main`** — [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds with **no** `basePath` for `*.github.io` repos.
3. **Actions → Deploy to GitHub Pages** — approve the `github-pages` environment on first run if prompted.

### If you see “404 — There isn’t a GitHub Pages site here”

1. Open **`https://ethantrent.github.io`** after a successful Deploy run.
2. **Settings → Pages** must use **GitHub Actions**, not “Deploy from a branch.”

## Scripts

- `npm run dev` — development server
- `npm run build` — production build into `out/`
- `npm run lint` — ESLint
