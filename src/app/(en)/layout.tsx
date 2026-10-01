import type { ReactNode } from "react";
import { RootShell } from "@/components/layout/root-shell";
import { rootMetadata, SITE_VIEWPORT } from "@/lib/metadata";

export const metadata = rootMetadata("en");
export const viewport = SITE_VIEWPORT;

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
