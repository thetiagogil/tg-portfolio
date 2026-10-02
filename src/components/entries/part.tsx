import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PartProps = {
  label: string;
  children: ReactNode;
  first?: boolean;
  width?: "text" | "grid";
  reveal?: boolean;
};

export function Part({ label, children, first = false, width = "text", reveal = true }: PartProps) {
  return (
    <section className="wrap">
      <div
        className={cn(
          "page-grid mt-20 gap-y-6 border-t border-ink pt-5 md:mt-24",
          first && "mt-0 border-t-0 pt-0 md:mt-0",
        )}
        data-reveal={reveal || undefined}
      >
        <h2 className="an col-span-full pt-1.5 font-normal text-ink lg:col-span-3">{label}</h2>

        <div className={cn("col-span-full lg:col-span-9", width === "text" && "md:col-span-8")}>
          {children}
        </div>
      </div>
    </section>
  );
}
