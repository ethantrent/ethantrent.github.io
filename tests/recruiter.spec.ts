import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.route("https://**/*", (route) => route.abort());
});

test("mobile project reading order and recruiter links", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");
  const hero = page.locator('section[aria-labelledby="home-title"]');
  await expect(hero).toContainText(
    "I’m Ethan Trent.",
  );
  await expect(hero.getByRole("img", { name: "Ethan Trent" })).toBeVisible();
  await expect(page.locator('main img[alt="Ethan Trent"]')).toHaveCount(1);
  for (const path of ["/", "/projects/"]) {
    await page.goto(path);
    for (const feature of await page.locator("[data-project]").all()) {
    const contribution = feature.locator("[data-contribution]");
    const result = feature.locator("[data-outcome]");
    const links = feature.locator("[data-project-links]");
    for (const [group, label] of [
      [contribution, "My contribution"],
      [result, "Outcome"],
    ] as const) {
      const caption = group.getByText(label, { exact: true });
      await expect(caption).toHaveCount(1);
      await expect(caption).toHaveCSS("font-size", "14px");
    }
    const selectors = [
      "h2, h3",
      "[data-contribution]",
      ...((await feature.locator("figure").count()) ? ["figure"] : []),
      "[data-outcome]",
      "[data-project-links]",
    ];
    let previousBottom = 0;
    for (const selector of selectors) {
      const bounds = await feature.locator(selector).boundingBox();
      expect(bounds!.y).toBeGreaterThanOrEqual(previousBottom);
      previousBottom = bounds!.y + bounds!.height;
    }
    expect(
      await contribution.evaluate((el) =>
        Boolean(
          el.compareDocumentPosition(
            el.parentElement!.querySelector("[data-outcome]")!,
          ) & Node.DOCUMENT_POSITION_FOLLOWING,
        ),
      ),
    ).toBe(true);
    await expect(result).toHaveCount(1);
    await expect(links).toHaveCount(1);
    }
  }
  await page.goto("/contact/");
  const direct = page.getByRole("navigation", { name: "Direct contact" });
  await expect(direct.getByRole("link", { name: "LinkedIn" })).toBeVisible();
  const contactBounds = await direct.boundingBox();
  await expect(page.locator("form").first()).toBeVisible();
  const formBounds = await page.locator("form").first().boundingBox();
  expect(contactBounds!.y + contactBounds!.height).toBeLessThan(formBounds!.y);
  await page.goto("/about/");
  const header = page.locator("main header");
  await expect(header.getByRole("link", { name: "LinkedIn" })).toBeVisible();
  const resume = header.getByRole("link", {
    name: "Résumé — through summer 2026",
  });
  await expect(resume).toHaveAttribute("download", "");
  expect(
    (await page.request.get((await resume.getAttribute("href"))!)).status(),
  ).toBe(200);
});

test("prototype ownership stays consistent across public pages", async ({ page }) => {
  for (const path of [
    "/projects/", "/projects/byui-chatbot/", "/about/", "/skills/",
    "/writing/ai-pm-philosophy/", "/writing/how-i-spec-ai-features/",
  ]) {
    await page.goto(path);
    const main = page.locator("main");
    await expect(main).toContainText(/sole developer of (the|the campus|the BYU–I Support Agent|the campus Support Agent) prototype/);
    await expect(main).toContainText("refined it, and connected it to the byui.edu site");
    await expect(main).not.toContainText(/fine.tuned|students served/i);
  }
  await page.goto("/projects/");
  const capabilities = page.getByRole("link", { name: "Capabilities with examples" });
  await capabilities.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/skills\/$/);
  await expect(page.getByRole("heading", { name: "AI systems and developer platforms" })).toBeVisible();
  await page.goto("/about/");
  const prose = await page.locator(".prose-copy > p").allTextContents();
  const words = prose.join(" ").trim().split(/\s+/).length;
  expect(words).toBeGreaterThanOrEqual(350);
  expect(words).toBeLessThanOrEqual(500);
});

test("case contents disclosure preserves section navigation", async ({
  page,
}) => {
  for (const width of [375, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/projects/u2/");
    const disclosure = page.locator("main details");
    await expect(disclosure).not.toHaveAttribute("open");
    const summary = disclosure.locator("summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(disclosure).toHaveAttribute("open", "");
    await disclosure.getByRole("link", { name: "My contribution" }).click();
    await expect(page).toHaveURL(/#contribution$/);
    await expect(page.locator("#contribution")).toBeInViewport();
  }
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.locator("main summary")).not.toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "In this case study" }),
  ).toBeVisible();
});

test("artifact viewer fits, zooms, scrolls and returns keyboard focus", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/projects/byui-chatbot/");
    const trigger = page.getByRole("link", {
      name: /^View image:.*Pell Grants/,
    });
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog", { name: "Image viewer" });
    const close = dialog.getByRole("button", { name: "Close image viewer" });
    await expect(dialog).toBeVisible();
    await expect(close).toBeFocused();
    await expect(dialog).toContainText(
      "Institutional beta example showing a financial-aid question and response.",
    );
    const region = dialog.getByRole("region", { name: "Image detail" });
    await expect(region.locator("img")).toHaveJSProperty("naturalWidth", 3024);
    expect(
      await region.evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
    const zoom = dialog.getByRole("button", {
      name: "Original size",
      exact: true,
    });
    expect((await zoom.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await zoom.click();
    await expect.poll(() => region.evaluate((el) => el.scrollWidth)).toBe(3024);
    await region.focus();
    await page.keyboard.press("ArrowRight");
    await expect
      .poll(() => region.evaluate((el) => el.scrollLeft))
      .toBeGreaterThan(0);
    await dialog
      .getByRole("button", { name: "Fit image", exact: true })
      .click();
    await expect.poll(() => region.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      expect(
        await dialog.evaluate((el) => el.contains(document.activeElement)),
      ).toBe(true);
    }
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.screenshot({
      path: `review/after-image-viewer-${width}.png`,
      caret: "initial",
    });
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
    await trigger.click();
    await close.click();
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page.mouse.click(2, 2);
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  }
});

test("artifact and contents links work without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 900 },
  });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/projects/byui-chatbot/`);
    await page.locator("main summary").click();
    await page
      .locator("main details")
      .getByRole("link", { name: "Decisions and evidence" })
      .click();
    await expect(page).toHaveURL(/#decisions$/);
    await page.getByRole("link", { name: /^View image:.*Pell Grants/ }).focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(
      /\/artifacts\/byui-support-agent-interaction.png$/,
    );
    await expect(page.locator("img")).toHaveJSProperty("naturalWidth", 3024);
  } finally {
    await context.close();
  }
});
