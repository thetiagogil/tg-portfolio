"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { profile } from "@/content";
import type { Lang } from "@/content/types";
import { getT, localize, sharedPath } from "@/lib/i18n";
import { ContactLinks } from "./contact-links";
import { LangSwitch } from "./lang-switch";
import { MonoMark } from "./mono-mark";
import { HOME, isCurrent, NAV } from "./nav";
import { ThemeToggle } from "./theme-toggle";

type SiteHeaderProps = {
  lang: Lang;
};

/** The header: brand, main navigation, language, theme and contact; on phones the navigation moves to a menu. */
export function SiteHeader({ lang }: SiteHeaderProps) {
  const t = getT(lang);
  const shared = sharedPath(usePathname());
  const [menuOpen, setMenuOpen] = useState(false);
  const themeLabels = { toDark: t("theme.toDark"), toLight: t("theme.toLight") };

  return (
    <header className="site-header" id="top">
      <div className="wrap site-header-in">
        <Link className="brand" href={localize(lang, "/")} aria-label={t("nav.homeLabel")}>
          <Brand />
        </Link>
        <nav className="nav" aria-label={t("nav.label")}>
          {NAV.map((item) => (
            <Link
              key={item.path}
              href={localize(lang, item.path)}
              aria-current={isCurrent(item, shared) ? "page" : undefined}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          <LangSwitch label={t("language.label")} />
          <ThemeToggle labels={themeLabels} />
          <a className="btn sm header-contact" href={`mailto:${profile.email}`}>
            {t("nav.contact")}
          </a>
          <button
            type="button"
            className="an menu-btn"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" />
            {t("nav.menu")}
          </button>
        </div>
      </div>

      <Dialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        className="menu"
        label={t("nav.menu")}
      >
        <div className="wrap">
          <div className="menu-top">
            <span className="brand">
              <Brand />
            </span>
            <button
              type="button"
              className="an menu-btn menu-close"
              onClick={() => setMenuOpen(false)}
            >
              <Icon name="x" />
              {t("nav.close")}
            </button>
          </div>
          <ul className="menu-list">
            {[HOME, ...NAV].map((item) => (
              <li key={item.path}>
                <Link
                  className="heading"
                  href={localize(lang, item.path)}
                  aria-current={isCurrent(item, shared) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-between">
            <LangSwitch label={t("language.label")} />
            <ThemeToggle labels={themeLabels} />
          </div>
          <p className="an text-ink-3 mt-10">{t("footer.contact")}</p>
          <ContactLinks lang={lang} className="footer-links pb-12" withEmail />
        </div>
      </Dialog>
    </header>
  );
}

function Brand() {
  return (
    <>
      <MonoMark />
      <span className="brand-name">{profile.name}</span>
    </>
  );
}
