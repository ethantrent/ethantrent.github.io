import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { projects } from "../src/data/projects";
import { writingPosts } from "../src/data/writing";
import { caseStudies } from "../src/data/case-studies";

const routes = [
  "/",
  "/about/",
  "/projects/",
  "/writing/",
  "/contact/",
  "/experience/",
  "/skills/",
  "/privacy/",
  ...projects.map((p) => p.href),
  ...writingPosts.map((p) => `/writing/${p.slug}/`),
];

test.beforeEach(async ({ page }) => {
  // No test can submit a real inquiry or call a production model.
  await page.route("https://formspree.io/**", (route) => route.abort());
  await page.route("https://portfolio-assistant.test/**", (route) =>
    route.abort(),
  );
  await page.route("https://ask-ethan.neat-fang.workers.dev/**", (route) =>
    route.abort(),
  );
});

for (const path of routes) {
  test(`route, images and accessibility: ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    // Scroll to load every lazy image before inspecting it.
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty("complete", true);
      expect(
        await img.evaluate((el: HTMLImageElement) => el.naturalWidth),
      ).toBeGreaterThan(0);
    }
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
    expect(errors).toEqual([]);
    const url = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(url).toBe(`https://ethantrent.github.io${path}`);
    await expect(
      page.locator('meta[property="og:image"]').first(),
    ).toHaveAttribute("content", "https://ethantrent.github.io/og.png");
  });
}

for (const width of [375, 768, 1024, 1440]) {
  test(`responsive review at ${width}px`, async ({ page }) => {
    test.setTimeout(120_000);
    await mkdir("review", { recursive: true });
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/about/",
      "/projects/",
      "/projects/financial-literacy-rag/",
      "/projects/eval-launch-readiness/",
      "/projects/financial-literacy-discovery/",
      "/projects/auditai/",
      "/projects/byui-chatbot/",
      "/projects/u2/",
      "/projects/coding-interviews/",
      "/writing/",
      "/writing/ai-pm-philosophy/",
      "/writing/auditai-case-study/",
      "/writing/how-i-spec-ai-features/",
      "/privacy/",
      "/experience/",
      "/skills/",
      "/contact/",
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      for (const img of await page.locator("img").all())
        await img.scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0, 0));
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      const name =
        path === "/"
          ? "home"
          : path.replace(/^\//, "").replaceAll("/", "-").replace(/-$/, "");
      await page.screenshot({
        path: `review/after-${name}-${width}.png`,
        fullPage: true,
        caret: "initial",
      });
      if (path === "/")
        await page.screenshot({
          path: `review/after-home-viewport-${width}.png`,
          caret: "initial",
        });
    }
  });
}

test("project anchors preserve incoming links", async ({ page }) => {
  for (const project of projects) {
    await page.goto(project.href);
    for (const section of caseStudies[project.id]) {
      for (const id of [section.id, ...section.aliases])
        await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
    }
    for (const link of await page.locator('a[href^="#"]').all()) {
      const href = await link.getAttribute("href");
      await expect(page.locator(href!)).toHaveCount(1);
    }
  }
});

test("homepage introduces Ethan and reaches varied selected work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const firstContribution = page.locator(
    '[data-project="auditai-ics"] [data-contribution]',
  );
  await page.evaluate(() => document.fonts.ready);
  const bounds = await firstContribution.boundingBox();
  expect(bounds && bounds.y + bounds.height <= 900).toBe(true);
  const titleBounds = await page.locator('[data-project="auditai-ics"] h3').boundingBox();
  expect(titleBounds && titleBounds.y + titleBounds.height <= 900).toBe(true);
  await expect(
    page.locator('#selected-work img[src$="auditai-architecture.svg"]'),
  ).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "I’m Ethan Trent.",
  );
  await expect(page.locator("main")).toContainText("Ethan Trent");
  await expect(page.locator("main")).toContainText("Dallas");
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL(/#selected-work$/);
  const names = await page.locator("#selected-work h3").allTextContents();
  expect(names).toEqual([
    "AuditAI", "BYU–I Support Agent", "U2",
  ]);
  await expect(page.getByRole("region", { name: "More work" }).getByRole("link")).toHaveText([
    "Coding Interviews club", "Explore public code",
  ]);
  await expect(
    page.getByRole("button", { name: "Ask Ethan · AI assistant", exact: true }),
  ).toHaveCount(1);
});

test("keyboard menu, focus return, and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  expect(
    await page
      .getByRole("link", { name: "Skip to content" })
      .evaluate((el) => getComputedStyle(el).outlineStyle),
  ).not.toBe("none");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Navigation" });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await trigger.click();
  await dialog.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(dialog).not.toBeVisible();
});

for (const success of [true, false]) {
  test(`contact ${success ? "success" : "error"} with mocked request`, async ({
    page,
  }) => {
    let requests = 0;
    await page.route("https://formspree.io/f/portfolio-test", async (route) => {
      requests++;
      expect(route.request().method()).toBe("POST");
      await route.fulfill({
        status: success ? 200 : 503,
        json: success ? { ok: true } : { error: "test" },
      });
    });
    await page.goto("/contact/");
    await page
      .getByRole("button", { name: "Send message", exact: true })
      .click();
    expect(requests).toBe(0);
    await page.getByLabel("Name (required)").fill("Review Test");
    await page.getByLabel("Email (required)").fill("review@example.test");
    await page
      .getByLabel("Message (required)")
      .fill("Mocked local acceptance test. Do not deliver.");
    await page
      .getByRole("button", { name: "Send message", exact: true })
      .click();
    if (success) {
      await expect(
        page.getByRole("heading", { name: "Message sent" }),
      ).toBeVisible();
      await page.getByRole("button", { name: "Send another message" }).click();
      await expect(page.getByLabel("Name (required)")).toHaveValue("");
    } else {
      await expect(page.locator("main").getByRole("alert")).toContainText(
        "Couldn’t send",
      );
      await expect(page.getByLabel("Message (required)")).toHaveValue(
        "Mocked local acceptance test. Do not deliver.",
      );
    }
    expect(requests).toBe(1);
  });
}

test("assistant is deliberate, accessible, and recovers after unavailable responses", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  let requests = 0;
  await page.route("https://portfolio-assistant.test/", async (route) => {
    requests++;
    expect(route.request().postDataJSON()).toEqual({
      message: "What is Ethan doing now?",
    });
    await route.fulfill(
      requests === 1
        ? { status: 503, json: { error: "unavailable" } }
        : {
            json: {
              reply:
                "Ethan is a Specialist, Digital Product Management at Charles Schwab, on Assistants & Search.",
            },
          },
    );
  });
  await page.goto("/");
  expect(requests).toBe(0);
  const trigger = page.getByRole("button", {
    name: "Ask Ethan · AI assistant",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Ask Ethan" });
  await expect(dialog).toContainText(
    "An AI portfolio assistant, not Ethan himself.",
  );
  expect(requests).toBe(0);
  await expect(
    page.getByRole("button", { name: "Close assistant" }),
  ).toBeFocused();
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
  await page.getByLabel("Your question").fill("What is Ethan doing now?");
  await page.getByRole("button", { name: "Send question" }).click();
  await expect(dialog.getByRole("alert")).toContainText("Couldn’t reach");
  await page.getByLabel("Your question").fill("What is Ethan doing now?");
  await page.getByRole("button", { name: "Send question" }).click();
  await expect(page.getByRole("log")).toContainText(
    "Specialist, Digital Product Management",
  );
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(dialog).not.toBeVisible();
  expect(requests).toBe(2);
});
