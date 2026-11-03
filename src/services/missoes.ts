import type { Missao } from "../types/missao";
import { requisitar } from "./api";

export function listarMissoes(): Promise<Missao[]> {
  return requisitar<Missao[]>("/missoes");
}
