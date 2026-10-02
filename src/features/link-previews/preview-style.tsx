import type { CSSProperties } from "react";
import { PAPER } from "@/lib/constants";

// The image renderer doesn't read CSS variables or classes: the tokens in hex, and inline styles.
export const COLORS = {
  paper: PAPER.light,
  paper2: "#f1efeb",
  line: "#d9d8d6",
  ink: "#13161c",
  ink2: "#474b51",
  ink3: "#66696f",
};

export const LABEL: CSSProperties = {
  fontFamily: "Geist Mono",
  fontSize: 18,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: COLORS.ink3,
};

export function Monogram({ size }: { size: number }) {
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
