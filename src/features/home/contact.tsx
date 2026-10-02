import { ContactLinks } from "@/components/layout/contact-links";
import { CopyEmail } from "@/components/ui/copy-email";
import { Section } from "@/components/ui/section";
import { profile } from "@/content";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";

type ContactProps = {
  lang: Lang;
};

export function Contact({ lang }: ContactProps) {
  const t = getT(lang);

  return (
    <Section title={t("contact.title")} intro={t("contact.body")}>
      <div data-reveal>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            className="lk text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-[1.2] font-medium tracking-[-0.03em] wrap-anywhere"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
          <CopyEmail
            email={profile.email}
            labels={{ copy: t("contact.copy"), copied: t("contact.copied") }}
          />
        </div>

        <ContactLinks lang={lang} layout="row" />
      </div>
    </Section>
  );
}
