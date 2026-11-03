// Conteúdo fixo das páginas institucionais (não vem da API)

export interface Pergunta {
  id: number;
  pergunta: string;
  resposta: string;
}

export interface MissaoDiaria {
  id: number;
  titulo: string;
  descricao: string;
  pontos: number;
}
