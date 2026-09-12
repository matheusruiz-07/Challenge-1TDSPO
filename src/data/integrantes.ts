import type { Integrante } from "../types";

export const integrantes: Integrante[] = [
  {
    rm: "570701",
    nome: "Matheus Ruiz Giatti",
    papel: "Banco de dados e back-end Java",
    descricao:
      "Responsavel pela modelagem do banco no Oracle Data Modeler, pelo script DDL com as dez tabelas " +
      "e pela camada DAO em Java que conecta a aplicacao ao Oracle.",
    github: "https://github.com/matheusruiz-07",
    linkedin: "https://www.linkedin.com/in/matheus-ruiz-9215ba325/",
  },
  {
    rm: "573416",
    nome: "Matheus Leite Souza das Virgens",
    papel: "Front-end e logica em Python",
    descricao:
      "Responsavel pelas telas da aplicacao, pela estilizacao com Tailwind e pelo sistema de " +
      "gerenciamento em Python com menu interativo e validacoes.",
    github: "https://github.com/matheusleite21",
    linkedin: "https://www.linkedin.com/in/matheus-leite-aaab75352/",
  },
];

export function buscarIntegrante(rm: string): Integrante | undefined {
  return integrantes.find((i) => i.rm === rm);
}
