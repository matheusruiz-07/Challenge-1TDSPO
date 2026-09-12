import { Link } from "react-router-dom";

const pilares = [
  {
    titulo: "Registre o que você faz",
    texto:
      "Separou o lixo, foi de transporte público, economizou energia. Cada ação registrada recebe uma classificação de impacto na hora.",
  },
  {
    titulo: "Ganhe pontos e suba de nível",
    texto:
      "A experiência acumulada define o seu nível, do 1 ao 5, e nunca diminui. Em paralelo, você forma um saldo para gastar.",
  },
  {
    titulo: "Troque por recompensas reais",
    texto:
      "O saldo vira desconto na conta de luz, brinde ou experiência. Resgatar um prêmio não derruba o seu nível.",
  },
];

const botaoPrincipal =
  "rounded-lg bg-folha-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-folha-700 focus:outline-none focus:ring-2 focus:ring-folha-200";
const botaoSecundario =
  "rounded-lg border-2 border-folha-500 px-5 py-3 text-sm font-semibold text-folha-700 transition-colors hover:bg-folha-50 focus:outline-none focus:ring-2 focus:ring-folha-200";

export default function Home() {
  return (
    <>
      <section>
        <h1 className="text-3xl font-bold text-folha-700 md:text-4xl">
          Transforme suas ações diárias em um futuro sustentável
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
          Conheça o ecossistema digital da SoulUp, em parceria com a Prospera.
          Mude seus hábitos, cuide do planeta, converse com o seu avatar
          inteligente e ganhe recompensas reais, como desconto na conta de
          energia.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/solucao" className={botaoPrincipal}>
            Conhecer o avatar
          </Link>
          <Link to="/sobre" className={botaoSecundario}>
            Saber mais
          </Link>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="como-funciona">
        <h2 id="como-funciona" className="text-xl font-bold text-folha-700">
          Como funciona
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {pilares.map((pilar) => (
            <article
              key={pilar.titulo}
              className="rounded-lg border border-slate-200 p-5"
            >
              <h3 className="font-semibold text-folha-700">{pilar.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {pilar.texto}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-lg border-2 border-folha-200 bg-folha-50 p-6">
        <p className="text-lg font-semibold text-folha-700">
          Olá! Eu sou o Soul.
        </p>
        <p className="mt-2 leading-relaxed text-slate-600">
          Estou aqui para guiar a sua jornada sustentável. Registre a sua
          primeira ação e vamos evoluir juntos.
        </p>
      </section>
    </>
  );
}
