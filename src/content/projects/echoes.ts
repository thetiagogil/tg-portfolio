import type { Project } from "../types";

export const echoes: Project = {
  slug: "echoes",
  title: "Echoes",
  type: "personal",
  status: "completed",
  dateStart: "2024-08-01",
  techs: ["nextjs", "typescript", "tailwind", "radix", "supabase"],
  links: {
    site: "https://echoes-tracker.vercel.app/",
    repo: "https://github.com/thetiagogil/10-echoes",
  },
  images: [
    "echoes/echoes-1.png",
    "echoes/echoes-2.png",
    "echoes/echoes-3.png",
    "echoes/echoes-4.png",
  ],
  subtitle: {
    en: "Concert tracker",
    pt: "Tracker de concertos",
  },
  summary: {
    en: "A concert tracker for planned, attended, and wishlisted concerts, with venues, notes, ratings, setlists, timeline, and stats.",
    pt: "Um tracker de concertos para eventos planeados, vistos e desejados, com salas, notas, avaliações, setlists, timeline e estatísticas.",
  },
  brief: {
    en: [
      [
        "Echoes is a concert tracker for organizing planned, attended, and wishlisted concerts with venues, notes, ratings, setlists, timeline, and stats.",
      ],
    ],
    pt: [
      [
        "Echoes é um tracker de concertos para organizar eventos planeados, vistos e desejados, com salas, notas, avaliações, setlists, timeline e estatísticas.",
      ],
    ],
  },
};
