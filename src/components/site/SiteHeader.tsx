"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowLink } from "@/components/ArrowLink";
import { Dialog } from "@/components/Dialog";
import { Icon } from "@/components/Icon";
import { MonoMark } from "@/components/MonoMark";
import { profile } from "@/content/profile";
import type { Lang } from "@/content/types";
import { getT, localize, sharedPath } from "@/lib/i18n";
import { isCurrent, NAV } from "./nav";
import { LangSwitch } from "./LangSwitch";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader({ lang }: { lang: Lang }) {
  const t = getT(lang);
  const shared = sharedPath(usePathname());
  const [menuOpen, setMenuOpen] = useState(false);

  const brand = (
    <>
      <MonoMark />
      <span className="brand-name">{profile.name}</span>
    </>
  );
  const themeToggle = (
    <ThemeToggle toDark={t("theme.toDark")} toLight={t("theme.toLight")} />
  );

  return (
    <header className="site-header" id="top">
      <div className="wrap site-header-in">
        <Link
          className="brand"
          href={localize(lang, "/")}
          aria-label={t("nav.homeLabel")}
        >
          {brand}
        </Link>
        <nav className="nav" aria-label={t("nav.label")}>
          {NAV.map((n) => (
            <Link
              key={n.path}
              href={localize(lang, n.path)}
              aria-current={isCurrent(shared, n.match) ? "page" : undefined}
            >
              {t(n.key)}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          <LangSwitch label={t("language.label")} />
          {themeToggle}
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
            <span className="brand">{brand}</span>
            <button
              type="button"
              className="an menu-btn"
              style={{ display: "flex" }}
              onClick={() => setMenuOpen(false)}
            >
              <Icon name="x" />
              {t("nav.close")}
            </button>
          </div>
          <ul className="menu-list">
            {[
              { path: "/", key: "nav.home" as const, match: [] as string[] },
              ...NAV,
            ].map((n) => {
              const current =
                n.path === "/" ? shared === "/" : isCurrent(shared, n.match);
              return (
                <li key={n.path}>
                  <Link
                    className="heading"
                    href={localize(lang, n.path)}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(n.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex items-center justify-between">
            <LangSwitch label={t("language.label")} />
            {themeToggle}
          </div>
          <p className="an text-ink-3 mt-10">{t("footer.contact")}</p>
          <ul className="footer-links pb-12">
            <li>
              <a className="lk" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
            <li>
              <ArrowLink href={profile.links.github} icon="out">
                GitHub
              </ArrowLink>
            </li>
            <li>
              <ArrowLink href={profile.links.linkedin} icon="out">
                LinkedIn
              </ArrowLink>
            </li>
            <li>
              <ArrowLink href={profile.cv} icon="dl">
                {t("contact.cv")}
              </ArrowLink>
            </li>
          </ul>
        </div>
      </Dialog>
    </header>
  );
}
