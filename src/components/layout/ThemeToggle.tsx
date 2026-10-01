"use client";

import { Icon } from "@/components/ui/Icon";

type ThemeToggleProps = {
  labels: { toDark: string; toLight: string };
};

/** Light / dark. Both states are rendered and the CSS shows the current one, so the server HTML always matches.
    The choice is remembered; until then the site follows the system. */
export function ThemeToggle({ labels }: ThemeToggleProps) {
  function toggle() {
    const root = document.documentElement;
    const system = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const next = (root.dataset.theme ?? system) === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the choice then lasts for this page only.
    }
  }

  return (
    <button type="button" className="icon-btn theme-toggle" onClick={toggle}>
      <span className="when-light">
        <Icon name="moon" />
        <span className="sr-only">{labels.toDark}</span>
      </span>
      <span className="when-dark">
        <Icon name="sun" />
        <span className="sr-only">{labels.toLight}</span>
      </span>
    </button>
  );
}
