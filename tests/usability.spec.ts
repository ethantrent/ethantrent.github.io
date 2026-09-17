import { expect, test, type Page, type Locator } from "@playwright/test";

// Text-only enlargement plus user spacing overrides, not browser zoom.
async function enlargeText(page: Page) {
  // Wait for client controls before changing DOM styles for this test.
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Navigation", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("body *"));
    const sizes = elements.map((el) => parseFloat(getComputedStyle(el).fontSize));
    elements.forEach((el, i) =>
      el.style.setProperty("font-size", `${sizes[i] * 2}px`, "important"),
    );
  });
  await page.addStyleTag({ content: `
    * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }
    p { margin-bottom: 2em !important; }
  ` });
}

async function noPageOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

async function keyboardReachable(control: Locator) {
  // Tab/Shift+Tab causes the browser to reveal a focus target in its scroll container.
  await control.focus();
  await control.press("Tab");
  await control.page().keyboard.press("Shift+Tab");
  await expect(control).toBeFocused();
  await expect(control).toBeInViewport({ ratio: 1 });
}

test.beforeEach(async ({ page }) => {
  await page.route("https://**/*", (route) => route.abort());
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("intro contact link and input readability", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");
  const intro = page.locator('section[aria-labelledby="home-title"]');
  await expect(intro.getByRole("link")).toHaveText(["Explore my work", "About me", "Contact"]);
  const contact = intro.getByRole("link", { name: "Contact", exact: true });
  expect((await contact.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await contact.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/contact\/$/);
  for (const input of await page.locator('main input:not([type="hidden"]), main textarea').all()) {
    expect(await input.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBe(16);
  }
  for (const label of await page.locator("main form label").all()) {
    expect(await label.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBe(14);
  }
  await page.getByRole("button", { name: "Ask Ethan · AI assistant" }).click();
  expect(await page.getByLabel("Your question").evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBe(16);
});

test("320px enlarged text preserves navigation and contact access", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 600 });
  await page.goto("/");
  await enlargeText(page);
  await noPageOverflow(page);
  const header = page.locator("header").first();
  const brand = header.getByRole("link", { name: "Ethan Trent" });
  const headerBox = (await header.boundingBox())!;
  const brandBox = (await brand.boundingBox())!;
  expect(brandBox.y).toBeGreaterThanOrEqual(headerBox.y);
  expect(brandBox.y + brandBox.height).toBeLessThanOrEqual(headerBox.y + headerBox.height);
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.click();
  const dialog = page.getByRole("dialog", { name: "Navigation", exact: true });
  await keyboardReachable(dialog.getByRole("link", { name: "Contact", exact: true }));
  await keyboardReachable(dialog.getByRole("button", { name: "Close menu" }));
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  const projectLinks = page.locator('[data-project="auditai-ics"] [data-project-links] a');
  await expect(projectLinks).toHaveCount(1);
  for (const link of await projectLinks.all()) await keyboardReachable(link);
  const introContact = page.locator('section[aria-labelledby="home-title"]').getByRole("link", { name: "Contact", exact: true });
  await keyboardReachable(introContact);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/contact\/$/);
  await enlargeText(page);
  await noPageOverflow(page);
  await keyboardReachable(page.getByRole("button", { name: "Send message", exact: true }));
  await expect(page.getByLabel("Email (required)")).toBeEditable();
  await page.screenshot({ path: "review/usability-contact-enlarged-320.png" });
});

test("enlarged case contents and image viewer remain operable", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 600 });
  await page.goto("/projects/byui-chatbot/");
  await enlargeText(page);
  await noPageOverflow(page);
  const summary = page.locator("main summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  const section = page.locator("main details").getByRole("link", { name: "Decisions and evidence" });
  await keyboardReachable(section);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#decisions$/);
  const trigger = page.getByRole("link", { name: /^View image:.*Pell Grants/ });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Image viewer" });
  const close = dialog.getByRole("button", { name: "Close image viewer" });
  await expect(close).toBeFocused();
  const region = dialog.getByRole("region", { name: "Image detail" });
  expect((await region.boundingBox())!.height).toBeGreaterThanOrEqual(150);
  const original = dialog.getByRole("button", { name: "Original size", exact: true });
  await keyboardReachable(original);
  await page.keyboard.press("Enter");
  await expect(dialog.getByRole("button", { name: "Fit image", exact: true })).toBeVisible();
  await expect(region.locator("img")).toHaveJSProperty("naturalWidth", 3024);
  await expect.poll(() => region.evaluate(el => el.scrollWidth)).toBe(3024);
  await region.focus();
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => region.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  const fullImage = dialog.getByRole("link", { name: "Open original image" });
  await keyboardReachable(fullImage);
  expect(await dialog.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
  const caption = dialog.locator("p");
  expect(await caption.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.screenshot({ path: "review/usability-viewer-caption-enlarged-320.png" });
  await keyboardReachable(close);
  await page.screenshot({ path: "review/usability-viewer-controls-enlarged-320.png" });
  await noPageOverflow(page);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await noPageOverflow(page);
});

test("project descriptions and public code links reflow with enlarged text", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 600 });
  for (const path of [
    "/projects/", "/about/", "/skills/",
    "/projects/auditai/", "/projects/u2/", "/projects/coding-interviews/",
    "/projects/financial-literacy-rag/",
  ]) {
    await page.goto(path);
    await enlargeText(page);
    await noPageOverflow(page);
    if (path === "/projects/") {
      await keyboardReachable(page.getByRole("link", { name: "Capabilities with examples" }));
      for (const link of await page.locator("#public-code a").all()) await keyboardReachable(link);
    } else if (path === "/projects/financial-literacy-rag/") {
      await keyboardReachable(page.locator("main").getByRole("link", { name: "Explore my work" }));
    } else if (path.includes("/projects/")) {
      const summary = page.locator("main summary");
      await summary.focus();
      await page.keyboard.press("Enter");
      const link = page.locator("main details").getByRole("link", { name: "Decisions and evidence" });
      await keyboardReachable(link);
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/#decisions$/);
      await expect(page.locator("main article > section")).toHaveCount(5);
    }
  }
});
