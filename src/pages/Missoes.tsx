import { useEffect, useState } from "react";
import { Link } from "react-router";
import Card from "../components/Card";
import Carregando from "../components/Carregando";
import ListaVazia from "../components/ListaVazia";
import MensagemErro from "../components/MensagemErro";
import { useUsuarioAtivo } from "../contexts/UsuarioAtivoContext";
import { listarMissoes } from "../services/missoes";
import { listarMissoesDoUsuario } from "../services/usuarios";
import type { CriterioMissao, Dificuldade, MissaoDoUsuario } from "../types/missao";

const UNIDADE_CRITERIO: Record<CriterioMissao, string> = {
  QUANTIDADE_ACOES: "ações registradas",
  CATEGORIAS_DISTINTAS: "categorias diferentes",
  PONTOS_EXPERIENCIA: "XP",
  NIVEL: "nível",
};

const NOME_DIFICULDADE: Record<Dificuldade, string> = {
  FACIL: "Fácil",
  MEDIO: "Médio",
  DIFICIL: "Difícil",
};

// Missões da API: com perfil em uso mostra status e progresso
// (GET /usuarios/:id/missoes); sem perfil mostra o catálogo (GET /missoes)
export default function Missoes() {
  const { usuarioAtivo } = useUsuarioAtivo();
  const [missoes, setMissoes] = useState<MissaoDoUsuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);
  const idUsuario = usuarioAtivo?.id;

  useEffect(() => {
    async function carregarMissoes() {
      setCarregando(true);
      setErro(null);
      try {
        if (idUsuario) {
          setMissoes(await listarMissoesDoUsuario(idUsuario));
        } else {
          // sem usuário, o catálogo é exibido como missões pendentes e sem progresso
          const catalogo = await listarMissoes();
          setMissoes(
            catalogo.map(({ id, ...missao }) => ({
              ...missao,
              idMissao: id,
              progresso: null,
              status: "PENDENTE",
              dataConclusao: null,
              bonusConcedido: null,
            })),
          );
        }
      } catch (falha) {
        setErro(falha instanceof Error ? falha.message : "Não foi possível carregar as missões.");
      } finally {
        setCarregando(false);
      }
    }
    carregarMissoes();
  }, [idUsuario, tentativa]);

  const concluidas = missoes.filter((missao) => missao.status === "CONCLUIDA").length;

  return (
    <section>
      <h1 className="text-2xl font-bold text-folha-700 md:text-3xl">Missões</h1>
      <p className="mt-3 leading-relaxed text-slate-600">
        Desafios que rendem pontos extras. A conclusão é automática: quando a meta é
        atingida ao registrar uma ação, o bônus entra na hora.
      </p>

      {usuarioAtivo ? (
        <p className="mt-4 rounded-lg bg-folha-50 px-4 py-3 text-sm text-folha-700">
          Progresso de <strong>{usuarioAtivo.nome}</strong>
          {!carregando && !erro && ` · ${concluidas} de ${missoes.length} missões concluídas`}
        </p>
      ) : (
        <p className="mt-4 rounded-lg border border-folha-200 px-4 py-3 text-sm text-slate-600">
          Você está vendo o catálogo.{" "}
          <Link to="/usuarios" className="font-semibold text-folha-700 underline">
            Escolha um perfil
          </Link>{" "}
          para acompanhar o seu progresso.
        </p>
      )}

      <div className="mt-8">
        {carregando ? (
          <Carregando mensagem="Carregando missões..." />
        ) : erro ? (
          <MensagemErro mensagem={erro} aoTentarNovamente={() => setTentativa((n) => n + 1)} />
        ) : missoes.length === 0 ? (
          <ListaVazia mensagem="Nenhuma missão cadastrada no momento." />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {missoes.map((missao) => {
              const feita = missao.status === "CONCLUIDA";
              const porcentagem =
                missao.meta && missao.progresso !== null
                  ? Math.min(100, (missao.progresso / missao.meta) * 100)
                  : 0;
              return (
                <li key={missao.idMissao}>
                  <Card
                    titulo={missao.nome}
                    destaque={feita ? "Concluída" : `+${missao.pontosRecompensa} pts`}
                  >
                    <p className="leading-relaxed">{missao.descricao}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      Dificuldade: {NOME_DIFICULDADE[missao.dificuldade]}
                    </p>

                    {feita ? (
                      <p className="mt-4 text-sm font-semibold text-folha-500">
                        Concluída em{" "}
                        {missao.dataConclusao
                          ? new Date(`${missao.dataConclusao}T00:00:00`).toLocaleDateString("pt-BR")
                          : "data não informada"}
                        {missao.bonusConcedido !== null && ` · +${missao.bonusConcedido} pts de bônus`}
                      </p>
                    ) : (
                      missao.progresso !== null &&
                      missao.meta !== null &&
                      missao.tipoCriterio && (
                        <div className="mt-4">
                          <div
                            className="h-2 overflow-hidden rounded-full bg-slate-200"
                            role="progressbar"
                            aria-valuenow={Math.round(porcentagem)}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`Progresso da missão ${missao.nome}`}
                          >
                            <div className="h-full bg-folha-500" style={{ width: `${porcentagem}%` }} />
                          </div>
                          <p className="mt-1 text-xs text-slate-500">
                            {missao.progresso} de {missao.meta} {UNIDADE_CRITERIO[missao.tipoCriterio]}
                          </p>
                        </div>
                      )
                    )}
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {usuarioAtivo && (
        <Link
          to="/registrar"
          className="mt-8 inline-flex rounded-lg bg-folha-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-folha-700"
        >
          Registrar uma ação
        </Link>
      )}
    </section>
  );
}
