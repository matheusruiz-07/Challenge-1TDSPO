import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import Carregando from "../components/Carregando";
import ListaVazia from "../components/ListaVazia";
import MensagemErro from "../components/MensagemErro";
import { listarUsuarios } from "../services/usuarios";
import type { Usuario } from "../types/usuario";

// Ranking dos usuários cadastrados na API (GET /usuarios)
export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);
  const location = useLocation();
  const mensagem = (location.state as { mensagem?: string } | null)?.mensagem;

  useEffect(() => {
    async function carregarUsuarios() {
      setCarregando(true);
      setErro(null);
      try {
        const dados = await listarUsuarios();
        setUsuarios(dados);
      } catch (falha) {
        setErro(falha instanceof Error ? falha.message : "Não foi possível carregar os usuários.");
      } finally {
        setCarregando(false);
      }
    }
    carregarUsuarios();
  }, [tentativa]);

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-folha-700 md:text-3xl">Usuários</h1>
          <p className="mt-3 text-slate-600">
            Ranking por experiência acumulada. Escolha um perfil para registrar ações e
            acompanhar as missões.
          </p>
        </div>
        <Link
          to="/usuarios/novo"
          className="shrink-0 self-start rounded-lg bg-folha-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-folha-700 sm:self-auto"
        >
          Cadastrar usuário
        </Link>
      </div>

      {mensagem && (
        <p role="status" className="mt-6 rounded-lg border-2 border-folha-500 bg-folha-50 px-4 py-3 text-sm text-folha-700">
          {mensagem}
        </p>
      )}

      <div className="mt-8">
        {carregando ? (
          <Carregando mensagem="Carregando usuários..." />
        ) : erro ? (
          <MensagemErro mensagem={erro} aoTentarNovamente={() => setTentativa((n) => n + 1)} />
        ) : usuarios.length === 0 ? (
          <ListaVazia mensagem="Nenhum usuário cadastrado ainda.">
            <Link to="/usuarios/novo" className="font-semibold text-folha-700 underline">
              Cadastrar o primeiro usuário
            </Link>
          </ListaVazia>
        ) : (
          <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {usuarios.map((usuario, posicao) => (
              <li key={usuario.id}>
                <article className="flex h-full flex-col rounded-xl border border-folha-200 bg-white p-5 shadow-xs">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-folha-700 text-sm font-bold text-white">
                        {posicao + 1}º
                      </span>
                      <h2 className="font-bold text-folha-700">{usuario.nome}</h2>
                    </div>
                    <span className="shrink-0 rounded-full bg-folha-50 px-3 py-1 text-xs font-semibold text-folha-700">
                      Nível {usuario.nivel}
                    </span>
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-slate-500">Experiência</dt>
                      <dd className="mt-1 font-semibold tabular-nums text-slate-800">
                        {usuario.pontosExperiencia.toLocaleString("pt-BR")} XP
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-slate-500">Saldo</dt>
                      <dd className="mt-1 font-semibold tabular-nums text-slate-800">
                        {usuario.saldoPontos.toLocaleString("pt-BR")} pts
                      </dd>
                    </div>
                  </dl>

                  <Link
                    to={`/usuarios/${usuario.id}`}
                    className="mt-5 self-start rounded-lg border-2 border-folha-500 px-4 py-2 text-sm font-semibold text-folha-700 transition-colors hover:bg-folha-50"
                  >
                    Ver perfil
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
