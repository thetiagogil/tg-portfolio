import { NotFoundPage } from "@/features/not-found/not-found-page";
import { NOT_FOUND_METADATA } from "@/lib/metadata";

// Built as out/pt/404.html: Cloudflare serves the nearest 404.html, so a missing /pt/… address gets this page.
export const metadata = NOT_FOUND_METADATA;

export default function Page() {
  return <NotFoundPage lang="pt" />;
}
