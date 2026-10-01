import type { ReactNode } from "react";
import { RootShell, rootMetadata } from "@/components/site/RootShell";

export { viewport } from "@/components/site/RootShell";
export const metadata = rootMetadata("en");

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
