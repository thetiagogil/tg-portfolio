"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Dialog } from "./dialog";
import { IconButton } from "./icon-button";

type DialogCardProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  titleId: string;
  closeLabel: string;
  className: string;
  children: ReactNode;
};

export function DialogCard({
  open,
  onClose,
  title,
  titleId,
  closeLabel,
  className,
  children,
}: DialogCardProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      className={cn(
        "m-auto max-h-[min(80vh,44rem)] max-w-none overflow-hidden border-0 bg-paper p-0 text-ink shadow-[0_0_0_1px_var(--line-2),0_32px_80px_-32px_rgb(0_0_0/0.5)] backdrop:bg-paper/80 backdrop:backdrop-blur-xs open:flex open:animate-[dialog-rise_0.3s_var(--settle)] open:flex-col max-sm:mx-auto max-sm:mt-auto max-sm:mb-0 max-sm:max-h-[85dvh] max-sm:w-full",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line py-3 pr-3 pl-6">
        <h2 className="subheading focus:outline-none" id={titleId} tabIndex={-1} autoFocus>
          {title}
        </h2>
        <IconButton icon="x" label={closeLabel} onClick={onClose} />
      </div>

      {children}
    </Dialog>
  );
}
