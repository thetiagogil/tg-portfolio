import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const entries = (page: Page) => page.locator(".entry");
const axe = async (page: Page) => {
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(
    violations.map(
      (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`,
    ),
  ).toEqual([]);
};

test("the timeline renders the chart and every entry, with no accessibility violations", async ({
  page,
}) => {
  await page.goto("/timeline");
  await expect(page.locator(".rrow")).toHaveCount(6);
  await expect(page.locator(".mk")).toHaveCount(17);
  await expect(entries(page)).toHaveCount(23);
  await axe(page);
});

test("tabs, search and sort narrow and reorder the list, and the URL keeps them", async ({
  page,
}) => {
  await page.goto("/timeline");
  await page.getByRole("button", { name: /^Projects/ }).click();
  await expect(entries(page)).toHaveCount(14);
  await page.getByRole("searchbox").fill("pokémon");
  await expect(entries(page)).toHaveCount(1);
  await expect(page).toHaveURL(/cat=projects/);
  await expect(page).toHaveURL(/q=pok/);
  await page.getByRole("searchbox").fill("");
  await page.getByRole("button", { name: "Newest, show oldest first" }).click();
  await expect(entries(page).first()).toContainText("Giraffes vs Sea");
  await page.reload();
  await expect(entries(page)).toHaveCount(14);
  await expect(entries(page).first()).toContainText("Giraffes vs Sea");
});

test("a shared link opens the same filtered view", async ({ page }) => {
  await page.goto("/pt/timeline?now=1");
  await expect(entries(page)).toHaveCount(2);
  await expect(page.locator(".tool-btn .cnt")).toHaveText("1");
});

test("'/' jumps to the search", async ({ page, isMobile }) => {
  test.skip(isMobile, "no keyboard on phones");
  await page.goto("/timeline");
  await page.locator("body").press("/");
  await expect(page.getByRole("searchbox")).toBeFocused();
});

test("the filters modal edits a draft, applies it only on Show, and discards it on close", async ({
  page,
}) => {
  await page.goto("/timeline");
  await page.getByRole("button", { name: "Filters" }).click();
  const modal = page.getByRole("dialog", { name: "Filters" });
  await expect(modal).toBeVisible();
  await axe(page);

  await modal.getByRole("button", { name: /Supabase/ }).click();
  await expect(
    modal.getByRole("button", { name: /Show \d+ results/ }),
  ).toBeVisible();
  await expect(entries(page)).toHaveCount(23); // nothing applied yet
  await page.keyboard.press("Escape");
  await expect(modal).toBeHidden();
  await expect(entries(page)).toHaveCount(23);

  await page.getByRole("button", { name: "Filters" }).click();
  await expect(modal.getByRole("button", { name: /Supabase/ })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await modal.getByRole("button", { name: /Current only/ }).click();
  await expect(modal.getByRole("button", { name: /AutoCAD/ })).toBeDisabled();
  await expect(
    modal.getByRole("button", { name: "Show 2 results" }),
  ).toBeVisible();
  await modal.getByRole("button", { name: "Show 2 results" }).click();
  await expect(modal).toBeHidden();
  await expect(entries(page)).toHaveCount(2);
  await expect(page).toHaveURL(/now=1/);

  await page.getByRole("button", { name: /Filters/ }).click();
  await modal.getByRole("button", { name: "Clear filters" }).click();
  await modal.getByRole("button", { name: "Show 23 results" }).click();
  await expect(entries(page)).toHaveCount(23);
});
