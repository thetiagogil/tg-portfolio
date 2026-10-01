import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = [
  "/projects/voydex",
  "/projects/lifeflow",
  "/projects/portfolios",
  "/experience/aquasis",
  "/experience/talent-protocol",
  "/education/faul",
  "/education/ironhack",
];

for (const path of PAGES) {
  for (const url of [path, `/pt${path}`]) {
    test(`${url} renders with no accessibility violations`, async ({
      page,
    }) => {
      await page.goto(url);
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

test("home shows the three selected projects and the four roles", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#work .card")).toHaveCount(3);
  await expect(page.locator(".exp-row")).toHaveCount(4);
  await expect(page.getByText("Sep 2022 – Aug 2023")).toBeVisible();
});

test("project tabs filter the cards", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.locator(".cards .card")).toHaveCount(14);
  await page.getByRole("button", { name: /^Client/ }).click();
  await expect(page.locator(".cards .card")).toHaveCount(2);
  await expect(page.getByText("Built for clients.")).toBeVisible();
});

test("the image viewer opens, moves and closes", async ({ page }) => {
  await page.goto("/projects/voydex");
  await page
    .getByRole("button", { name: /Enlarge: Screenshot 2 of 4/ })
    .click();
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

test("previous and next walk through projects", async ({ page }) => {
  await page.goto("/projects/voydex");
  await page.getByRole("link", { name: /Next/ }).click();
  await expect(page).toHaveURL(/\/projects\/[a-z-]+$/);
  await expect(page).not.toHaveURL(/voydex$/);
});

test("every internal link on every page points to a page that exists", async ({
  page,
  request,
}) => {
  test.setTimeout(120_000);
  const seen = new Set<string>();
  const queue = ["/", "/pt"];
  const broken: string[] = [];
  while (queue.length) {
    const url = queue.shift()!;
    if (seen.has(url)) continue;
    seen.add(url);
    const res = await request.get(url);
    if (res.status() !== 200) {
      broken.push(`${url} → ${res.status()}`);
      continue;
    }
    await page.goto(url);
    const hrefs = await page.$$eval("a[href]", (as) =>
      as.map((a) => a.getAttribute("href")!),
    );
    for (const href of hrefs) {
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const clean = href.split("#")[0];
      if (!clean) continue;
      if (/\.(pdf|png|webp)$/.test(clean)) {
        if (!seen.has(clean)) {
          seen.add(clean);
          const r = await request.get(clean);
          if (r.status() !== 200)
            broken.push(`${url}: ${clean} → ${r.status()}`);
        }
      } else if (!seen.has(clean)) queue.push(clean);
    }
  }
  expect(broken).toEqual([]);
  expect(seen.size).toBeGreaterThan(40);
});
