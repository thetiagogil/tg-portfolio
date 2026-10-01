// Link previews (Open Graph images), drawn at build time in the site's look: paper, ink, Geist.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { CSSProperties } from "react";
import sharp from "sharp";
import { profile, projects } from "@/content";
import { LANGS, type Lang, type Project } from "@/content/types";
import { year } from "./dates";
import { getT } from "./i18n";

const SIZE = { width: 1200, height: 630 };

// Token colours in hex: the image renderer doesn't read CSS variables.
const COLORS = {
  paper: "#f8f6f3",
  paper2: "#f1efeb",
  line: "#d9d8d6",
  ink: "#13161c",
  ink2: "#474b51",
  ink3: "#66696f",
};

const LABEL: CSSProperties = {
  fontFamily: "Geist Mono",
  fontSize: 18,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: COLORS.ink3,
};

/** Every preview file: "en.png", "pt.png", and "<project>-<lang>.png". */
export function ogImages(): string[] {
  return [
    ...LANGS.map((lang) => `${lang}.png`),
    ...projects.flatMap((project) => LANGS.map((lang) => `${project.slug}-${lang}.png`)),
  ];
}

/** The preview for a page: the project's own, or the site's. */
export function ogImagePath(lang: Lang, projectSlug?: string): string {
  return projectSlug ? `/og/${projectSlug}-${lang}.png` : `/og/${lang}.png`;
}

/** The site's preview: monogram, headline, main stack and city. */
export async function siteOg(lang: Lang) {
  const t = getT(lang);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: COLORS.paper,
        fontFamily: "Geist",
        color: COLORS.ink,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Monogram size={64} />
        <span style={{ fontSize: 30, letterSpacing: "-0.01em" }}>{profile.name}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 104,
          lineHeight: 1,
          letterSpacing: "-0.045em",
        }}
      >
        <span>{t("home.hero.line1")}</span>
        <span style={{ color: COLORS.ink3 }}>{t("home.hero.line2")}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `1px solid ${COLORS.line}`,
          paddingTop: 24,
          ...LABEL,
        }}
      >
        <span>React · Next.js · TypeScript</span>
        <span>{profile.location[lang]}</span>
      </div>
    </div>,
    { ...SIZE, fonts: await loadFonts() },
  );
}

/** A project's preview: title and subtitle beside its first screenshot (hatching when it has none). */
export async function projectOg(project: Project, lang: Lang) {
  const t = getT(lang);
  const cover = project.images[0] ? await coverDataUrl(project.images[0]) : null;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: COLORS.paper,
        fontFamily: "Geist",
        color: COLORS.ink,
      }}
    >
      <div
        style={{
          width: 520,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 48px 64px 64px",
        }}
      >
        <div style={{ display: "flex", ...LABEL }}>
          {`${year(project.dateStart)} · ${t(`project.type.${project.type}`)}`}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 76, lineHeight: 1, letterSpacing: "-0.045em" }}>
            {project.title}
          </span>
          <span style={{ fontSize: 30, lineHeight: 1.25, color: COLORS.ink2 }}>
            {project.subtitle[lang]}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Monogram size={40} />
          <span style={{ fontSize: 22 }}>{profile.name}</span>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", paddingRight: 64 }}>
        <div
          style={{
            width: 616,
            height: 347,
            display: "flex",
            background: COLORS.paper2,
            border: `1px solid ${COLORS.line}`,
            overflow: "hidden",
          }}
        >
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element -- the image renderer needs a plain <img>
            <img
              src={cover}
              width={616}
              height={347}
              style={{ objectFit: "cover", objectPosition: "top" }}
              alt=""
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `repeating-linear-gradient(-45deg, ${COLORS.line} 0 1px, transparent 1px 7px)`,
                ...LABEL,
              }}
            >
              {t(
                project.status === "planned"
                  ? "project.placeholder.planned"
                  : "project.placeholder.none",
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    { ...SIZE, fonts: await loadFonts() },
  );
}

function Monogram({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="30" fill="none" stroke={COLORS.ink} strokeWidth="2.5" />
      <g fill="none" stroke={COLORS.ink} strokeWidth="4" strokeLinecap="square">
        <path d="M13 22.5h13M19.5 22.5v19" />
        <path d="M47.78 25.89A9.5 9.5 0 1 0 50 32h-8" />
      </g>
    </svg>
  );
}

async function coverDataUrl(image: string): Promise<string> {
  const file = join(process.cwd(), "assets/projects", image);
  const png = await sharp(file).resize(1040).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

async function loadFonts() {
  const dir = join(process.cwd(), "node_modules/geist/dist/fonts");
  const [sans, mono] = await Promise.all([
    readFile(join(dir, "geist-sans/Geist-Medium.ttf")),
    readFile(join(dir, "geist-mono/GeistMono-Regular.ttf")),
  ]);
  return [
    { name: "Geist", data: sans, weight: 500 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}
