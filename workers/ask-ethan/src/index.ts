/**
 * Ask Ethan — Cloudflare Worker for the portfolio chat FAB.
 * POST JSON { "message": "..." } → { "reply": "..." }
 *
 * Deploy: cd workers/ask-ethan && npm i && npx wrangler deploy
 * Then set NEXT_PUBLIC_ASK_ETHAN_API_URL to the worker URL at Pages build time
 * (GitHub Actions secret) so the static site can call it.
 */

type ChatBody = { message?: string };

const KNOWLEDGE = `
Ethan Trent — AI Product Manager & builder (Dallas, TX).
Current: Digital Product Manager at Charles Schwab (Conversational AI); AI Fellow (Cornell Tech × Break Through Tech).
Open to full-time PM roles.

Case studies:
- AuditAI (ICS): six internal AI agents for a global nonprofit audit org; ~30% automation / ~50% less manual labor on scoped workflows; human review gates + GC-aligned audit trail; 50,000+ auditors / 31,000+ units on modernized AWS platform.
- U2 (KBXCOM): unified property/utility billing SaaS live on AWS (u2qbo.tech); $340M SOM; PRDs + AI analytics roadmap (six ML capabilities).
- BYU–I ChatBot: campus RAG assistant in institutional beta for 20,000+ students (Financial Aid, Registration, Tech); intent design + escalation.
- Coding Interviews club: grew 11 → 30+ members; 40% internship rate among active cohort.

How he works: define “good” before the model; design escalation as first-class product behavior; treat evaluation as a product surface.
Contact: ethanjotrent@gmail.com · LinkedIn linkedin.com/in/ethantrent · portfolio contact form.
`.trim();

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
  if (/byu|chatbot|rag|campus|student/.test(q)) {
    return "I led the BYU–Idaho campus RAG chatbot from student prototype to institutional beta for 20,000+ students — intents, escalation, and evaluation criteria first. Case study: ethantrent.github.io/projects/byui-chatbot/";
  }
  if (/contact|email|resume|linkedin/.test(q)) {
    return "Email ethanjotrent@gmail.com, LinkedIn linkedin.com/in/ethantrent, or use the contact form at ethantrent.github.io/contact/ — resume download is in the site nav.";
  }
  return "I'm Ethan Trent — AI PM focused on turning ambiguous AI problems into shipped, trustworthy products (Schwab Conversational AI; AuditAI agents; campus RAG). Ask about a case study, how I work with stakeholders, or the best way to get in touch.";
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
        {
          role: "system",
          content: `You are Ethan Trent answering briefly (3–6 sentences) for recruiters on his portfolio. Stay factual. Use only this knowledge:\n\n${KNOWLEDGE}\n\nIf unsure, point them to email or a case study URL. First person.`,
        },
        { role: "user", content: message },
      ],
    }),
  });
  if (!res.ok) throw new Error("openai_error");
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("empty");
  return text;
}

export default {
  async fetch(request: Request, env: { OPENAI_API_KEY?: string }): Promise<Response> {
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
      if (env.OPENAI_API_KEY) {
        const reply = await openAiReply(message, env.OPENAI_API_KEY);
        return json({ reply });
      }
      return json({ reply: heuristicReply(message) });
    } catch {
      return json({ reply: heuristicReply(message) });
    }
  },
};
