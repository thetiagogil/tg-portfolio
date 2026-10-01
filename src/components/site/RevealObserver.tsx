"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Fades sections in the first time they're seen ([data-reveal]); CSS skips it all for reduced motion. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-revealed", "");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px" },
    );
    document
      .querySelectorAll("[data-reveal]:not([data-revealed])")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
