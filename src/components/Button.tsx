import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";
import { SmartLink } from "./SmartLink";

export function Button({
  href,
  children,
  variant = "solid",
  size = "md",
  icon,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: "md" | "sm";
  /** Shown after the label. */
  icon?: IconName;
  className?: string;
}) {
  return (
    <SmartLink
      href={href}
      className={cn(
        "btn",
        variant === "outline" && "outline",
        size === "sm" && "sm",
        className,
      )}
    >
      {children}
      {icon && <Icon name={icon} />}
    </SmartLink>
  );
}
