# Ask Ethan API

Optional backend for the footer’s AI portfolio assistant. GitHub Pages serves static files; the Worker remains a separate deployment.

## Contract and facts

`POST` JSON `{ "message": "..." }` returns `{ "reply": "..." }`. `OPTIONS` supports CORS. Invalid inputs receive a 400 response; other methods receive 405.

The prompt and offline fallback import the same public profile and project summaries as the site. Responses describe Ethan in third person, identify current Schwab employment, scope project outcomes conservatively, and avoid unverified credentials or claims that he is actively job hunting. The site identifies the interface as AI, not Ethan himself.

The local roadmap pass adds three accounts drafted under the user's completion assumption. Internal `contentStatus` records `assumed-complete` versus `verified` earlier work. The assistant attributes these accounts to the portfolio, preserves missing-result limits, and explains unavailable evidence when directly asked to verify completion. It does not turn the three perspectives on one independent project into three customer deployments. Concrete contributions and earlier examples come from the shared Capabilities content; employment is dated through September 2026. No request/response shape or provider configuration changed.

Workers AI is used when bound; otherwise an optional OpenAI secret enables that provider. Missing providers or provider errors return a deterministic keyword-based reply. Provider-generated wording is not guaranteed; verify it after a reviewed deployment. Browser acceptance tests mock responses, and Worker contract tests use local fake bindings without calling providers.

## Local validation

From the repository root, run `npm run test:e2e` for contract, fallback, and interface tests. A local Wrangler bundle check can use `npx wrangler deploy --dry-run` from this directory after installing its dependencies. Dry run does not publish.

## Publication after review

Configured destination: `https://ask-ethan.neat-fang.workers.dev`. Deploy only after reviewing the local changes:

```bash
cd workers/ask-ethan
npm ci
npx wrangler deploy
```

An optional `OPENAI_API_KEY` belongs in Worker secrets, never in the public site or repository. `NEXT_PUBLIC_ASK_ETHAN_API_URL` is a public endpoint, not a secret credential. Update it at site build time if the Worker destination changes.
