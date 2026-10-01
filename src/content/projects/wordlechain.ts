import type { Project } from "../types";

export const wordlechain: Project = {
  slug: "wordlechain",
  title: "Wordlechain",
  type: "learning",
  status: "completed",
  dateStart: "2023-12-05",
  techs: ["react", "typescript", "joy", "wagmi", "solidity"],
  links: {
    site: "https://wordlechain.pages.dev",
    repo: "https://github.com/thetiagogil/12-wordlechain",
  },
  images: [
    "wordlechain/wordlechain-1.png",
    "wordlechain/wordlechain-2.png",
    "wordlechain/wordlechain-3.png",
  ],
  subtitle: {
    en: "Web3 Wordle game",
    pt: "Jogo Wordle Web3",
  },
  summary: {
    en: "A Web3 Wordle game where wallet-connected players use tokens to play.",
    pt: "Um jogo Wordle Web3 onde jogadores com wallet usam tokens para jogar.",
  },
  brief: {
    en: [
      [
        "Wordlechain is a Web3 Wordle game built during ",
        {
          text: "Subvisual",
          to: "experience/subvisual",
        },
        ", with wallet connection, token-based plays, and smart contract interaction.",
      ],
    ],
    pt: [
      [
        "Wordlechain é um jogo Wordle Web3 feito durante a ",
        {
          text: "Subvisual",
          to: "experience/subvisual",
        },
        ", com ligação de wallet, jogadas baseadas em tokens e interação com smart contracts.",
      ],
    ],
  },
};
