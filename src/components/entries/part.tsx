import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PartProps = {
  label: string;
  children: ReactNode;
  /** "text" keeps a reading width on tablets; "grid" (cards, images) uses the full width there. */
  width?: "text" | "grid";
  /** Fade the part in as a whole (off when its items fade in one by one). */
  reveal?: boolean;
  className?: string;
};

/** A part of an entry page: an ink rule, the part's name on the left, the content from column 4. */
export function Part({ label, children, width = "text", reveal = true, className }: PartProps) {
  return (
    <section className="wrap">
      <div className={cn("page-grid part", className)} data-reveal={reveal || undefined}>
        <h2 className="an rail-label col-span-full lg:col-span-3">{label}</h2>
        <div className={cn("col-span-full lg:col-span-9", width === "text" && "md:col-span-8")}>
          {children}
        </div>
      </div>
    </section>
  );
}
