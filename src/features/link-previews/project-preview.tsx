import { ImageResponse } from "next/og";
import { profile } from "@/content";
import type { Lang, Project } from "@/content/types";
import { OG_IMAGE_SIZE } from "@/lib/constants";
import { year } from "@/lib/dates";
import { getT } from "@/lib/i18n";
import { coverDataUrl, loadFonts } from "./preview-assets";
import { COLORS, LABEL, Monogram } from "./preview-style";

export async function projectPreview(project: Project, lang: Lang) {
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
    { ...OG_IMAGE_SIZE, fonts: await loadFonts() },
  );
}
