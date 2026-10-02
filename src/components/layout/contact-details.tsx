import { CopyEmail } from "@/components/ui/copy-email";
import { profile } from "@/content";
import type { Lang } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";
import { ContactLinks } from "./contact-links";

type ContactDetailsProps = {
  lang: Lang;
  /** "large" on Home; "compact" in the contact dialog. */
  size: "large" | "compact";
};

export function ContactDetails({ lang, size }: ContactDetailsProps) {
  const t = getT(lang);
  const isLarge = size === "large";

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          className={cn(
            isLarge
              ? "text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)]"
              : "text-[clamp(1.375rem,1.1rem+1vw,1.75rem)]",
            "lk leading-[1.2] font-medium tracking-[-0.03em] wrap-anywhere",
          )}
          href={`mailto:${profile.email}`}
        >
          {profile.email}
        </a>
        <CopyEmail
          email={profile.email}
          labels={{ copy: t("contact.copy"), copied: t("contact.copied") }}
        />
      </div>

      <ContactLinks lang={lang} layout="row" className={isLarge ? undefined : "mt-7"} />
    </>
  );
}
