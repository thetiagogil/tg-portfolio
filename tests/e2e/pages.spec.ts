import { expect, test } from "@playwright/test";

test("home shows the three selected projects and the four roles", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#work article")).toHaveCount(3);
  await expect(page.getByRole("main").locator('a[href^="/experience/"]')).toHaveCount(4);
  await expect(page.getByText("Sep 2022 – Aug 2023")).toBeVisible();
});

test("the project tabs filter the cards", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByRole("main").locator("article")).toHaveCount(14);
  await page.getByRole("button", { name: /^Client/ }).click();
  await expect(page.getByRole("main").locator("article")).toHaveCount(2);
  await expect(page.getByText("Built for clients.")).toBeVisible();
});

test("the image viewer opens, moves and closes", async ({ page }) => {
  await page.goto("/projects/voydex");
  await page.getByRole("button", { name: /Enlarge: Screenshot 2 of 4/ }).click();
  const viewer = page.getByRole("dialog", { name: "Images of Voydex" });

  await expect(viewer).toBeVisible();
  await expect(viewer.getByText("2 of 4")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(viewer.getByText("3 of 4")).toBeVisible();
  await viewer.getByRole("button", { name: "Previous image" }).click();
  await expect(viewer.getByText("2 of 4")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
});

test("previous and next walk through the projects", async ({ page }) => {
  await page.goto("/projects/voydex");
  await page.getByRole("link", { name: /Next/ }).click();
  await expect(page).toHaveURL(/\/projects\/[a-z-]+$/);
  await expect(page).not.toHaveURL(/voydex$/);
});

test("a role page shows its duration, scope and products", async ({ page }) => {
  await page.goto("/experience/aquasis");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Frontend Developer");
  const scope = page.getByRole("heading", { name: "Scope" }).locator("xpath=..");

  await expect(scope.getByRole("listitem")).toHaveCount(4);
  await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
});
