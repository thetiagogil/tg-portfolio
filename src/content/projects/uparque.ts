import type { Project } from "../types";

export const uparque: Project = {
  slug: "uparque",
  title: "Uparque",
  type: "client",
  status: "completed",
  dateStart: "2026-04-01",
  featured: true,
  techs: ["react", "typescript", "tailwind", "radix"],
  links: {
    site: "https://uparque.pages.dev/",
    repo: "https://github.com/thetiagogil/14-uparque",
  },
  images: [
    "uparque/uparque-1.png",
    "uparque/uparque-2.png",
    "uparque/uparque-3.png",
    "uparque/uparque-4.png",
    "uparque/uparque-5.png",
  ],
  subtitle: {
    en: "Local coffee shop website",
    pt: "Website para cafetaria local",
  },
  summary: {
    en: "A local coffee shop website focused on visual identity, menu, opening hours, location, photos, and contacts.",
    pt: "Um website para uma cafetaria local, focado em identidade visual, menu, horário, localização, fotografias e contactos.",
  },
  brief: {
    en: [
      [
        "Uparque is a website for a local coffee shop client, built to present the brand, menu, location, photos, and contact details clearly.",
      ],
    ],
    pt: [
      [
        "Uparque é um website para uma cafetaria local, criado para apresentar claramente a marca, menu, localização, fotografias e contactos.",
      ],
    ],
  },
};
