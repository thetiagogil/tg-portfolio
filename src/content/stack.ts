// Every tool, once. Entries reference tools by id; the About panel, the filter groups and every chip read from here.

export const TOOL_GROUPS = ["frontend", "backend", "tools", "architecture"] as const;
export type ToolGroup = (typeof TOOL_GROUPS)[number];

export type Tool = {
  name: string;
  group: ToolGroup;
  /** Tool ids this one already brings with it (checked by a test). An entry lists only the top one (no overlap). */
  includes?: readonly string[];
  /** Brand colour for the logo on hover (About panel); absent for near-black brands, which keep the ink colour. */
  brand?: string;
};

const TOOL_LIST = {
  // Frontend
  react: {
    name: "React",
    group: "frontend",
    includes: ["html", "css"],
    brand: "#61DAFB",
  },
  nextjs: {
    name: "Next.js",
    group: "frontend",
    includes: ["react", "html", "css"],
  },
  typescript: { name: "TypeScript", group: "frontend", brand: "#3178C6" },
  javascript: { name: "JavaScript", group: "frontend", brand: "#F7DF1E" },
  html: { name: "HTML", group: "frontend" },
  css: { name: "CSS", group: "frontend" },
  tailwind: { name: "Tailwind CSS", group: "frontend", brand: "#06B6D4" },
  shadcn: {
    name: "shadcn/ui",
    group: "frontend",
    includes: ["tailwind", "radix"],
  },
  radix: { name: "Radix UI", group: "frontend" },
  mui: { name: "Material UI", group: "frontend", brand: "#007FFF" },
  joy: { name: "Joy UI", group: "frontend" },
  bootstrap: { name: "Bootstrap", group: "frontend", brand: "#7952B3" },
  zustand: { name: "Zustand", group: "frontend" },
  tanstackQuery: {
    name: "TanStack Query",
    group: "frontend",
    brand: "#FF4154",
  },
  reactNative: { name: "React Native", group: "frontend" },
  wagmi: { name: "Wagmi", group: "frontend" },
  // Backend and data
  nodejs: { name: "Node.js", group: "backend" },
  express: { name: "Express", group: "backend" },
  dotnet: { name: ".NET", group: "backend" },
  restApi: { name: "REST API", group: "backend" },
  supabase: {
    name: "Supabase",
    group: "backend",
    includes: ["postgresql"],
    brand: "#3FCF8E",
  },
  postgresql: { name: "PostgreSQL", group: "backend", brand: "#4169E1" },
  mongodb: { name: "MongoDB", group: "backend" },
  solidity: { name: "Solidity", group: "backend" },
  outsystems: { name: "OutSystems", group: "backend" },
  // Tools and process
  vercel: { name: "Vercel", group: "tools" },
  jira: { name: "Jira", group: "tools" },
  kanban: { name: "Kanban", group: "tools" },
  agile: { name: "Agile Methodologies", group: "tools" },
  lean: { name: "Lean Principles", group: "tools" },
  // Architecture
  autocad: { name: "AutoCAD", group: "architecture" },
  revit: { name: "Revit", group: "architecture" },
  photoshop: { name: "Adobe Photoshop", group: "architecture" },
} as const satisfies Record<string, Tool>;

export type ToolId = keyof typeof TOOL_LIST;
export const TOOLS: Record<ToolId, Tool> = TOOL_LIST;

/** The About panel: the owner's twelve, in the owner's order (three rows of four). */
export const MAIN_STACK: readonly ToolId[] = [
  "react",
  "nextjs",
  "typescript",
  "javascript",
  "mui",
  "tailwind",
  "shadcn",
  "bootstrap",
  "tanstackQuery",
  "supabase",
  "vercel",
  "postgresql",
];

/** Tools an entry lists that another listed tool already includes (should be empty). */
export function overlaps(techs: readonly ToolId[]): ToolId[] {
  const includes = (id: ToolId) => TOOLS[id].includes ?? [];
  return techs.filter((tech) =>
    techs.some((other) => other !== tech && includes(other).includes(tech)),
  );
}
