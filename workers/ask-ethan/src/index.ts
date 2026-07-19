/**
 * Ask Ethan — Cloudflare Worker for the portfolio chat FAB.
 * POST JSON { "message": "..." } → { "reply": "..." }
 *
 * Reply order:
 * 1. Workers AI (free Llama on Cloudflare) when AI binding is available
 * 2. OpenAI if OPENAI_API_KEY secret is set
 * 3. Keyword heuristics (always works offline)
 */

type ChatBody = { message?: string };

type AiBinding = {
  run: (
    model: string,
    input: {
      messages: { role: string; content: string }[];
      max_tokens?: number;
    },
  ) => Promise<{ response?: string } | string>;
};

type Env = {
  AI?: AiBinding;
  OPENAI_API_KEY?: string;
};

// llama-3.1-8b-instruct was deprecated 2026-05-30 on Workers AI.
const MODEL = "@cf/meta/llama-3.2-3b-instruct";

const KNOWLEDGE = `
Ethan Trent — AI Product Manager & builder (Dallas, TX).
Current: Digital Product Manager at Charles Schwab (Conversational AI); AI Fellow (Cornell Tech × Break Through Tech).
Open to full-time PM roles.

Case studies:
- AuditAI (ICS): six internal AI agents for a global nonprofit audit org; ~30% automation / ~50% less manual labor on scoped workflows; human review gates + GC-aligned audit trail; 50,000+ auditors / 31,000+ units on modernized AWS platform.
- U2 (KBXCOM): unified property/utility billing SaaS live on AWS (u2qbo.tech); $340M SOM; PRDs + AI analytics roadmap (six ML capabilities).
- BYU–I Support Agent: campus RAG assistant in institutional beta for 20,000+ students (Financial Aid, Registration, Tech); intent design + escalation.
- Coding Interviews club: grew 11 → 30+ members; 40% internship rate among active cohort.

How he works: define “good” before the model; design escalation as first-class product behavior; treat evaluation as a product surface.
Contact: ethanjotrent@gmail.com · LinkedIn linkedin.com/in/ethantrent · portfolio contact form at ethantrent.github.io/contact/.
`.trim();

const SYSTEM = `You are Ethan Trent answering briefly (3–6 sentences) for recruiters on his portfolio site. Stay factual. First person. Use only this knowledge:

${KNOWLEDGE}

If unsure, point them to email or a case study URL on ethantrent.github.io. Do not invent metrics, employers, or titles.`;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

function heuristicReply(message: string): string {
  const q = message.toLowerCase();
  if (/schwab|current|role|job|hire|hiring|open/.test(q)) {
    return "I'm a Digital Product Manager at Charles Schwab working on Conversational AI, and an AI Fellow with Cornell Tech × Break Through Tech. I'm open to full-time PM roles — best next step is email (ethanjotrent@gmail.com) or the contact form on ethantrent.github.io.";
  }
  if (/audit|agent|ics|nonprofit|counsel/.test(q)) {
    return "AuditAI shipped six internal agents inside a regulated nonprofit audit org — with human review gates and an audit trail General Counsel signed off on. On scoped workflows we measured ~30% automation and ~50% less manual labor. Full arc: ethantrent.github.io/projects/auditai/";
  }
  if (/u2|billing|kbx|saas/.test(q)) {
    return "U2 is a unified property/utility billing SaaS I co-built at KBXCOM — live on AWS at u2qbo.tech, targeting a $340M SOM, with PRDs and a six-capability AI analytics roadmap. Case study: ethantrent.github.io/projects/u2/";
  }
  if (/byu|chatbot|support.?agent|rag|campus|student/.test(q)) {
    return "I led the BYU–Idaho Support Agent from student prototype to institutional beta for 20,000+ students — intents, escalation, and evaluation criteria first. Case study: ethantrent.github.io/projects/byui-chatbot/";
  }
  if (/contact|email|resume|linkedin/.test(q)) {
    return "Email ethanjotrent@gmail.com, LinkedIn linkedin.com/in/ethantrent, or use the contact form at ethantrent.github.io/contact/ — resume download is in the site nav.";
  }
  return "I'm Ethan Trent — AI PM focused on turning ambiguous AI problems into shipped, trustworthy products (Schwab Conversational AI; AuditAI agents; campus RAG). Ask about a case study, how I work with stakeholders, or the best way to get in touch.";
}

async function workersAiReply(message: string, ai: AiBinding): Promise<string> {
  const result = await ai.run(MODEL, {
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: message },
    ],
    // Keep replies short for free-tier neuron budget.
    max_tokens: 280,
  });
  const text =
    typeof result === "string"
      ? result.trim()
      : typeof result?.response === "string"
        ? result.response.trim()
        : "";
  if (!text) {
    console.error("workers_ai_empty", JSON.stringify(result));
    throw new Error("empty_workers_ai");
  }
  return text;
}

async function openAiReply(message: string, apiKey: string): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: message },
      ],
    }),
  });
  if (!res.ok) throw new Error("openai_error");
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("empty_openai");
  return text;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }
    if (request.method !== "POST") {
      return json({ error: "POST only" }, 405);
    }
    let body: ChatBody;
    try {
      body = (await request.json()) as ChatBody;
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message) return json({ error: "message required" }, 400);

    try {
      if (env.AI) {
        const reply = await workersAiReply(message, env.AI);
        return json({ reply });
      }
      if (env.OPENAI_API_KEY) {
        const reply = await openAiReply(message, env.OPENAI_API_KEY);
        return json({ reply });
      }
      return json({ reply: heuristicReply(message) });
    } catch (err) {
      console.error(
        "ask_ethan_ai_failed",
        err instanceof Error ? err.message : String(err),
      );
      return json({ reply: heuristicReply(message) });
    }
  },
};
