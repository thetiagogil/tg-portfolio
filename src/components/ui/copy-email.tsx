"use client";

import { useState } from "react";
import { Icon } from "./icon";

type CopyEmailProps = {
  email: string;
  labels: { copy: string; copied: string };
};

const CONFIRM_MS = 1800;

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
    <button
      type="button"
      className="text-ink-2 inset-ring-line-2 hover:text-ink hover:inset-ring-ink inline-flex h-9 items-center gap-2 px-3 text-[0.8125rem] inset-ring"
      onClick={copy}
    >
      <Icon name={copied ? "check" : "copy"} />
      <span aria-live="polite">{copied ? labels.copied : labels.copy}</span>
    </button>
  );
}
