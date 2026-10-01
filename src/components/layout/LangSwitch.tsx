"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGS } from "@/content/types";
import { HTML_LANG, langOf, localize, sharedPath } from "@/lib/i18n";

const LANG_NAMES = { en: "English", pt: "Português" } as const;

type LangSwitchProps = {
  label: string;
};

/** "en / pt": links to the same page in each language. */
export function LangSwitch({ label }: LangSwitchProps) {
  const pathname = usePathname();
  const current = langOf(pathname);
  const shared = sharedPath(pathname);

  return (
    <nav className="lang an" aria-label={label}>
      {LANGS.map((lang, i) => (
        <span key={lang} className="contents">
          {i > 0 && (
            <span className="sl" aria-hidden="true">
              /
            </span>
          )}
          <Link
            href={localize(lang, shared)}
            hrefLang={HTML_LANG[lang]}
            lang={HTML_LANG[lang]}
            aria-current={lang === current ? "true" : undefined}
          >
            {lang}
            <span className="sr-only"> {LANG_NAMES[lang]}</span>
          </Link>
        </span>
      ))}
    </nav>
  );
}
