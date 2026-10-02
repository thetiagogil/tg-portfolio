import { describe, expect, it } from "vitest";
import { fill, getT, langOf, localize, sharedPath } from "@/lib/i18n";

describe("i18n", () => {
  it("maps paths between languages", () => {
    expect(localize("en", "/projects")).toBe("/projects");
    expect(localize("pt", "/projects")).toBe("/pt/projects");
    expect(localize("pt", "/")).toBe("/pt");
    expect(sharedPath("/pt/projects/voydex")).toBe("/projects/voydex");
    expect(sharedPath("/pt")).toBe("/");
    expect(sharedPath("/timeline")).toBe("/timeline");
  });

  it("reads the language from the path", () => {
    expect(langOf("/pt/about")).toBe("pt");
    expect(langOf("/projects")).toBe("en");
    expect(langOf("/ptolemy")).toBe("en");
  });

  it("translates, filling placeholders", () => {
    expect(getT("en")("nav.projects")).toBe("Projects");
    expect(getT("pt")("nav.projects")).toBe("Projetos");
    expect(getT("en")("lightbox.counter", { n: 2, total: 4 })).toBe("2 of 4");
    expect(fill("{n} of {total}", { n: 3 })).toBe("3 of {total}");
  });
});
