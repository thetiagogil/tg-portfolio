import { ImageResponse } from "next/og";
import { profile } from "@/content";
import type { Lang } from "@/content/types";
import { OG_IMAGE_SIZE } from "@/lib/constants";
import { getT } from "@/lib/i18n";
import { loadFonts } from "./preview-assets";
import { COLORS, LABEL, Monogram } from "./preview-style";

export async function sitePreview(lang: Lang) {
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
    { ...OG_IMAGE_SIZE, fonts: await loadFonts() },
  );
}
