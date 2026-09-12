export type Integrante = {
  rm: string;
  nome: string;
  papel: string;
  descricao: string;
  github: string;
  linkedin: string;
};

export type Missao = {
  id: number;
  titulo: string;
  descricao: string;
  pontos: number;
};

export type Pergunta = {
  id: number;
  pergunta: string;
  resposta: string;
};
