import type { Project } from "../types";

export const onesbryne: Project = {
  slug: "onesbryne",
  title: "Onesbryne",
  type: "client",
  status: "completed",
  dateStart: "2024-06-01",
  featured: true,
  techs: ["nextjs", "typescript", "tailwind", "radix", "supabase"],
  links: {
    site: "https://onesbryne.vercel.app/",
    repo: "https://github.com/thetiagogil/08-onesbryne",
  },
  images: [
    "onesbryne/onesbryne-1.png",
    "onesbryne/onesbryne-2.png",
    "onesbryne/onesbryne-3.png",
    "onesbryne/onesbryne-4.png",
    "onesbryne/onesbryne-5.png",
    "onesbryne/onesbryne-6.png",
  ],
  subtitle: {
    en: "Curated clothing resale app",
    pt: "App de revenda curada de roupa",
  },
  summary: {
    en: "A commerce website for curated clothing resale, with catalog browsing, favorites, email purchase requests, and admin management.",
    pt: "Um website de comércio para revenda curada de roupa, com catálogo, favoritos, pedidos por email e gestão em admin.",
  },
  brief: {
    en: [
      [
        "Onesbryne is a client commerce site for curated clothing resale, built around browsing, saving, and requesting pieces by email.",
      ],
    ],
    pt: [
      [
        "Onesbryne é um site de comércio para cliente, focado em revenda curada de roupa e construído em torno de explorar, guardar e pedir peças por email.",
      ],
    ],
  },
};
