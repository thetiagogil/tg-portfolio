// Link previews (Open Graph images), drawn at build time in the site's look: paper, ink, Geist.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { projects } from "@/content";
import { LANGS, type Lang, type Project } from "@/content/types";
import { year } from "./dates";
import { getT } from "./i18n";

export const OG_SIZE = { width: 1200, height: 630 };

/** Every preview file: "en.png", "pt.png", and "<project>-<lang>.png". */
export const ogImages = () => [
  ...LANGS.map((l) => `${l}.png`),
  ...projects.flatMap((p) => LANGS.map((l) => `${p.slug}-${l}.png`)),
];

/** The preview for a page: the project's own, or the site's. */
export const ogImagePath = (lang: Lang, projectSlug?: string) =>
  `/og/${projectSlug ? `${projectSlug}-` : ""}${lang}.png`;

// Token colours in hex (the image renderer doesn't read CSS variables).
const C = {
  paper: "#f8f6f3",
  paper2: "#f1efeb",
  line: "#d9d8d6",
  ink: "#13161c",
  ink2: "#474b51",
  ink3: "#66696f",
  accent: "#cc3719",
};

const fonts = async () => {
  const dir = join(process.cwd(), "node_modules/geist/dist/fonts");
  const [sans, mono] = await Promise.all([
    readFile(join(dir, "geist-sans/Geist-Medium.ttf")),
    readFile(join(dir, "geist-mono/GeistMono-Regular.ttf")),
  ]);
  return [
    {
      name: "Geist",
      data: sans,
      weight: 500 as const,
      style: "normal" as const,
    },
    {
      name: "Geist Mono",
      data: mono,
      weight: 400 as const,
      style: "normal" as const,
    },
  ];
};

function Mono({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke={C.ink}
        strokeWidth="2.5"
      />
      <g fill="none" stroke={C.ink} strokeWidth="4" strokeLinecap="square">
        <path d="M13 22.5h13M19.5 22.5v19" />
        <path d="M47.78 25.89A9.5 9.5 0 1 0 50 32h-8" />
      </g>
    </svg>
  );
}

const label = {
  fontFamily: "Geist Mono",
  fontSize: 18,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: C.ink3,
};

/** The site's default preview: monogram, headline, name and city. */
export async function defaultOg(lang: Lang) {
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
        background: C.paper,
        fontFamily: "Geist",
        color: C.ink,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Mono size={64} />
        <span style={{ fontSize: 30, letterSpacing: "-0.01em" }}>
          Tiago Gil
        </span>
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
        <span style={{ color: C.ink3 }}>{t("home.hero.line2")}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `1px solid ${C.line}`,
          paddingTop: 24,
          ...label,
        }}
      >
        <span>React · Next.js · TypeScript</span>
        <span>{t("home.hero.facts.location")}</span>
      </div>
    </div>,
    { ...OG_SIZE, fonts: await fonts() },
  );
}

/** A project's preview: title and subtitle beside its first screenshot (hatching when it has none). */
export async function projectOg(p: Project, lang: Lang) {
  const t = getT(lang);
  const image = p.images[0]
    ? `data:image/png;base64,${(
        await sharp(join(process.cwd(), "assets/projects", p.images[0]))
          .resize(1040)
          .png()
          .toBuffer()
      ).toString("base64")}`
    : null;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: C.paper,
        fontFamily: "Geist",
        color: C.ink,
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
        <div style={{ display: "flex", ...label }}>
          {`${year(p.dateStart)} · ${t(`project.type.${p.type}`)}`}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{ fontSize: 76, lineHeight: 1, letterSpacing: "-0.045em" }}
          >
            {p.title}
          </span>
          <span style={{ fontSize: 30, lineHeight: 1.25, color: C.ink2 }}>
            {p.subtitle[lang]}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Mono size={40} />
          <span style={{ fontSize: 22 }}>Tiago Gil</span>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          paddingRight: 64,
        }}
      >
        <div
          style={{
            width: 616,
            height: 347,
            display: "flex",
            background: C.paper2,
            border: `1px solid ${C.line}`,
            overflow: "hidden",
          }}
        >
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element -- the OG renderer needs a plain <img>
            <img
              src={image}
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
                backgroundImage: `repeating-linear-gradient(-45deg, ${C.line} 0 1px, transparent 1px 7px)`,
                ...label,
              }}
            >
              {t(
                p.status === "planned"
                  ? "project.placeholder.planned"
                  : "project.placeholder.none",
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    { ...OG_SIZE, fonts: await fonts() },
  );
}
