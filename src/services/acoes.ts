import type { Acao, RegistroFormulario, RegistroResultado } from "../types/acao";
import { requisitar } from "./api";

export function listarAcoes(): Promise<Acao[]> {
  return requisitar<Acao[]>("/acoes");
}

export function registrarAcao(dados: RegistroFormulario): Promise<RegistroResultado> {
  return requisitar<RegistroResultado>("/registros", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export function atualizarRegistro(id: number, dados: RegistroFormulario): Promise<RegistroResultado> {
  return requisitar<RegistroResultado>(`/registros/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
}

export function excluirRegistro(id: number): Promise<void> {
  return requisitar<void>(`/registros/${id}`, { method: "DELETE" });
}
