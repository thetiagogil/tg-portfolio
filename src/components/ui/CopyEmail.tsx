"use client";

import { useState } from "react";
import { Icon } from "./Icon";

type CopyEmailProps = {
  email: string;
  labels: { copy: string; copied: string };
};

const CONFIRM_MS = 1800;

/** Copies the address and says so for a moment. */
export function CopyEmail({ email, labels }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), CONFIRM_MS);
    } catch {
      // Clipboard blocked: the address sits right beside the button, to select by hand.
    }
  }

  return (
    <button type="button" className="copy-btn" onClick={copy}>
      <Icon name={copied ? "check" : "copy"} />
      <span aria-live="polite">{copied ? labels.copied : labels.copy}</span>
    </button>
  );
}
