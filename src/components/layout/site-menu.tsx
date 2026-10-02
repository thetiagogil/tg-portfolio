"use client";

import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import type { Lang } from "@/content/types";
import { getT, localize } from "@/lib/i18n";
import { Brand } from "./brand";
import { ContactLinks } from "./contact-links";
import { LangSwitch } from "./lang-switch";
import { HOME, isCurrent, NAV } from "./nav";
import { ThemeToggle } from "./theme-toggle";

type SiteMenuProps = {
  open: boolean;
  onClose: () => void;
  /** The current page's path without the language prefix. */
  shared: string;
  lang: Lang;
};

export function SiteMenu({ open, onClose, shared, lang }: SiteMenuProps) {
  const t = getT(lang);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      label={t("nav.menu")}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-auto border-0 bg-paper p-0 text-ink"
    >
      <div className="wrap">
        <div className="flex h-(--header-h) items-center justify-between border-b border-line">
          <span className="flex items-center gap-3">
            <Brand />
          </span>
          <button
            type="button"
            className="an ml-1 flex h-9 items-center gap-2 px-2"
            onClick={onClose}
          >
            <Icon name="x" />
            {t("nav.close")}
          </button>
        </div>

        <ul className="mt-8 border-t border-line">
          {[HOME, ...NAV].map((item) => (
            <li key={item.path} className="border-b border-line">
              <Link
                className="heading block py-5 aria-[current=page]:text-accent-ink"
                href={localize(lang, item.path)}
                aria-current={isCurrent(item, shared) ? "page" : undefined}
                onClick={onClose}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-between">
          <LangSwitch label={t("language.label")} />
          <ThemeToggle labels={{ toDark: t("theme.toDark"), toLight: t("theme.toLight") }} />
        </div>

        <p className="an mt-10 text-ink-3">{t("footer.contact")}</p>
        <ContactLinks lang={lang} layout="column" className="pb-12" />
      </div>
    </Dialog>
  );
}
