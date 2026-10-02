import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

type IconButtonProps = Omit<ComponentProps<"button">, "children"> & {
  icon: IconName;
  /** The button's name for screen readers (the icon has no text). */
  label: string;
};

export const ICON_BUTTON =
  "grid size-9 place-items-center text-ink-2 transition-colors duration-300 hover:text-ink";

export function IconButton({ icon, label, className, ...props }: IconButtonProps) {
  return (
    <button type="button" className={cn(ICON_BUTTON, className)} {...props}>
      <Icon name={icon} className="size-[18px]" />
      <span className="sr-only">{label}</span>
    </button>
  );
}
