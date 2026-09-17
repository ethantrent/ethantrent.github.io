# Ethan Trent’s portfolio

Ethan Trent’s confirmed project work, background, and notes. Home features AuditAI, the BYU–I Support Agent prototype, and U2. Contributions and reported outcomes retain their ownership and measurement limits. Unfinished roadmap accounts are excluded from the application and assistant; the original local drafts remain in the ignored review archive and Git history. Publishing requires a separate explicit request.

Live destination: [ethantrent.github.io](https://ethantrent.github.io). Next.js App Router, TypeScript, Tailwind CSS, and static export to GitHub Pages remain the architecture. Contact uses Formspree; the optional AI portfolio assistant uses a separate [Cloudflare Worker](workers/ask-ethan/README.md).

## Development and validation

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

The test suite uses Playwright with an installed Google Chrome (`channel: chrome`). It starts a local dev server on port 3100 with test-only service URLs and mocks external form/chat requests. It checks routes, assets, old anchors, responsive layouts, accessibility, keyboard dialogs, and success/error states. Screenshots go to ignored `review/`; test reports are also ignored. No real inquiry is sent.

`npm run build` writes `out/`. To review the export, serve that directory using any local static file server; `next start` is not a static-export server.

The September 17, 2026 content pass passed lint, TypeScript, static export, and all 46 browser/Worker checks. After final copy refinements, the build and all 12 targeted content/Worker checks passed again. The export had 742 checked local references with no missing files or anchors. Form/model requests were mocked or blocked.

Review covered responsive layouts, keyboard access, legacy anchors, image-viewer behavior, and 320px text enlargement. Native browser zoom was not repeated in this pass. Screenshot archives and detailed validation remain in ignored `review/`; this was implementation review, not recruiter research.

## Content and design

Home introduces Ethan through his background and three confirmed projects, followed by links to Coding Interviews and public code. Work includes the four full case summaries and links to Cravyr, ProfScore, and the Swytch team starter workspace. Public code is distinguished from private case-study repositories. No new adoption, runtime-verification, or team modeling results are claimed.

- [Public profile](src/data/public-profile.ts): current role, background, contact, and conservative availability wording; also used by the Worker.
- [Projects](src/data/projects.ts): shared summaries, contributions, decisions, status, captions, and scoped outcomes.
- [Public code](src/data/public-code.ts): repository links, scope, and evidence limitations shared with the assistant.
- [Case studies](src/data/case-studies.ts): five-section narratives and artifact references.
- [Notes](src/data/writing.ts): reflective essays; original dates preserved, revisions dated separately.
- [Experience](src/data/experience.ts): brief professional and educational context.
- [Design system](DESIGN.md): warm palette, Inter typography, project treatments, copy, and interaction guidance.

Navigation labels Work and Notes retain `/projects/` and `/writing/`. Four project cases and three article URLs remain published. The three former local roadmap URLs retain an unavailable message and Work link, use `noindex`, and are absent from the sitemap. Experience and Capabilities are secondary pages. The existing résumé PDF is unchanged and labeled “Résumé — through summer 2026.” Do not add confidential employer material or unbuilt roadmap projects to this public repo.

## Configuration

Copy `.env.example` to `.env.local` and set values as needed. `NEXT_PUBLIC_*` variables are public and are embedded at build time.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production canonical URL; defaults to `https://ethantrent.github.io`. |
| `GITHUB_PAGES_BASE_PATH` / `NEXT_PUBLIC_BASE_PATH` | Only for a project-site subpath; leave unset for this user site. |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Formspree ID for the contact form. Without it, direct email remains available. |
| `NEXT_PUBLIC_ASK_ETHAN_API_URL` | Overrides the Worker URL. Unset uses `siteConfig`; explicitly empty disables chat requests and shows direct contact links. |

## Publication

The existing [Pages workflow](.github/workflows/deploy.yml) builds and deploys on a push to `main`. Review the local site and content before pushing. The Worker is deployed separately; its changes must also be reviewed and deployed for production answers to match the redesigned site. No visibility or deployment settings were changed by this redesign.

The workflow reads the existing Formspree and optional assistant URL Actions secrets. Rebuild after changing public environment values. There is no visitor counter or automatic publishing added by the redesign.
