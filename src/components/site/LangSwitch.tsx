"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTML_LANG, langOf, localize, sharedPath } from "@/lib/i18n";
import { LANGS } from "@/content/types";

/** "en / pt": links to the same page in each language. */
export function LangSwitch({ label }: { label: string }) {
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
          </Link>
        </span>
      ))}
    </nav>
  );
}
