"use client";

import { useEffect, useRef, type ReactNode } from "react";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  className?: string;
  /** The id of the dialog's heading, or a `label` when it has none. */
  labelledBy?: string;
  label?: string;
  children: ReactNode;
};

/** A native <dialog> shown as a modal: focus stays inside, Escape and a click on the backdrop close it, and the
    page behind is inert. */
export function Dialog({ open, onClose, className, labelledBy, label, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={className}
      aria-labelledby={labelledBy}
      aria-label={label}
      onClose={onClose}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {open && children}
    </dialog>
  );
}
