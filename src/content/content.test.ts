// Checks every entry against the rules in docs/CONTENT.md, so content edits can't quietly break the site.
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  certifications,
  degrees,
  featuredProjects,
  profile,
  projects,
  roles,
} from ".";
import { overlaps, TOOLS, type Tool, type ToolId } from "./stack";
import type { EntryRef, ISODate, Paragraph } from "./types";
import { en } from "./ui/en";
import { pt } from "./ui/pt";

const root = path.resolve(__dirname, "../..");
const records = [...roles, ...degrees];
const entries = [...projects, ...records, ...certifications];
const nameOf = (e: { slug: string }) => e.slug;

/** Every { en, pt } pair inside a value, with where it was found. */
const pairs = (
  value: unknown,
  at: string,
  out: [string, unknown, unknown][] = [],
) => {
  if (Array.isArray(value))
    value.forEach((v, i) => pairs(v, `${at}[${i}]`, out));
  else if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if ("en" in o && "pt" in o && Object.keys(o).length === 2)
      out.push([at, o.en, o.pt]);
    else for (const [k, v] of Object.entries(o)) pairs(v, `${at}.${k}`, out);
  }
  return out;
};

/** All the text in a value (strings and paragraph segments). */
const texts = (value: unknown): string[] =>
  typeof value === "string"
    ? [value]
    : Array.isArray(value)
      ? value.flatMap(texts)
      : value && typeof value === "object"
        ? Object.values(value).flatMap(texts)
        : [];

const isDate = (d: ISODate) =>
  /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d));

describe("content", () => {
  it("has unique slugs in each collection", () => {
    for (const list of [projects, roles, degrees, certifications]) {
      const slugs = list.map(nameOf);
      expect(new Set(slugs).size, slugs.join(", ")).toBe(slugs.length);
    }
  });

  it("has every text in both languages, never empty", () => {
    const problems: string[] = [];
    for (const e of [...entries, profile]) {
      for (const [at, a, b] of pairs(e, "slug" in e ? e.slug : "profile")) {
        const empty = (v: unknown) =>
          Array.isArray(v)
            ? v.length === 0
            : typeof v !== "string" || !v.trim();
        if (empty(a) || empty(b)) problems.push(at);
      }
    }
    expect(problems).toEqual([]);
  });

  it("has valid dates, ending after they start", () => {
    for (const e of entries) {
      expect(isDate(e.dateStart), `${e.slug} dateStart`).toBe(true);
      const end = "dateEnd" in e ? e.dateEnd : undefined;
      if (end) {
        expect(isDate(end), `${e.slug} dateEnd`).toBe(true);
        expect(
          Date.parse(end) >= Date.parse(e.dateStart),
          `${e.slug} ends before it starts`,
        ).toBe(true);
      }
    }
  });

  it("lists known tools, without duplicates or overlap", () => {
    const stacks: [string, ToolId[]][] = [
      ...entries.map((e) => [e.slug, e.techs] as [string, ToolId[]]),
      ...records.flatMap((r) =>
        (r.products ?? []).map(
          (p) =>
            [`${r.slug} / ${p.label.en}`, p.techs ?? []] as [string, ToolId[]],
        ),
      ),
      ...projects.flatMap((p) =>
        (p.collection ?? []).map(
          (c) => [`${p.slug} / ${c.label}`, c.techs] as [string, ToolId[]],
        ),
      ),
    ];
    for (const [who, techs] of stacks) {
      for (const t of techs)
        expect(t in TOOLS, `${who}: unknown tool ${t}`).toBe(true);
      expect(new Set(techs).size, `${who}: duplicate tools`).toBe(techs.length);
      expect(
        overlaps(techs),
        `${who}: lists a tool another one already includes`,
      ).toEqual([]);
      expect(techs.length, `${who}: more than 7 tools`).toBeLessThanOrEqual(7);
    }
  });

  it("only declares inclusions between known tools", () => {
    for (const [id, tool] of Object.entries(TOOLS) as [ToolId, Tool][]) {
      for (const inc of tool.includes ?? [])
        expect(inc in TOOLS, `${id} includes unknown ${inc}`).toBe(true);
    }
  });

  it("points only at files that exist", () => {
    const missing: string[] = [];
    for (const p of projects) {
      for (const img of p.images)
        if (!existsSync(path.join(root, "assets/projects", img)))
          missing.push(img);
    }
    for (const r of records) {
      for (const d of r.documents ?? [])
        if (!existsSync(path.join(root, "public", d.href)))
          missing.push(d.href);
      for (const p of r.products ?? [])
        if (
          p.href?.startsWith("/") &&
          !existsSync(path.join(root, "public", p.href))
        )
          missing.push(p.href);
    }
    if (!existsSync(path.join(root, "public", profile.cv)))
      missing.push(profile.cv);
    if (!existsSync(path.join(root, "assets/portrait", profile.portrait)))
      missing.push(profile.portrait);
    expect(missing).toEqual([]);
  });

  it("links only to entries that exist", () => {
    const pages = new Set<EntryRef>([
      ...projects.map((p) => `projects/${p.slug}` as const),
      ...roles.map((r) => `experience/${r.slug}` as const),
      ...degrees.map((d) => `education/${d.slug}` as const),
    ]);
    const refs = (paras: Paragraph[]) =>
      paras.flat().flatMap((seg) => (typeof seg === "string" ? [] : [seg.to]));
    for (const p of projects)
      for (const lang of ["en", "pt"] as const)
        for (const to of refs(p.brief[lang]))
          expect(pages.has(to), `${p.slug} → ${to}`).toBe(true);
    for (const r of records) {
      for (const lang of ["en", "pt"] as const)
        for (const to of refs(r.overview[lang]))
          expect(pages.has(to), `${r.slug} → ${to}`).toBe(true);
      for (const slug of r.projects ?? [])
        expect(pages.has(`projects/${slug}`), `${r.slug} → ${slug}`).toBe(true);
    }
  });

  it("follows the structure the pages expect", () => {
    expect(featuredProjects.length).toBe(3);
    expect(roles.filter((r) => r.dateEnd === null).length).toBe(1);
    for (const r of records)
      expect(r.scope.length, `${r.slug} scope points`).toBe(4);
  });

  it("follows the writing rules", () => {
    const all = [
      ...entries.flatMap(texts),
      ...Object.values(en),
      ...Object.values(pt),
    ];
    const broken = (re: RegExp) => all.filter((s) => re.test(s));
    expect(
      broken(/Full-stack Developer|developer frontend|[Pp]rogramador/),
      "role names",
    ).toEqual([]);
    expect(broken(/—/), "em dashes").toEqual([]);
    expect(broken(/\b\d{2}\/\d{4}\b/), "numeric month dates").toEqual([]);
    expect(broken(/bootcamp apps/i), "'bootcamp apps'").toEqual([]);
    expect(
      broken(/\bsheets?\b|\bfolhas?\b/i),
      "drawing-sheet metaphors",
    ).toEqual([]);
  });

  it("has every interface text in Portuguese", () => {
    const empty = (Object.keys(en) as (keyof typeof en)[]).filter(
      (k) => !pt[k]?.trim(),
    );
    expect(empty).toEqual([]);
  });
});
