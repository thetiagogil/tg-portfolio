import type { Project } from "../types";

export const easyqa: Project = {
  slug: "easyqa",
  title: "Easyqa",
  type: "learning",
  status: "completed",
  dateStart: "2024-03-01",
  techs: ["nextjs", "typescript", "joy", "supabase"],
  links: {
    site: "https://easyqa.vercel.app/",
    repo: "https://github.com/thetiagogil/07-easyqa",
  },
  images: [
    "easyqa/easyqa-1.png",
    "easyqa/easyqa-2.png",
    "easyqa/easyqa-3.png",
    "easyqa/easyqa-4.png",
    "easyqa/easyqa-5.png",
  ],
  subtitle: {
    en: "Q&A app",
    pt: "App de Q&A",
  },
  summary: {
    en: "A Q&A app for creating questions, answering them, liking questions, and marking accepted answers.",
    pt: "Uma app de Q&A para criar perguntas, responder, gostar de perguntas e marcar respostas aceites.",
  },
  brief: {
    en: [
      [
        "Easyqa is a Q&A app where users ask questions, answer other users, like questions, and mark correct answers when they own the question.",
      ],
    ],
    pt: [
      [
        "Easyqa é uma app de Q&A onde utilizadores criam perguntas, respondem a outros utilizadores, gostam de perguntas e marcam respostas corretas quando são donos da pergunta.",
      ],
    ],
  },
};
