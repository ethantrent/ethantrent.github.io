# Ask Ethan API (Cloudflare Worker)

HTTPS backend for the portfolio FAB. GitHub Pages cannot host API routes.

## Contract

`POST` JSON `{ "message": "..." }` → `{ "reply": "..." }`

## Current preview deploy

Temporary Worker (claim within ~60 minutes of first deploy or it may expire):

- URL: `https://ask-ethan.neat-fang.workers.dev`
- Claim: https://dash.cloudflare.com/claim-preview?claimToken=UvWyGCwKqm3ZdpXG8925hhsoh4V7d_lxxj__JgONe4Y

After claiming, keep that URL (or redeploy under your account) and ensure Actions secret `NEXT_PUBLIC_ASK_ETHAN_API_URL` matches.

## Deploy (your Cloudflare account)

```bash
cd workers/ask-ethan
npm install
npx wrangler login
npx wrangler deploy
# optional LLM answers:
npx wrangler secret put OPENAI_API_KEY
```

## Wire the static site

Repo secret (wired in `.github/workflows/deploy.yml`):

`NEXT_PUBLIC_ASK_ETHAN_API_URL=https://ask-ethan.<account>.workers.dev`

Redeploy Pages after changing the secret so the static build inlines it.

Without the secret, the FAB still opens with email / LinkedIn / Contact fallbacks.
