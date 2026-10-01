import Link from "next/link";
import type { ComponentProps } from "react";

/** Internal pages go through next/link; everything else (external sites, mail, PDFs) is a plain link,
    opening in a new tab when it leaves the site. */
export const isPage = (href: string) =>
  href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href);

export function SmartLink({
  href,
  ...rest
}: ComponentProps<"a"> & { href: string }) {
  if (isPage(href)) return <Link href={href} {...rest} />;
  const opensNewTab = /^https?:/.test(href) || /\.pdf$/i.test(href);
  return (
    <a
      href={href}
      {...(opensNewTab ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    />
  );
}
