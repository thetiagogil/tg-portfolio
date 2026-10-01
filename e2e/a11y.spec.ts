import { expect, test } from "@playwright/test";
import { expectAccessible, pt } from "./helpers";

// Every page type in both languages, plus each dialog while open.
const PAGES = [
  "/",
  "/projects",
  "/timeline",
  "/about",
  "/projects/voydex",
  "/projects/lifeflow",
  "/projects/portfolios",
  "/experience/aquasis",
  "/experience/talent-protocol",
  "/education/faul",
  "/education/ironhack",
];

for (const path of PAGES) {
  for (const [url, lang] of [
    [path, "en"],
    [pt(path), "pt-PT"],
  ]) {
    test(`${url} has no accessibility violations`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectAccessible(page);
    });
  }
}

test("the open filters dialog has no accessibility violations", async ({ page }) => {
  await page.goto("/timeline");
  await page.getByRole("button", { name: "Filters" }).click();
  await expect(page.getByRole("dialog", { name: "Filters" })).toBeVisible();
  await expectAccessible(page);
});

test("the open image viewer has no accessibility violations", async ({ page }) => {
  await page.goto("/projects/voydex");
  await page.getByRole("button", { name: /Enlarge: Screenshot 1 of 4/ }).click();
  await expect(page.getByRole("dialog", { name: "Images of Voydex" })).toBeVisible();
  await expectAccessible(page);
});

test("the open phone menu has no accessibility violations", async ({ page, isMobile }) => {
  test.skip(!isMobile, "the menu is for phones");
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
  await expectAccessible(page);
});
