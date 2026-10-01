import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = ["/", "/projects", "/timeline", "/about"];
const pt = (path: string) => (path === "/" ? "/pt" : `/pt${path}`);

for (const path of PAGES) {
  for (const [lang, url] of [
    ["en", path],
    ["pt-PT", pt(path)],
  ] as const) {
    test(`${url} renders in ${lang} with no accessibility violations`, async ({
      page,
    }) => {
      await page.goto(url);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(
        violations.map(
          (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`,
        ),
      ).toEqual([]);
    });
  }
}

test("the language switch keeps the page", async ({ page, isMobile }) => {
  test.skip(isMobile, "the switch is in the phone menu (covered below)");
  await page.goto("/projects");
  await page
    .getByRole("navigation", { name: "Language" })
    .getByRole("link", { name: "pt" })
    .click();
  await expect(page).toHaveURL(/\/pt\/projects$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
  await page
    .getByRole("navigation", { name: "Idioma" })
    .getByRole("link", { name: "en" })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
});

test("a chosen theme survives a reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.locator(".site-header .theme-toggle").first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("the phone menu opens, closes and navigates", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "phones only");
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await expect(menu).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();
  await menu.getByRole("link", { name: "Timeline" }).click();
  await expect(page).toHaveURL(/\/timeline$/);
  await expect(menu).toBeHidden();
});

test("an unknown address shows the 404 page", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Voltar ao início" }),
  ).toBeVisible();
});
