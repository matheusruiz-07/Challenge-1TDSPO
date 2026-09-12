import Card from "../components/Card";

export default function Sobre() {
  return (
    <>
      <section>
        <h1 className="text-2xl font-bold text-folha-700 md:text-3xl">
          Sobre o desafio selecionado
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
          Nossa equipe escolheu focar no Desafio 3: Avatar Inteligente e
          Interativo. Entendemos que, para a SoulUp mitigar o desperdício
          socioambiental, é necessário humanizar a coleta de dados de consumo.
        </p>

        <h2 className="mt-8 text-xl font-bold text-folha-700">
          O propósito técnico
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">
          O ecossistema integra inteligência cognitiva e persistência de dados
          relacional. O objetivo é dar ao usuário um companheiro virtual que
          evolui em tempo real, gerando relatórios de economia consistentes para
          subsidiar bônus reais nas faturas de energia das concessionárias
          parceiras.
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2" aria-label="Tecnologias do projeto">
        <Card titulo="Banco de dados" destaque="Oracle">
          Dez tabelas com chaves e restrições de integridade
        </Card>
        <Card titulo="Back-end" destaque="Java">
          Regras de pontuação e nível, camada DAO isolando o banco
        </Card>
        <Card titulo="Automação" destaque="Python">
          Menu interativo, validações e relatórios
        </Card>
        <Card titulo="Interface" destaque="React">
          SPA com React, Vite, TypeScript e Tailwind
        </Card>
      </section>
    </>
  );
}
