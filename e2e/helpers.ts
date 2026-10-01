import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

/** Runs axe on the page as it is now (dialogs open included) and fails with each violation and where it is. */
export async function expectAccessible(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(
    violations.map((v) => `${v.id}: ${v.nodes.map((node) => node.target).join(", ")}`),
  ).toEqual([]);
}

/** The same path in Portuguese. */
export function pt(path: string) {
  return path === "/" ? "/pt" : `/pt${path}`;
}
