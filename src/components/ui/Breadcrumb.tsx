import Link from "next/link";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";

type BreadcrumbProps = {
  lang: Lang;
  parent: { href: string; label: string };
  current: string;
};

/** "Projects / Voydex" above an entry's title. */
export function Breadcrumb({ lang, parent, current }: BreadcrumbProps) {
  return (
    <nav className="an crumb fade" aria-label={getT(lang)("a11y.breadcrumb")}>
      <Link href={parent.href}>{parent.label}</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
