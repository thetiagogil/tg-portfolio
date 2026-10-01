import type { ReactNode } from "react";

/** A framed image. Images that open show printer's crop marks on hover or focus (inside a `.group`). */
export function Sheet({ children }: { children: ReactNode }) {
  return (
    <div className="sheet">
      <span className="crop tl" />
      <span className="crop tr" />
      <span className="crop bl" />
      <span className="crop br" />
      <div className="sheet-frame">{children}</div>
    </div>
  );
}
