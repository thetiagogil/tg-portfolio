import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";
import { SmartLink } from "./SmartLink";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: "md" | "sm";
  /** Shown after the label. */
  icon?: IconName;
};

/** A link styled as a button (every button on the site goes somewhere). */
export function Button({ href, children, variant = "solid", size = "md", icon }: ButtonProps) {
  return (
    <SmartLink
      href={href}
      className={cn("btn", variant === "outline" && "btn-outline", size === "sm" && "sm")}
    >
      {children}
      {icon && <Icon name={icon} />}
    </SmartLink>
  );
}
