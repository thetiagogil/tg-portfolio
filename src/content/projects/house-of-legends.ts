import type { Project } from "../types";

export const houseOfLegends: Project = {
  slug: "house-of-legends",
  title: "House of Legends",
  type: "learning",
  status: "completed",
  dateStart: "2023-09-01",
  techs: ["react", "typescript", "restApi"],
  links: {
    site: "https://house-of-legends.pages.dev/",
    repo: "https://github.com/thetiagogil/02-house-of-legends",
  },
  images: [
    "house-of-legends/house-of-legends-1.png",
    "house-of-legends/house-of-legends-2.png",
    "house-of-legends/house-of-legends-3.png",
    "house-of-legends/house-of-legends-4.png",
    "house-of-legends/house-of-legends-5.png",
    "house-of-legends/house-of-legends-6.png",
  ],
  subtitle: {
    en: "League of Legends companion",
    pt: "Companion de League of Legends",
  },
  summary: {
    en: "A League of Legends companion for browsing champions and items, creating builds, and tracking local win/loss records.",
    pt: "Um companion de League of Legends para consultar campeões e itens, criar builds e acompanhar vitórias e derrotas localmente.",
  },
  brief: {
    en: [
      [
        "House of Legends is a League of Legends companion built during ",
        {
          text: "Ironhack",
          to: "education/ironhack",
        },
        " for champion and item reference, build creation, and local win/loss tracking.",
      ],
    ],
    pt: [
      [
        "House of Legends é um companion de League of Legends feito durante a ",
        {
          text: "Ironhack",
          to: "education/ironhack",
        },
        " para referência de campeões e itens, criação de builds e tracking local de vitórias e derrotas.",
      ],
    ],
  },
};
