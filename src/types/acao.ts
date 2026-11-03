import type { Usuario } from "./usuario";

// Contratos do catálogo de ações e dos registros (/acoes e /registros)

export type Impacto = "MINIMO" | "BAIXO" | "MEDIO" | "ALTO";

export interface Acao {
  id: number;
  nome: string;
  descricao: string | null;
  pontosPadrao: number;
  idCategoria: number;
  categoria: string;
}

export interface RegistroAcao {
  id: number;
  idUsuario: number;
  nomeUsuario: string;
  idAcao: number;
  nomeAcao: string;
  categoria: string;
  descricao: string;
  pontuacao: number;
  impacto: Impacto;
  dataRegistro: string;
}

// Campos enviados ao registrar ou corrigir uma ação (POST e PUT /registros)
export interface RegistroFormulario {
  idUsuario: number;
  idAcao: number;
  descricao: string;
}

// Resposta do POST e do PUT: registro salvo, conta atualizada e missões concluídas
export interface RegistroResultado {
  registro: RegistroAcao;
  usuario: Usuario;
  missoesConcluidas: string[];
}
