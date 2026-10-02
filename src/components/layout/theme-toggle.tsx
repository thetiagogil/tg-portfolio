"use client";

import { Icon } from "@/components/ui/icon";
import { ICON_BUTTON } from "@/components/ui/icon-button";

type ThemeToggleProps = {
  labels: { toDark: string; toLight: string };
};

// Both icons are rendered and the CSS shows the right one, so the server HTML always matches the visitor's theme.
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
    <button type="button" className={ICON_BUTTON} onClick={toggle} data-theme-toggle>
      <span className="grid dark:hidden">
        <Icon name="moon" className="size-[18px]" />
        <span className="sr-only">{labels.toDark}</span>
      </span>
      <span className="hidden dark:grid">
        <Icon name="sun" className="size-[18px]" />
        <span className="sr-only">{labels.toLight}</span>
      </span>
    </button>
  );
}
