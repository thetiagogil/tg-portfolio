"use client";

import { DialogCard } from "@/components/ui/dialog-card";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";
import { ContactDetails } from "./contact-details";

type ContactDialogProps = {
  open: boolean;
  onClose: () => void;
  lang: Lang;
};

export function ContactDialog({ open, onClose, lang }: ContactDialogProps) {
  const t = getT(lang);

  return (
    <DialogCard
      open={open}
      onClose={onClose}
      title={t("contact.title")}
      titleId="contact-dialog-title"
      closeLabel={t("nav.close")}
      className="w-[min(36rem,calc(100%-32px))]"
    >
      <div className="overflow-auto px-6 pt-6 pb-8">
        <p className="mb-7 max-w-[44ch] text-ink-2">{t("contact.body")}</p>
        <ContactDetails lang={lang} size="compact" />
      </div>
    </DialogCard>
  );
}
