import type { RegistroAcao } from "../types/acao";
import type { MissaoDoUsuario } from "../types/missao";
import type { Usuario, UsuarioFormulario } from "../types/usuario";
import { requisitar } from "./api";

export function listarUsuarios(): Promise<Usuario[]> {
  return requisitar<Usuario[]>("/usuarios");
}

export function buscarUsuario(id: number): Promise<Usuario> {
  return requisitar<Usuario>(`/usuarios/${id}`);
}

export function cadastrarUsuario(dados: UsuarioFormulario): Promise<Usuario> {
  return requisitar<Usuario>("/usuarios", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export function atualizarUsuario(id: number, dados: UsuarioFormulario): Promise<Usuario> {
  return requisitar<Usuario>(`/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
}

export function excluirUsuario(id: number): Promise<void> {
  return requisitar<void>(`/usuarios/${id}`, { method: "DELETE" });
}

export function listarRegistrosDoUsuario(id: number): Promise<RegistroAcao[]> {
  return requisitar<RegistroAcao[]>(`/usuarios/${id}/registros`);
}

export function listarMissoesDoUsuario(id: number): Promise<MissaoDoUsuario[]> {
  return requisitar<MissaoDoUsuario[]>(`/usuarios/${id}/missoes`);
}
