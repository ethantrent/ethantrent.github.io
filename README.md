# Portfolio (Next.js + GitHub Pages)

Personal portfolio for an AI Product Manager profile. **Deployed to GitHub Pages** — not Vercel.

## Live site

**[https://ethantrent.github.io](https://ethantrent.github.io)** (user Pages repo [`ethantrent/ethantrent.github.io`](https://github.com/ethantrent/ethantrent.github.io))

The former project URL `https://ethantrent.github.io/portfolio/` is **retired**; Pages was removed from the old `portfolio` repo so there is a single canonical link.

## Stack

- Next.js (App Router) with **static export** (`output: "export"`)
- TypeScript, Tailwind CSS v4, Framer Motion, `next-themes`, Lucide + react-icons, `react-fast-marquee` (home tech strip)
- Contact form via **Formspree** (no backend on Pages)
- **Custom cursor** (fine pointer only, off when `prefers-reduced-motion`) — see `CustomCursor.tsx`
- Routes: `/`, `/about`, `/experience`, `/projects`, `/skills`, `/toolkit`, `/contact`, `/privacy` (placeholder policy)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (no trailing slash). Local: `http://localhost:3000`. CI sets `https://ethantrent.github.io` automatically. |
| `NEXT_PUBLIC_BASE_PATH` | Leave unset locally. Only used when simulating a **project** site build (`/repo-name`). |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Formspree form id from `https://formspree.io/f/{id}` |

## Customize content

Main content lives in:

- `src/data/site.ts` — name, email, socials, hero/manifesto/marquee/footer copy
- `src/data/projects.ts` — project cards (includes `category` for home teasers)
- `src/data/experience.ts` — timeline
- `src/data/skills.ts` — skill categories (`iconKey` maps in `src/lib/tech-icons.tsx` + `SkillsGrid`)
- `src/data/toolkit.ts` — toolkit page cards

The home **tech marquee** becomes a static flex row when the user prefers reduced motion.

Replace `public/profile-mark.svg` (or use your photo path in `Hero` / `AboutSection`), `public/projects/*`, `public/experience/*`, and `public/resume.pdf` with real assets.

## GitHub Pages deployment

**Repository:** [`ethantrent/ethantrent.github.io`](https://github.com/ethantrent/ethantrent.github.io) — must be named **`username.github.io`** for **`https://ethantrent.github.io`**.

1. **Settings → Pages → Source:** **GitHub Actions**
2. Push **`main`** — [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds with **no** `basePath` (workflow detects `*.github.io` repo name).
3. **Actions → Deploy to GitHub Pages** — approve **`github-pages`** environment on first run if prompted, or use **Run workflow**.

### Git remotes (this clone)

- **`origin`** → `ethantrent.github.io` (primary; push here for deploy)
- **`portfolio`** → legacy [`ethantrent/portfolio`](https://github.com/ethantrent/portfolio) (archived code mirror only; Pages disabled)

### If you see “404 — There isn’t a GitHub Pages site here”

1. Confirm you’re opening **`https://ethantrent.github.io`** after a successful **Deploy** run.
2. **Settings → Pages** must use **GitHub Actions**, not “Deploy from a branch.”

### Simulate a **project** site build locally (subpath)

Only if you ever host from a non-`*.github.io` repo again:

```bash
set GITHUB_PAGES_BASE_PATH=/your-repo
set NEXT_PUBLIC_BASE_PATH=/your-repo
set NEXT_PUBLIC_SITE_URL=https://YOUR_USER.github.io/your-repo
npm run build
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build into `out/`
- `npm run lint` — ESLint
