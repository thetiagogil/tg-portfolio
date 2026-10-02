import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";
import { SmartLink } from "./smart-link";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: "md" | "sm";
  icon?: IconName;
  className?: string;
};

const VARIANTS = {
  solid: "bg-ink text-paper hover:bg-accent hover:text-on-accent",
  outline: "bg-transparent text-ink inset-ring inset-ring-line-2 hover:inset-ring-ink",
};

const SIZES = {
  md: "min-h-12 gap-2.5 px-5 py-3 text-[15px] leading-[1.3]",
  sm: "min-h-9 gap-2 px-3.5 py-2 text-[14px] leading-[1.3]",
};

export function buttonClass({
  variant = "solid",
  size = "md",
}: Pick<ButtonProps, "variant" | "size">) {
  return cn(
    "inline-flex max-w-full items-center justify-center text-left font-medium tracking-[-0.01em] transition-[background-color,color,box-shadow] duration-300",
    VARIANTS[variant],
    SIZES[size],
  );
}

export function Button({
  href,
  children,
  variant = "solid",
  size = "md",
  icon,
  className,
}: ButtonProps) {
  return (
    <SmartLink href={href} className={cn(buttonClass({ variant, size }), className)}>
      {children}
      {icon && <Icon name={icon} />}
    </SmartLink>
  );
}
