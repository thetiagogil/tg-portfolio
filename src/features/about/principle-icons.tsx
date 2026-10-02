import type { ReactNode } from "react";

export type Principle = "design" | "structure" | "access" | "longevity";

export const PRINCIPLES: { key: Principle; icon: ReactNode }[] = [
  {
    key: "design",
    icon: (
      <>
        <path d="M5 18c1.5-7 12.5-7 14 0" />
        <path d="M5 18 8.5 7.5M19 18 15.5 7.5" />
        <rect x="3" y="16" width="4" height="4" />
        <rect x="17" y="16" width="4" height="4" />
        <circle cx="8.5" cy="6.5" r="1.2" />
        <circle cx="15.5" cy="6.5" r="1.2" />
      </>
    ),
  },
  {
    key: "structure",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" />
        <path d="M3 9h18M10 9v12M10 15h11" />
      </>
    ),
  },
  {
    key: "access",
    icon: (
      <>
        <circle cx="12" cy="4.5" r="1.8" />
        <path d="M4 8.5l8 1.5 8-1.5M12 10v4.5M12 14.5 8.5 21M12 14.5l3.5 6.5" />
      </>
    ),
  },
  {
    key: "longevity",
    icon: <path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16" />,
  },
];
