import type { Pergunta } from "../types";

export const perguntas: Pergunta[] = [
  {
    id: 1,
    pergunta: "Como meu avatar acumula XP?",
    resposta:
      "Sempre que voce cumpre e marca uma missao ecologica no painel, seu avatar absorve esses pontos e " +
      "evolui de estagio biologico, indo de muda de planta para arvore.",
  },
  {
    id: 2,
    pergunta: "Vou poder usar o bot em outros canais?",
    resposta:
      "Sim. A solucao preve integracao com o Telegram por meio de Node-RED e IBM Watson Assistant.",
  },
  {
    id: 3,
    pergunta: "Trocar um premio faz meu nivel cair?",
    resposta:
      "Nao. A experiencia que define o nivel nunca diminui. O resgate desconta apenas do saldo de pontos, " +
      "que e a moeda usada para trocar recompensas.",
  },
  {
    id: 4,
    pergunta: "Onde os meus dados ficam guardados?",
    resposta:
      "Em um banco Oracle com dez tabelas e restricoes de integridade. O progresso continua salvo depois " +
      "que voce fecha o aplicativo.",
  },
];
