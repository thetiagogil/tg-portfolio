"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { profile } from "@/content";
import type { Lang } from "@/content/types";
import { getT, localize, sharedPath } from "@/lib/i18n";
import { Brand } from "./brand";
import { LangSwitch } from "./lang-switch";
import { isCurrent, NAV } from "./nav";
import { SiteMenu } from "./site-menu";
import { ThemeToggle } from "./theme-toggle";

type SiteHeaderProps = {
  lang: Lang;
};

export function SiteHeader({ lang }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const t = getT(lang);
  const shared = sharedPath(usePathname());

  return (
    <header
      id="top"
      className="border-line bg-paper/82 sticky top-0 z-20 border-b backdrop-blur-[12px] backdrop-saturate-150"
    >
      <div className="wrap flex h-(--header-h) items-center gap-6">
        <Link
          className="group/brand flex items-center gap-3"
          href={localize(lang, "/")}
          aria-label={t("nav.homeLabel")}
        >
          <Brand />
        </Link>

        <nav className="ml-auto hidden gap-8 md:flex" aria-label={t("nav.label")}>
          {NAV.map((item) => (
            <Link
              key={item.path}
              href={localize(lang, item.path)}
              aria-current={isCurrent(item, shared) ? "page" : undefined}
              className="text-ink-2 after:bg-ink after:ease-settle hover:text-ink aria-[current=page]:text-ink relative flex h-(--header-h) items-center text-[15px] transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-500 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <LangSwitch label={t("language.label")} className="hidden sm:flex" />
          <ThemeToggle labels={{ toDark: t("theme.toDark"), toLight: t("theme.toLight") }} />
          <Button href={`mailto:${profile.email}`} size="sm" className="ml-3 hidden lg:inline-flex">
            {t("nav.contact")}
          </Button>
          <button
            type="button"
            className="an ml-1 flex h-9 items-center gap-2 px-2 md:hidden"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" />
            {t("nav.menu")}
          </button>
        </div>
      </div>

      <SiteMenu open={menuOpen} onClose={() => setMenuOpen(false)} shared={shared} lang={lang} />
    </header>
  );
}
