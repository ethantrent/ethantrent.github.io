# Ask Ethan API (Cloudflare Worker)

HTTPS backend for the portfolio FAB. GitHub Pages cannot host API routes.

## Contract

`POST` JSON `{ "message": "..." }` → `{ "reply": "..." }`

## Deploy

```bash
cd workers/ask-ethan
npm install
npx wrangler login
npx wrangler deploy
# optional LLM answers:
npx wrangler secret put OPENAI_API_KEY
```

Copy the worker URL (e.g. `https://ask-ethan.<account>.workers.dev`).

## Wire the static site

Add a GitHub Actions / Pages build secret:

`NEXT_PUBLIC_ASK_ETHAN_API_URL=https://ask-ethan.<account>.workers.dev`

Also add it to the Deploy workflow `env:` block next to Formspree (see `.github/workflows/deploy.yml`), then redeploy the site.

Without the secret, the FAB still opens with email / LinkedIn / Contact fallbacks.
