import type { ProjectStatus } from "@/content/types";
import type { Category } from "@/lib/timeline-filter";

/** The Timeline's markers: ■ work, △ education, ● project (hatched in progress, dashed planned), ◇ certificate. */
export function Glyph({
  category,
  status,
}: {
  category: Category;
  status?: ProjectStatus;
}) {
  const outline = status === "planned" || status === "in progress";
  return (
    <svg className="glyph" viewBox="0 0 12 12" aria-hidden="true">
      {category === "experience" && (
        <rect x="1" y="1" width="10" height="10" fill="currentColor" />
      )}
      {category === "projects" && (
        <>
          <circle
            cx="6"
            cy="6"
            r="5"
            fill={outline ? "var(--bg)" : "currentColor"}
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
      )}
      {category === "education" && (
        <path d="M6 0.8 11.4 11H0.6Z" fill="var(--bg)" stroke="currentColor" />
      )}
      {category === "certifications" && (
        <path
          d="M6 0.5 11.5 6 6 11.5 0.5 6Z"
          fill="var(--bg)"
          stroke="currentColor"
        />
      )}
    </svg>
  );
}
