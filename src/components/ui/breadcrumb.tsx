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
      className="an fade text-ink-3 flex items-center gap-2 pt-14 md:pt-18 lg:pt-20"
      aria-label={getT(lang)("a11y.breadcrumb")}
    >
      <Link href={parent.href} className="hover:text-ink -my-1.5 py-1.5">
        {parent.label}
      </Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page" className="text-ink">
        {current}
      </span>
    </nav>
  );
}
