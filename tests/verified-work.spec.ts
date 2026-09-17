import { test, expect } from "@playwright/test";
import { capabilities } from "../src/data/capabilities";
import { publicCode } from "../src/data/public-code";
import { projects } from "../src/data/projects";

const retiredPaths = [
  "/projects/financial-literacy-rag/",
  "/projects/eval-launch-readiness/",
  "/projects/financial-literacy-discovery/",
];

test.beforeEach(async ({ page }) => {
  await page.route("https://**/*", (route) => route.abort());
});

for (const path of retiredPaths) {
  test(`old draft route preserves navigation without accomplishments: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Case study unavailable");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
    await expect(page.locator('meta[name="description"]')).not.toHaveAttribute("content", /I built|I framed|I assembled/);
    await expect(page.locator("main")).not.toContainText(/I built|I prepared|I assembled|future.state|assumed.complete/i);
    const link = page.locator("main").getByRole("link", { name: "Explore my work" });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/projects\/$/);
  });
}

test("capabilities use published evidence and distinguish learning interests", async ({ page }) => {
  await page.goto("/skills/");
  await expect(page.locator("main h2")).toHaveText(capabilities.map(c => c.title));
  for (const capability of capabilities) {
    const section = page.locator("main section").filter({ has: page.getByRole("heading", { name: capability.title, exact: true }) });
    await expect(section).toContainText(capability.body);
    const link = section.getByRole("link", { name: capability.example });
    await expect(link).toHaveAttribute("href", capability.href);
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(capability.href.slice(capability.href.indexOf("#")))).toBeInViewport();
    await page.goto("/skills/");
  }
  await expect(page.locator("main")).toContainText("I’m developing my evaluation and security knowledge");
  await expect(page.locator("main")).not.toContainText(/For technical|Anthropic|MSAI|2031|2036|I built the citation-first/);
  await page.goto("/experience/");
  await expect(page.locator("main")).toContainText("June 2026");
  await expect(page.locator("main")).not.toContainText(/August 2026|2031|2036|MSAI/);
});

for (const path of ["/", "/projects/"]) {
  test(`confirmed project order and keyboard case navigation: ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(path);
    expect(await page.locator("[data-project]").evaluateAll(nodes => nodes.map(node => node.getAttribute("data-project")))).toEqual(
      path === "/"
        ? ["auditai-ics", "byui-chatbot", "u2-madisontek"]
        : ["auditai-ics", "byui-chatbot", "u2-madisontek", "coding-interviews"],
    );
    const campus = page.locator('[data-project="byui-chatbot"]');
    await expect(campus.locator("figure img")).toBeVisible();
    await expect(campus.locator("figcaption")).toContainText("institutional beta");
    await expect(campus).toContainText("Usage is not reported here.");
    await expect(page.locator('[data-project="auditai-ics"]')).toContainText("The project reported about 30%");
    await expect(page.locator('[data-project="u2-madisontek"]')).toContainText("this describes prototyping");
    await expect(page.locator("main")).not.toContainText(/students served|financial-information assistant|340M/);
    const link = page.locator('[data-project="auditai-ics"] [data-project-links] a');
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/projects\/auditai\/$/);
    await expect(page.locator("main article > section")).toHaveCount(5);
  });
}

test("public code links expose scope without inventing team results", async ({ page }) => {
  await page.goto("/projects/");
  await expect(page.locator("main")).toContainText("These project repositories aren’t public");
  for (const project of publicCode) {
    await expect(page.locator("#public-code").getByRole("link", { name: project.name, exact: true })).toHaveAttribute("href", project.href);
    await expect(page.locator("#public-code")).toContainText(project.limitations);
  }
  await page.goto("/about/");
  await expect(page.locator("main")).toContainText("Machine Learning Foundations certificate");
  await expect(page.locator("main")).toContainText("Inspired and The Mom Test");
  await expect(page.locator("main")).not.toContainText("financial-information");
});

test("navigation, metadata and sitemap exclude unsupported case accounts", async ({ page, request }) => {
  expect(projects.every(p => p.contentStatus === "verified")).toBe(true);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  for (const path of retiredPaths) expect(xml).not.toContain(path);
  for (const path of ["/", "/projects/", "/about/", "/skills/"]) {
    await page.goto(path);
    for (const retired of retiredPaths) await expect(page.locator(`a[href^="${retired}"]`)).toHaveCount(0);
    await expect(page.locator('meta[name="description"]')).not.toHaveAttribute("content", /independent financial-information assistant/);
  }
  await page.getByRole("button", { name: "Ask Ethan · AI assistant" }).click();
  const dialog = page.getByRole("dialog", { name: "Ask Ethan", exact: true });
  await expect(dialog).not.toContainText("citation-first assistant");
  await expect(dialog).toContainText("Where can I explore Ethan’s public code?");
});
