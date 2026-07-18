# Ask Ethan API (Cloudflare Worker)

HTTPS backend for the portfolio FAB. GitHub Pages cannot host API routes.

## Contract

`POST` JSON `{ "message": "..." }` → `{ "reply": "..." }`

## Reply stack (free-first)

1. **Workers AI** — `@cf/meta/llama-3.2-3b-instruct` via `[ai] binding` (Cloudflare free tier)
2. **OpenAI** — only if `OPENAI_API_KEY` secret is set
3. **Heuristics** — keyword fallback if models error or binding is missing

## Production Worker

- URL: `https://ask-ethan.neat-fang.workers.dev`
- Wired into Pages via `siteConfig.askEthanApiUrl` and/or Actions secret `NEXT_PUBLIC_ASK_ETHAN_API_URL`

## Deploy

```bash
cd workers/ask-ethan
npm install
npx wrangler login   # once, if needed
npx wrangler deploy
```

Optional paid upgrade:

```bash
npx wrangler secret put OPENAI_API_KEY
```

## Local test (AI needs remote)

```bash
npx wrangler dev --remote
# then: POST http://127.0.0.1:8787  { "message": "Tell me about AuditAI" }
```
