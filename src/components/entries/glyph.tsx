import type { Category, ProjectStatus } from "@/content/types";
import { cn } from "@/lib/cn";

type GlyphProps = {
  category: Category;
  status?: ProjectStatus;
  className?: string;
};

export function Glyph({ category, status, className }: GlyphProps) {
  return (
    <svg
      className={cn("size-2.5 flex-none overflow-visible", className)}
      viewBox="0 0 12 12"
      aria-hidden="true"
    >
      {category === "experience" && <rect x="1" y="1" width="10" height="10" fill="currentColor" />}
      {category === "projects" && <ProjectShape status={status} />}
      {category === "education" && (
        <path d="M6 0.8 11.4 11H0.6Z" fill="var(--bg)" stroke="currentColor" />
      )}
      {category === "certifications" && (
        <path d="M6 0.5 11.5 6 6 11.5 0.5 6Z" fill="var(--bg)" stroke="currentColor" />
      )}
    </svg>
  );
}

function ProjectShape({ status }: { status?: ProjectStatus }) {
  const hollow = status === "planned" || status === "in progress";

  return (
    <>
      <circle
        cx="6"
        cy="6"
        r="5"
        fill={hollow ? "var(--bg)" : "currentColor"}
        stroke="currentColor"
        strokeDasharray={status === "planned" ? "2 1.5" : undefined}
      />
      {status === "in progress" && (
        <path
          d="M2.5 9.5 9.5 2.5M1.3 6.9 6.9 1.3M5.1 10.7l5.6-5.6"
          stroke="currentColor"
          strokeWidth="0.9"
        />
      )}
    </>
  );
}
