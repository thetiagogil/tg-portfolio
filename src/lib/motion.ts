import type { CSSProperties } from "react";

/** The start delay for the load-in motion (.rise, .fade), so a page's parts arrive in order. */
export function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}
