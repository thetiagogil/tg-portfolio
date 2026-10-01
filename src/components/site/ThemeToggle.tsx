"use client";

import { Icon } from "@/components/Icon";

/** Light / dark. Both states are rendered and CSS shows the current one, so the server HTML always matches.
    The choice is remembered; until then the site follows the system. */
export function ThemeToggle({
  toDark,
  toLight,
}: {
  toDark: string;
  toLight: string;
}) {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the choice then lasts for this page only.
    }
  };
  return (
    <button type="button" className="icon-btn theme-toggle" onClick={toggle}>
      <span className="when-light">
        <Icon name="moon" />
        <span className="sr-only">{toDark}</span>
      </span>
      <span className="when-dark">
        <Icon name="sun" />
        <span className="sr-only">{toLight}</span>
      </span>
    </button>
  );
}
