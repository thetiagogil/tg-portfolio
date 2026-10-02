import type { Metadata } from "next";
import { RootShell } from "@/components/layout/root-shell";
import { NotFoundPage } from "@/features/not-found/not-found-page";
import { NOT_FOUND_METADATA, rootMetadata, SITE_VIEWPORT } from "@/lib/metadata";

export const metadata: Metadata = { ...rootMetadata("en"), ...NOT_FOUND_METADATA };
export const viewport = SITE_VIEWPORT;

export default function GlobalNotFound() {
  return (
    <RootShell lang="en">
      <NotFoundPage lang="en" />
    </RootShell>
  );
}
