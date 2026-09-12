import type { Pergunta } from "../types";

export const perguntas: Pergunta[] = [
  {
    id: 1,
    pergunta: "Como meu avatar acumula XP?",
    resposta:
      "Sempre que você cumpre e marca uma missão ecológica no painel, seu avatar absorve esses pontos e " +
      "evolui de estágio biológico, indo de muda de planta para árvore.",
  },
  {
    id: 2,
    pergunta: "O avatar entende o que eu escrevo para ele?",
    resposta:
      "Estamos treinando o Soul para isso. Já montamos uma base com mil mensagens em português, separadas " +
      "em quatro intenções: pedir uma sugestão, pedir incentivo, consultar o próprio progresso e tirar uma " +
      "dúvida sobre sustentabilidade. O modelo que classifica essas mensagens entra na próxima etapa.",
  },
  {
    id: 3,
    pergunta: "Trocar um prêmio faz meu nível cair?",
    resposta:
      "Não. A experiência que define o nível nunca diminui. O resgate desconta apenas do saldo de pontos, " +
      "que é a moeda usada para trocar recompensas.",
  },
  {
    id: 4,
    pergunta: "Onde os meus dados ficam guardados?",
    resposta:
      "Em um banco Oracle com dez tabelas e restrições de integridade. O progresso continua salvo depois " +
      "que você fecha o aplicativo.",
  },
];
