import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";
import { SmartLink } from "./smart-link";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  icon?: IconName;
  plain?: boolean;
  className?: string;
};

export function ArrowLink({
  href,
  children,
  icon = "right",
  plain = false,
  className,
}: ArrowLinkProps) {
  return (
    <SmartLink
      href={href}
      className={cn("inline-flex items-center gap-1.5 font-medium", className)}
    >
      {plain ? children : <span className="lk">{children}</span>}
      <Icon name={icon} className="size-3.5" />
    </SmartLink>
  );
}
