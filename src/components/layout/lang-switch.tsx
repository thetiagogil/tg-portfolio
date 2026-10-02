"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGS } from "@/content/types";
import { cn } from "@/lib/cn";
import { HTML_LANG, langOf, localize, sharedPath } from "@/lib/i18n";

const LANG_NAMES = { en: "English", pt: "Português" } as const;

type LangSwitchProps = {
  label: string;
  className?: string;
};

export function LangSwitch({ label, className }: LangSwitchProps) {
  const pathname = usePathname();

  const current = langOf(pathname);
  const shared = sharedPath(pathname);

  return (
    <nav className={cn("an flex items-center", className)} aria-label={label}>
      {LANGS.map((lang, i) => (
        <span key={lang} className="contents">
          {i > 0 && (
            <span className="text-ink-3/50" aria-hidden="true">
              /
            </span>
          )}
          <Link
            href={localize(lang, shared)}
            hrefLang={HTML_LANG[lang]}
            lang={HTML_LANG[lang]}
            aria-current={lang === current ? "true" : undefined}
            className="grid h-9 min-w-8 place-items-center px-1 text-ink-3 normal-case transition-colors duration-300 hover:text-ink aria-current:text-ink"
          >
            {lang}
            <span className="sr-only"> {LANG_NAMES[lang]}</span>
          </Link>
        </span>
      ))}
    </nav>
  );
}
