import type { Project } from "../types";

export const voydex: Project = {
  slug: "voydex",
  title: "Voydex",
  type: "personal",
  status: "in progress",
  dateStart: "2025-10-01",
  featured: true,
  techs: ["nextjs", "typescript", "shadcn", "supabase"],
  images: [
    "voydex/voydex-1.png",
    "voydex/voydex-2.png",
    "voydex/voydex-3.png",
    "voydex/voydex-4.png",
  ],
  subtitle: {
    en: "Pokémon game companion",
    pt: "Companion de jogos Pokémon",
  },
  summary: {
    en: "An in-progress Pokémon game companion for centralizing playthroughs, teams, progression, collectibles, Pokédex goals, and matchup checks.",
    pt: "Um companion de jogos Pokémon em desenvolvimento para centralizar playthroughs, equipas, progresso, colecionáveis, Pokédex e matchups.",
  },
  brief: {
    en: [
      [
        "Voydex centralizes each user's Pokémon playthroughs in one place, covering teams, progression, collectibles, Pokédex goals, and matchup checks.",
      ],
    ],
    pt: [
      [
        "Voydex centraliza as playthroughs Pokémon de cada utilizador num só lugar, cobrindo equipas, progresso, colecionáveis, objetivos da Pokédex e matchups.",
      ],
    ],
  },
};
