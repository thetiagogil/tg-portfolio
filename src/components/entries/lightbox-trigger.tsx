"use client";

import type { ReactNode } from "react";
import { LIGHTBOX_OPEN_EVENT } from "./lightbox";

type LightboxTriggerProps = {
  index: number;
  label: string;
  children: ReactNode;
};

export function LightboxTrigger({ index, label, children }: LightboxTriggerProps) {
  function open() {
    window.dispatchEvent(new CustomEvent(LIGHTBOX_OPEN_EVENT, { detail: index }));
  }

  return (
    <button
      type="button"
      className="group block w-full cursor-zoom-in border-0 bg-none p-0 text-left"
      aria-label={label}
      aria-haspopup="dialog"
      onClick={open}
    >
      {children}
    </button>
  );
}
