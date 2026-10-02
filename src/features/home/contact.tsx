import { ContactDetails } from "@/components/layout/contact-details";
import { Section } from "@/components/ui/section";
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
        <ContactDetails lang={lang} size="large" />
      </div>
    </Section>
  );
}
