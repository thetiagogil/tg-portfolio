import Link from "next/link";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";

type BreadcrumbProps = {
  lang: Lang;
  parent: { href: string; label: string };
  current: string;
};

export function Breadcrumb({ lang, parent, current }: BreadcrumbProps) {
  return (
    <nav
      className="an fade flex items-center gap-2 pt-14 text-ink-3 md:pt-18 lg:pt-20"
      aria-label={getT(lang)("a11y.breadcrumb")}
    >
      <Link href={parent.href} className="-my-1.5 py-1.5 hover:text-ink">
        {parent.label}
      </Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page" className="text-ink">
        {current}
      </span>
    </nav>
  );
}
