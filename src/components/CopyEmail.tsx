"use client";

import { useState } from "react";
import { Icon } from "./Icon";

/** Copies the address and says so for two seconds. */
export function CopyEmail({
  email,
  copy,
  copied,
}: {
  email: string;
  copy: string;
  copied: string;
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="copy-btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          // Clipboard blocked: the address is right beside the button to select by hand.
        }
      }}
    >
      <Icon name={done ? "check" : "copy"} />
      <span aria-live="polite">{done ? copied : copy}</span>
    </button>
  );
}
