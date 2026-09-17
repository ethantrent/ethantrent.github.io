import { test, expect } from "@playwright/test";
import worker, { heuristicReply } from "../workers/ask-ethan/src/index";
import { projects } from "../src/data/projects";

test("Worker contract and conservative offline answers", async () => {
  const request = (body: string) =>
    new Request("https://local.test", { method: "POST", body });
  for (const body of [
    "invalid",
    "null",
    "{}",
    '{"message":42}',
    '{"message":" "}',
  ]) {
    expect((await worker.fetch(request(body), {})).status).toBe(400);
  }
  expect(
    (await worker.fetch(new Request("https://local.test"), {})).status,
  ).toBe(405);
  expect(
    (
      await worker.fetch(
        new Request("https://local.test", { method: "OPTIONS" }),
        {},
      )
    ).status,
  ).toBe(204);
  const response = await worker.fetch(
    request('{"message":"current role"}'),
    {},
  );
  expect(response.status).toBe(200);
  expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
  expect((await response.json()).reply).toContain(
    "Specialist, Digital Product Management at Charles Schwab",
  );
  for (const [query, id] of [
    ["AuditAI", "auditai-ics"],
    ["campus Support Agent", "byui-chatbot"],
    ["U2", "u2-madisontek"],
    ["interview club", "coding-interviews"],
  ]) {
    const project = projects.find((p) => p.id === id)!;
    expect(heuristicReply(query)).toContain(
      project.contribution.replace(/^I /, "Ethan "),
    );
    expect(heuristicReply(query)).toContain(project.outcome);
  }
  expect(heuristicReply("How did Ethan get into product?")).toContain(
    "physical therapy",
  );
  expect(heuristicReply("résumé")).toContain("through summer 2026");
  const u2Reply = heuristicReply("Was Ethan the U2 developer?");
  expect(u2Reply).toContain("Ethan was U2’s sole developer");
  expect(u2Reply).toContain("Paid internship: July–December 2025");
  expect(u2Reply).toContain("Project work continued into 2026");
  expect(u2Reply).not.toMatch(/co-built|AWS|six-capability/);
  const campusReply = heuristicReply("Who developed the BYU-I prototype?");
  expect(campusReply).toContain("Ethan was the sole developer of the prototype");
  expect(campusReply).toContain(
    "The university adapted the prototype, refined it, and connected it to the byui.edu site.",
  );
  expect(campusReply).toContain("Usage is not reported here.");
  expect(campusReply).not.toMatch(/(?:^|\s)(I|my)\b|fine.tun|students served/);
});

test("Worker shares facts with model and falls back on provider failure", async () => {
  const request = () =>
    new Request("https://local.test", {
      method: "POST",
      body: '{"message":"current role"}',
    });
  let prompt = "";
  const result = await worker.fetch(request(), {
    AI: {
      run: async (_model, input) => {
        prompt = input.messages[0].content;
        return { response: "A mocked answer." };
      },
    },
  });
  expect(await result.json()).toEqual({ reply: "A mocked answer." });
  expect(prompt).toContain("not Ethan himself");
  expect(prompt).toContain("prototype cycles");
  expect(prompt.toLowerCase()).toContain("usage is not reported");
  expect(prompt).toContain("U2 (2025–2026)");
  expect(prompt).toContain("Paid internship: July–December 2025");
  expect(prompt).toContain("Project work continued into 2026");
  expect(prompt).toContain("Sole prototype developer and requirements author");
  expect(prompt).toContain("refined it, and connected it to the byui.edu site");
  expect(prompt).not.toContain("Editorial provenance: assumed-complete");
  expect(prompt).toContain("Do not present roadmap plans, archived drafts");
  expect(prompt).toContain("AI systems and developer platforms");
  expect(prompt).not.toContain("I built the citation-first assistant");
  expect(prompt).toContain("since June 2026");
  expect(prompt).toContain("Machine Learning Foundations certificate");
  expect(prompt).toContain("public starter materials");
  expect(prompt).not.toContain("For technical AI product roles:");
  const fallback = await worker.fetch(request(), {
    AI: {
      run: async () => {
        throw new Error("mock provider unavailable");
      },
    },
  });
  expect((await fallback.json()).reply).toBe(heuristicReply("current role"));
});

test("assistant excludes archived accomplishments and describes available evidence", async () => {
  for (const question of [
    "Tell me about the citation-first assistant",
    "Did Ethan actually complete the financial-information project?",
    "What MCP workshops did Ethan deliver?",
    "What was the result of the red-team review?",
  ]) {
    const reply = heuristicReply(question);
    expect(reply).toContain("No completed-project evidence for that work is published here");
    expect(reply).not.toMatch(/financial-literacy-rag|eval-launch-readiness|financial-literacy-discovery/);
  }
  const capabilitiesReply = heuristicReply("What are Ethan’s capabilities?");
  expect(capabilitiesReply).toContain("https://ethantrent.github.io/skills/");
  expect(capabilitiesReply).toContain("sole development and requirements for U2");
  expect(heuristicReply("What analytics did Ethan work on?")).toContain("developing his evaluation and security knowledge");
  expect(heuristicReply("Tell me about Cravyr")).toContain("https://github.com/ethantrent/cravyr");
  expect(heuristicReply("Tell me about ProfScore")).toContain("not a verified compatibility guarantee");
  expect(heuristicReply("Tell me about Swytch")).toContain("results are not yet documented");
  expect(heuristicReply("Where can I explore Ethan’s public code?")).toContain("their source repositories are not public");
  expect(heuristicReply("What has Ethan been reading?")).toContain("Completed reading Inspired and The Mom Test");
});

test("new project questions fall back on mocked provider failure", async () => {
  const message = "Tell me about evaluation and guardrails";
  const response = await worker.fetch(new Request("https://local.test", {
    method: "POST", body: JSON.stringify({ message }),
  }), {
    AI: { run: async () => { throw new Error("mock provider unavailable"); } },
  });
  expect(await response.json()).toEqual({ reply: heuristicReply(message) });
});
