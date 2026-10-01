import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import { SmartLink } from "./SmartLink";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  icon?: IconName;
};

/** A text link with an underline and an arrow after it ("Full timeline →", "GitHub ↗", "Download CV ↓"). */
export function ArrowLink({ href, children, icon = "right" }: ArrowLinkProps) {
  return (
    <SmartLink href={href} className="tl-link">
      <span className="lk">{children}</span>
      <Icon name={icon} />
    </SmartLink>
  );
}
