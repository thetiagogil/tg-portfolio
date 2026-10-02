import type { ReactNode } from "react";

type SheetProps = {
  children: ReactNode;
};

/** A framed image. Inside a `.group` that opens something, printer's crop marks show on hover and focus. */
export function Sheet({ children }: SheetProps) {
  return (
    <div className="relative">
      <span className="crop tl" />
      <span className="crop tr" />
      <span className="crop bl" />
      <span className="crop br" />

      <div className="bg-paper-2 ring-line relative aspect-video overflow-hidden ring">
        {children}
      </div>
    </div>
  );
}
