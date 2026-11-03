// Contratos das missões (/missoes e /usuarios/:id/missoes)

export type Dificuldade = "FACIL" | "MEDIO" | "DIFICIL";

export type CriterioMissao =
  | "QUANTIDADE_ACOES"
  | "CATEGORIAS_DISTINTAS"
  | "PONTOS_EXPERIENCIA"
  | "NIVEL";

export type StatusMissao = "PENDENTE" | "CONCLUIDA";

export interface Missao {
  id: number;
  nome: string;
  descricao: string;
  pontosRecompensa: number;
  dificuldade: Dificuldade;
  tipoCriterio: CriterioMissao | null;
  meta: number | null;
}

// Intersection type: os dados da missão somados à situação de um usuário
export type MissaoDoUsuario = Omit<Missao, "id"> & {
  idMissao: number;
  progresso: number | null;
  status: StatusMissao;
  dataConclusao: string | null;
  bonusConcedido: number | null;
};
