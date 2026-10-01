import Link from "next/link";
import type { ComponentProps } from "react";

type SmartLinkProps = ComponentProps<"a"> & { href: string };

/** Internal pages go through next/link; anything else (other sites, email, PDFs) is a plain link, opening in a new
    tab when it leaves the site. */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  if (isPage(href)) return <Link href={href} {...props} />;
  const newTab = /^https?:/.test(href) || /\.pdf$/i.test(href);
  return <a href={href} {...(newTab && { target: "_blank", rel: "noreferrer" })} {...props} />;
}

function isPage(href: string) {
  return href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href);
}
