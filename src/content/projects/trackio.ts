import type { Project } from "../types";

export const trackio: Project = {
  slug: "trackio",
  title: "Trackio",
  type: "personal",
  status: "completed",
  dateStart: "2024-08-01",
  techs: ["nextjs", "typescript", "tailwind", "radix", "supabase"],
  links: {
    site: "https://trackio-tracker.vercel.app/",
    repo: "https://github.com/thetiagogil/09-trackio",
  },
  images: ["trackio/trackio-1.png", "trackio/trackio-2.png"],
  subtitle: {
    en: "Tracker organizer",
    pt: "Organizador de trackers",
  },
  summary: {
    en: "A tracker organizer for saving external trackers, grouping them by category, and opening them from one place.",
    pt: "Um organizador de trackers para guardar trackers externos, agrupá-los por categoria e abri-los a partir de um só lugar.",
  },
  brief: {
    en: [
      [
        "Trackio is a tracker organizer for keeping external tracking tools, lists, and collections centralized in one place.",
      ],
    ],
    pt: [
      [
        "Trackio é um organizador de trackers para manter ferramentas externas de tracking, listas e coleções centralizadas num só lugar.",
      ],
    ],
  },
};
