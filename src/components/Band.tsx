import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A top-level section: a full-width band. Tones alternate by position inside <main>. */
export function Band({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("band", className)}>
      {children}
    </section>
  );
}
