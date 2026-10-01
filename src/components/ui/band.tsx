import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BandProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

/** A top-level section: a full-width band. Tones alternate by position inside <main>. */
export function Band({ id, className, children }: BandProps) {
  return (
    <section id={id} className={cn("band", className)}>
      {children}
    </section>
  );
}
