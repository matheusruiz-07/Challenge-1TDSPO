// Contratos dos dados de usuário trocados com a API Java (/usuarios)

// Union type: o nível só pode assumir um destes cinco valores
export type NivelUsuario = 1 | 2 | 3 | 4 | 5;

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  dataCadastro: string;
  pontosExperiencia: number;
  saldoPontos: number;
  nivel: NivelUsuario;
}

// Campos enviados no cadastro e na edição (POST e PUT /usuarios)
export type UsuarioFormulario = Pick<Usuario, "nome" | "email">;
