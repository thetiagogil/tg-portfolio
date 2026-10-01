import { describe, expect, it } from "vitest";
import { getT, langOf, localize, sharedPath } from "./i18n";

describe("i18n", () => {
  it("maps paths between languages", () => {
    expect(localize("en", "/projects")).toBe("/projects");
    expect(localize("pt", "/projects")).toBe("/pt/projects");
    expect(localize("pt", "/")).toBe("/pt");
    expect(sharedPath("/pt/projects/voydex")).toBe("/projects/voydex");
    expect(sharedPath("/pt")).toBe("/");
    expect(sharedPath("/timeline")).toBe("/timeline");
    expect(langOf("/pt/about")).toBe("pt");
    expect(langOf("/projects")).toBe("en");
    expect(langOf("/ptolemy")).toBe("en");
  });
  it("translates", () => {
    expect(getT("en")("nav.projects")).toBe("Projects");
    expect(getT("pt")("nav.projects")).toBe("Projetos");
  });
});
