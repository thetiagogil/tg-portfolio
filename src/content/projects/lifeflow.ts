import type { Project } from "../types";

export const lifeflow: Project = {
  slug: "lifeflow",
  title: "Lifeflow",
  type: "personal",
  status: "planned",
  dateStart: "2026-05-01",
  techs: ["nextjs", "typescript", "mui", "supabase"],
  images: [],
  subtitle: {
    en: "Modular life system",
    pt: "Sistema modular de vida",
  },
  summary: {
    en: "A planned modular life system for organizing body, habits, finance, and future personal modules in one app.",
    pt: "Um sistema modular de vida planeado para organizar corpo, hábitos, finanças e futuros módulos pessoais numa só app.",
  },
  brief: {
    en: [
      [
        "Lifeflow is a planned modular life system for organizing everyday areas in one app, with body, habits, and finance as the first MVP.",
      ],
    ],
    pt: [
      [
        "Lifeflow é um sistema modular de vida planeado para organizar áreas do dia a dia numa só app, com corpo, hábitos e finanças como primeiro MVP.",
      ],
    ],
  },
};
