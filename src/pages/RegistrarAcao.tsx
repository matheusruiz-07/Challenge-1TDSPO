import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router";
import Carregando from "../components/Carregando";
import ListaVazia from "../components/ListaVazia";
import MensagemErro from "../components/MensagemErro";
import { useUsuarioAtivo } from "../contexts/UsuarioAtivoContext";
import { listarAcoes, registrarAcao } from "../services/acoes";
import type { Acao, RegistroResultado } from "../types/acao";

type CamposRegistro = {
  idAcao: number;
  descricao: string;
};

// Registro de ação sustentável do usuário em uso (GET /acoes e POST /registros)
export default function RegistrarAcao() {
  const { usuarioAtivo } = useUsuarioAtivo();
  const [acoes, setAcoes] = useState<Acao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroCatalogo, setErroCatalogo] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);
  const [resultado, setResultado] = useState<RegistroResultado | null>(null);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CamposRegistro>({ defaultValues: { idAcao: 0, descricao: "" } });

  useEffect(() => {
    async function carregarCatalogo() {
      setCarregando(true);
      setErroCatalogo(null);
      try {
        setAcoes(await listarAcoes());
      } catch (falha) {
        setErroCatalogo(falha instanceof Error ? falha.message : "Não foi possível carregar o catálogo.");
      } finally {
        setCarregando(false);
      }
    }
    carregarCatalogo();
  }, [tentativa]);

  // useWatch acompanha a ação escolhida para mostrar a descrição dela
  const idAcaoEscolhida = useWatch({ control, name: "idAcao" });
  const acaoEscolhida = acoes.find((acao) => acao.id === Number(idAcaoEscolhida));

  async function enviar(dados: CamposRegistro) {
    if (!usuarioAtivo) return;
    setErroEnvio(null);
    setResultado(null);
    try {
      const resposta = await registrarAcao({
        idUsuario: usuarioAtivo.id,
        idAcao: dados.idAcao,
        descricao: dados.descricao.trim(),
      });
      setResultado(resposta);
      reset();
    } catch (falha) {
      setErroEnvio(falha instanceof Error ? falha.message : "Não foi possível registrar a ação.");
    }
  }

  if (!usuarioAtivo) {
    return (
      <section>
        <h1 className="text-2xl font-bold text-folha-700 md:text-3xl">Registrar ação</h1>
        <div className="mt-6">
          <ListaVazia mensagem="Para registrar uma ação, primeiro escolha qual perfil está usando o SoulUp.">
            <Link
              to="/usuarios"
              className="inline-flex rounded-lg bg-folha-500 px-5 py-3 text-sm font-semibold text-white hover:bg-folha-700"
            >
              Escolher um perfil
            </Link>
          </ListaVazia>
        </div>
      </section>
    );
  }

  const campo = "w-full rounded-lg border px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-folha-200";
  const rotulo = "mb-1 block text-sm font-semibold text-slate-700";
  const aviso = "mt-1 text-xs text-red-600";

  return (
    <section>
      <h1 className="text-2xl font-bold text-folha-700 md:text-3xl">Registrar ação</h1>
      <p className="mt-3 text-slate-600">
        Registrando como <strong className="text-folha-700">{usuarioAtivo.nome}</strong>. Os
        pontos vêm do catálogo e as missões atingidas são concluídas na hora.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          {carregando ? (
            <Carregando mensagem="Carregando o catálogo de ações..." />
          ) : erroCatalogo ? (
            <MensagemErro mensagem={erroCatalogo} aoTentarNovamente={() => setTentativa((n) => n + 1)} />
          ) : acoes.length === 0 ? (
            <ListaVazia mensagem="O catálogo de ações está vazio." />
          ) : (
            <form
              onSubmit={handleSubmit(enviar)}
              noValidate
              className="space-y-4 rounded-xl border border-folha-200 bg-white p-6 shadow-xs"
            >
              {erroEnvio && (
                <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {erroEnvio}
                </p>
              )}

              <div>
                <label htmlFor="idAcao" className={rotulo}>O que você fez?</label>
                <select
                  id="idAcao"
                  className={`${campo} ${errors.idAcao ? "border-red-500" : "border-slate-300"}`}
                  aria-invalid={Boolean(errors.idAcao)}
                  {...register("idAcao", {
                    valueAsNumber: true,
                    validate: (valor) => valor > 0 || "Escolha uma ação do catálogo.",
                  })}
                >
                  <option value={0}>Selecione</option>
                  {acoes.map((acao) => (
                    <option key={acao.id} value={acao.id}>
                      {acao.categoria} — {acao.nome} (+{acao.pontosPadrao} pts)
                    </option>
                  ))}
                </select>
                {errors.idAcao && <p role="alert" className={aviso}>{errors.idAcao.message}</p>}
                {acaoEscolhida?.descricao && (
                  <p className="mt-2 text-xs text-slate-500">{acaoEscolhida.descricao}</p>
                )}
              </div>

              <div>
                <label htmlFor="descricao" className={rotulo}>Conte como foi</label>
                <textarea
                  id="descricao"
                  rows={4}
                  className={`${campo} ${errors.descricao ? "border-red-500" : "border-slate-300"}`}
                  aria-invalid={Boolean(errors.descricao)}
                  {...register("descricao", {
                    required: "Descreva a ação realizada.",
                    minLength: { value: 5, message: "Escreva ao menos 5 caracteres." },
                    maxLength: { value: 300, message: "Use no máximo 300 caracteres." },
                  })}
                />
                {errors.descricao && <p role="alert" className={aviso}>{errors.descricao.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer rounded-lg bg-folha-500 px-6 py-3 text-sm font-semibold text-white hover:bg-folha-700 disabled:cursor-wait disabled:opacity-60"
              >
                {isSubmitting ? "Registrando..." : "Registrar ação"}
              </button>
            </form>
          )}
        </div>

        <aside aria-live="polite">
          {resultado ? (
            <div role="status" className="rounded-xl border-2 border-folha-500 bg-folha-50 p-6">
              <p className="text-lg font-bold text-folha-700">
                +{resultado.registro.pontuacao} pontos para {resultado.usuario.nome}!
              </p>
              <p className="mt-2 text-sm text-slate-600">
                "{resultado.registro.nomeAcao}" foi registrada com impacto {resultado.registro.impacto}.
              </p>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-white p-3">
                  <dt className="text-xs text-slate-500">Nível</dt>
                  <dd className="text-xl font-bold text-folha-700">{resultado.usuario.nivel}</dd>
                </div>
                <div className="rounded-lg bg-white p-3">
                  <dt className="text-xs text-slate-500">XP</dt>
                  <dd className="text-xl font-bold tabular-nums text-folha-700">{resultado.usuario.pontosExperiencia}</dd>
                </div>
                <div className="rounded-lg bg-white p-3">
                  <dt className="text-xs text-slate-500">Saldo</dt>
                  <dd className="text-xl font-bold tabular-nums text-folha-700">{resultado.usuario.saldoPontos}</dd>
                </div>
              </dl>
              {resultado.missoesConcluidas.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-folha-700">Missões concluídas agora:</p>
                  <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
                    {resultado.missoesConcluidas.map((nome) => (
                      <li key={nome}>{nome}</li>
                    ))}
                  </ul>
                </div>
              )}
              <Link
                to={`/usuarios/${resultado.usuario.id}`}
                className="mt-5 inline-flex font-semibold text-folha-700 underline"
              >
                Ver histórico completo
              </Link>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-folha-200 bg-folha-50 p-6">
              <p className="text-lg font-semibold text-folha-700">Olá! Eu sou o Soul.</p>
              <p className="mt-2 leading-relaxed text-slate-600">
                Cada ação registrada vira experiência para subir de nível e saldo para trocar
                por recompensas. Qual foi a sua atitude sustentável hoje?
              </p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
