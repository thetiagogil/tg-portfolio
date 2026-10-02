import type { ReactNode } from "react";

type SheetProps = {
  children: ReactNode;
};

export function Sheet({ children }: SheetProps) {
  return (
    <div className="relative">
      <span className="crop tl" />
      <span className="crop tr" />
      <span className="crop bl" />
      <span className="crop br" />

      <div className="relative aspect-video overflow-hidden bg-paper-2 ring ring-line">
        {children}
      </div>
    </div>
  );
}
