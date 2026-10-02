import Image from "next/image";
import { profile } from "@/content";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";

type PortraitProps = {
  lang: Lang;
  /** How wide the portrait shows, to pick the right file. */
  sizes: string;
  priority?: boolean;
};

export function Portrait({ lang, sizes, priority = false }: PortraitProps) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-paper-2 ring ring-line">
      <Image
        src={`portrait/${profile.portrait}`}
        alt={getT(lang)("common.portraitAlt")}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-[50%_38%]"
      />
    </div>
  );
}
