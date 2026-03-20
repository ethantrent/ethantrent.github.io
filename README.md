# Portfolio (Next.js + GitHub Pages)

Personal portfolio for an AI Product Manager profile. **Deployed to GitHub Pages** — not Vercel.

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
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (no trailing slash). Local: `http://localhost:3000`. Production is set automatically in GitHub Actions; override in `.env.local` only if needed. |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Formspree form id from `https://formspree.io/f/{id}` |

## Customize content

Main content lives in:

- `src/data/site.ts` — name, email, socials, hero/manifesto/marquee/footer copy
- `src/data/projects.ts` — project cards (includes `category` for home teasers)
- `src/data/experience.ts` — timeline
- `src/data/skills.ts` — skill categories (`iconKey` maps in `src/lib/tech-icons.tsx` + `SkillsGrid`)
- `src/data/toolkit.ts` — toolkit page cards

The home **tech marquee** becomes a static flex row when the user prefers reduced motion.

Replace `public/avatar-placeholder.svg`, `public/projects/*`, `public/experience/*`, and `public/resume.pdf` with real assets.

## GitHub Pages deployment

**This repo:** [`ethantrent/portfolio`](https://github.com/ethantrent/portfolio) → live site **`https://ethantrent.github.io/portfolio/`** (after Pages is enabled and `main` has been deployed).

1. GitHub → **Settings → Pages → Build and deployment**: set **Source** to **GitHub Actions** (not “Deploy from a branch”).
2. Push to **`main`** — [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs `npm ci`, `npm run build`, and publishes the **`out/`** folder.
3. The workflow sets **`GITHUB_PAGES_BASE_PATH`** and **`NEXT_PUBLIC_SITE_URL`** automatically:
   - Repo named `anything` except `*.github.io` → base path `/REPO_NAME` (e.g. `/portfolio`).
   - Repo named `yourusername.github.io` → root `/` (user/org site).

Optional: add **`NEXT_PUBLIC_FORMSPREE_FORM_ID`** as a GitHub **Actions secret** and reference it in the workflow as an env var on the build step if you want the contact form configured in production without committing secrets (Formspree id is public in the browser anyway; still fine to use repo **Variables**).

The site is fully static; do not rely on Next.js API routes or server features on the hosted site.

### Simulate a project-site build locally

```bash
set GITHUB_PAGES_BASE_PATH=/portfolio
set NEXT_PUBLIC_BASE_PATH=/portfolio
set NEXT_PUBLIC_SITE_URL=https://ethantrent.github.io/portfolio
npm run build
```

(PowerShell: set the same three variables, then `npm run build`.)

## Scripts

- `npm run dev` — development server
- `npm run build` — production build into `out/`
- `npm run lint` — ESLint
