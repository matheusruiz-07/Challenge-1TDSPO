import { useNavigate, useParams } from "react-router-dom";
import Botao from "../components/Botao";
import { buscarIntegrante } from "../data/integrantes";

export default function IntegranteDetalhe() {
  const navegar = useNavigate();
  const { rm } = useParams<{ rm: string }>();
  const integrante = rm ? buscarIntegrante(rm) : undefined;

  if (!integrante) {
    return (
      <section className="rounded-xl border border-folha-200 bg-folha-50 p-6">
        <h1 className="text-2xl font-bold text-folha-700">
          Integrante não encontrado
        </h1>
        <p className="mt-3 text-slate-600">
          Não encontramos uma pessoa com o RM {rm ?? "não informado"}.
        </p>
        <div className="mt-6">
          <Botao onClick={() => navegar("/integrantes")}>
            Voltar para integrantes
          </Botao>
        </div>
      </section>
    );
  }

  return (
    <article>
      <Botao tipo="secundario" onClick={() => navegar(-1)}>
        Voltar
      </Botao>

      <div className="mt-6 rounded-xl border border-folha-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-folha-500">{integrante.papel}</p>
        <h1 className="mt-2 text-2xl font-bold text-folha-700 md:text-3xl">
          {integrante.nome}
        </h1>

        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-slate-800">RM</dt>
            <dd className="mt-1 text-slate-600">{integrante.rm}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-800">Turma</dt>
            <dd className="mt-1 text-slate-600">1TDSPO</dd>
          </div>
        </dl>

        <p className="mt-6 max-w-3xl leading-relaxed text-slate-600">
          {integrante.descricao}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={integrante.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-folha-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-folha-700"
          >
            GitHub
          </a>
          <a
            href={integrante.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border-2 border-folha-500 px-5 py-3 text-sm font-semibold text-folha-700 transition-colors hover:bg-folha-50"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </article>
  );
}
