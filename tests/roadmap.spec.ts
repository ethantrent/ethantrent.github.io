import { test, expect } from "@playwright/test";
import { roadmapProjects } from "../src/data/roadmap-projects";
import { capabilities } from "../src/data/capabilities";

test.beforeEach(async ({ page }) => {
  await page.route("https://**/*", (route) => route.abort());
});

for (const project of roadmapProjects) {
  test(`case scope, supporting materials, and related navigation: ${project.id}`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(project.href);
    await expect(page.locator("main article > section")).toHaveCount(5);
    await expect(page.locator("#contribution")).toContainText("I ");
    const headings: Record<string, string[]> = {
      "financial-literacy-rag": ["Answer boundaries and implementation", "Helping another developer get started"],
      "eval-launch-readiness": ["Failure analysis", "Tool permissions and residual risks", "Release criteria and workshops"],
      "financial-literacy-discovery": ["Defining useful support", "Measures and product priorities"],
    };
    await expect(page.locator("#decisions h3")).toHaveText(headings[project.id]);
    await expect(page.locator("[data-evidence-slot]")).toHaveCount(0);
    const note = page.locator("#results [data-materials-note]");
    await expect(page.locator("[data-materials-note]")).toHaveCount(1);
    await expect(note).toContainText("Supporting materials are not linked here:");
    await expect(note.locator("a, button")).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText(/future.state|draft scenario|assumed.complete/i);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", project.problem + " " + project.contribution);
    const related = page.getByRole("navigation", { name: "Other perspectives on this project" });
    await expect(related.getByRole("link")).toHaveCount(2);
    const link = related.getByRole("link").first();
    const href = await link.getAttribute("href");
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${href}$`));
  });
}

test("capabilities connect each role direction to cases and preserve earlier examples", async ({ page }) => {
  await page.goto("/skills/");
  await expect(page.locator("main h2")).toHaveText(capabilities.map(c => c.title));
  for (const capability of capabilities) {
    const section = page.locator("main section").filter({ has: page.getByRole("heading", { name: capability.title, exact: true }) });
    await expect(section).toContainText(capability.body);
    await expect(section.getByRole("link", { name: capability.example })).toHaveAttribute("href", capability.href);
    await expect(section.getByText("Earlier work", { exact: true })).toBeVisible();
  }
  await expect(page.locator("main")).not.toContainText(/For technical|For API|For AI quality|For technical enablement|Anthropic|Capital One|MSAI|2031|2036/);
  await page.goto("/experience/");
  await expect(page.locator("main")).toContainText("through September 2026");
  await expect(page.locator("main")).not.toContainText(/2031|2036|MSAI/);
});

for (const path of ["/", "/projects/"]) {
  test(`one assistant feature and keyboard chapter navigation: ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(path);
    const features = page.locator("[data-project]");
    expect(await features.evaluateAll(nodes => nodes.map(node => node.getAttribute("data-project")))).toEqual(
      path === "/"
        ? ["financial-literacy-rag", "byui-chatbot", "u2-madisontek"]
        : ["financial-literacy-rag", "auditai-ics", "byui-chatbot", "u2-madisontek", "coding-interviews"],
    );
    if (path === "/") {
      const intro = page.locator('section[aria-labelledby="home-title"]');
      await expect(intro).toContainText("I work on Assistants & Search at Charles Schwab.");
      await expect(page.getByText("I originally thought I’d go into physical therapy. An introductory programming class changed my plans.", { exact: true })).toHaveCount(1);
      await expect(page.locator("main h2")).not.toContainText(["About me"]);
    }
    const campus = page.locator('[data-project="byui-chatbot"]');
    await expect(campus.locator("figure img")).toBeVisible();
    await expect(campus.locator("figcaption")).toContainText("beta");
    await expect(campus).toContainText("Usage is not reported here.");
    for (const [label, href] of [
      ["Building it", "/projects/financial-literacy-rag/"],
      ["Evaluating it", "/projects/eval-launch-readiness/"],
      ["Defining useful support", "/projects/financial-literacy-discovery/"],
    ]) {
      await page.goto(path);
      const link = page.locator('[data-project="financial-literacy-rag"] [data-project-links]').getByRole("link", { name: label, exact: true });
      await expect(link).toHaveAttribute("href", href);
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      await link.focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`${href}$`));
      await expect(page.locator("#problem")).toContainText(/independent project|same public-data|perspective on the financial-information/);
    }
  });
}
