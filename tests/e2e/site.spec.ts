import { expect, test } from "@playwright/test";

test("the language switch keeps the page", async ({ page, isMobile }) => {
  test.skip(isMobile, "on phones the switch is in the menu");
  await page.goto("/projects");
  await page
    .getByRole("navigation", { name: "Language" })
    .getByRole("link", { name: "pt" })
    .click();
  await expect(page).toHaveURL(/\/pt\/projects$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
  await page.getByRole("navigation", { name: "Idioma" }).getByRole("link", { name: "en" }).click();
  await expect(page).toHaveURL(/\/projects$/);
});

test("a chosen theme survives a reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("banner").getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("the phone menu opens, closes and navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "the menu is for phones");
  await page.goto("/");
  const menu = page.getByRole("dialog", { name: "Menu" });

  await page.getByRole("button", { name: "Menu" }).click();
  await expect(menu).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();
  await menu.getByRole("link", { name: "Timeline" }).click();
  await expect(page).toHaveURL(/\/timeline$/);
  await expect(menu).toBeHidden();
});

test("outline buttons keep their thin border and a full focus ring", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop is enough");
  await page.goto("/");
  const cv = page.getByRole("main").getByRole("link", { name: "Download CV" }).first();

  await expect(cv).toHaveCSS("outline-style", "none");
  await cv.focus();
  await expect(cv).toHaveCSS("outline-width", "2px");
});

test("an unknown address shows the 404 page in both languages", async ({ page }) => {
  const response = await page.goto("/no-such-page");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Voltar ao início" })).toBeVisible();
});

test("every internal link on every page points to something that exists", async ({
  page,
  request,
  isMobile,
}) => {
  test.skip(isMobile, "the pages and links are the same on phones");
  test.setTimeout(120_000);
  const seen = new Set<string>();
  const queue = ["/", "/pt"];
  const broken: string[] = [];

  async function checkFile(from: string, file: string) {
    if (seen.has(file)) return;
    seen.add(file);
    const response = await request.get(file);

    if (response.status() !== 200) broken.push(`${from}: ${file} → ${response.status()}`);
  }

  while (queue.length) {
    const url = queue.shift()!;

    if (seen.has(url)) continue;
    seen.add(url);
    const response = await request.get(url);

    if (response.status() !== 200) {
      broken.push(`${url} → ${response.status()}`);
      continue;
    }
    await page.goto(url);
    const hrefs = await page.$$eval("a[href]", (links) =>
      links.map((a) => a.getAttribute("href")!),
    );

    for (const href of hrefs) {
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const path = href.split("#")[0];

      if (!path) continue;
      if (/\.(pdf|png|webp)$/.test(path)) await checkFile(url, path);
      else if (!seen.has(path)) queue.push(path);
    }
  }

  expect(broken).toEqual([]);
  expect(seen.size).toBeGreaterThan(40);
});
