import type { Project } from "../types";

export const rankex: Project = {
  slug: "rankex",
  title: "Rankex",
  type: "personal",
  status: "completed",
  dateStart: "2024-08-10",
  techs: ["nextjs", "typescript", "shadcn", "supabase"],
  links: {
    site: "https://rankex.vercel.app/",
    repo: "https://github.com/thetiagogil/11-rankex",
  },
  images: [
    "rankex/rankex-1.png",
    "rankex/rankex-2.png",
    "rankex/rankex-3.png",
    "rankex/rankex-4.png",
  ],
  subtitle: {
    en: "Ranking tracker",
    pt: "Tracker de rankings",
  },
  summary: {
    en: "A ranking tracker for creating top-N lists about any topic, with profiles, follows, likes, comments, and social discovery.",
    pt: "Um tracker de rankings para criar listas top-N sobre qualquer tema, com perfis, follows, likes, comentários e descoberta social.",
  },
  brief: {
    en: [
      [
        "Rankex is a ranking tracker for creating and sharing top-N lists about any topic, with social features for discovery, follows, likes, and comments.",
      ],
    ],
    pt: [
      [
        "Rankex é um tracker de rankings para criar e partilhar listas top-N sobre qualquer tema, com funcionalidades sociais para descoberta, follows, likes e comentários.",
      ],
    ],
  },
};
