import type { ReactNode } from "react";
import { RootShell, rootMetadata } from "@/components/site/RootShell";

export { viewport } from "@/components/site/RootShell";
export const metadata = rootMetadata("pt");

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell lang="pt">{children}</RootShell>;
}
