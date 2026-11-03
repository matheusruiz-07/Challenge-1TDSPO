import { createContext, useContext } from "react";
import type { Usuario } from "../types/usuario";

// Usuário que está usando o site agora: as páginas da solução
// (registrar ação, missões) e o Header leem esse valor.
export type UsuarioAtivo = Pick<Usuario, "id" | "nome">;

export type UsuarioAtivoContextValue = {
  usuarioAtivo: UsuarioAtivo | null;
  selecionarUsuario: (usuario: UsuarioAtivo) => void;
  sairDoPerfil: () => void;
};

export const UsuarioAtivoContext = createContext<UsuarioAtivoContextValue | undefined>(
  undefined,
);

// Hook personalizado: única porta de entrada para ler o contexto
export function useUsuarioAtivo() {
  const context = useContext(UsuarioAtivoContext);
  if (context === undefined) {
    throw new Error("useUsuarioAtivo deve ser usado dentro de UsuarioAtivoProvider");
  }
  return context;
}
