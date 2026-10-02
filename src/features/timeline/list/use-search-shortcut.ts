"use client";

import { useEffect, useRef } from "react";

/** "/" focuses the returned input, unless the visitor is already typing somewhere or a dialog is open. */
export function useSearchShortcut() {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;

      if (event.key !== "/" || event.metaKey || event.ctrlKey) return;
      if (target.closest("input, textarea, [contenteditable], dialog")) return;

      event.preventDefault();
      ref.current?.focus();
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return ref;
}
