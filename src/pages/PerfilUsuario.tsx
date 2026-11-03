import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import Botao from "../components/Botao";
import Carregando from "../components/Carregando";
import ListaVazia from "../components/ListaVazia";
import MensagemErro from "../components/MensagemErro";
import { useUsuarioAtivo } from "../contexts/UsuarioAtivoContext";
import { buscarUsuario, excluirUsuario, listarRegistrosDoUsuario } from "../services/usuarios";
import type { Impacto, RegistroAcao } from "../types/acao";
import type { NivelUsuario, Usuario } from "../types/usuario";

// Intersection type: os dados do usuário somados ao histórico de ações
type PerfilCompleto = Usuario & { registros: RegistroAcao[] };

// Experiência mínima de cada nível (mesmas faixas da API Java)
const XP_DO_NIVEL: Record<NivelUsuario, number> = { 1: 0, 2: 50, 3: 200, 4: 500, 5: 1000 };

const CORES_IMPACTO: Record<Impacto, string> = {
  MINIMO: "bg-slate-100 text-slate-700",
  BAIXO: "bg-sky-100 text-sky-800",
  MEDIO: "bg-amber-100 text-amber-800",
  ALTO: "bg-folha-50 text-folha-700",
};

function calcularProgresso(usuario: Usuario) {
  if (usuario.nivel === 5) {
    return { porcentagem: 100, texto: "Nível máximo alcançado" };
  }
  const proximo = (usuario.nivel + 1) as NivelUsuario;
  const inicio = XP_DO_NIVEL[usuario.nivel];
  const fim = XP_DO_NIVEL[proximo];
  const porcentagem = ((usuario.pontosExperiencia - inicio) / (fim - inicio)) * 100;
  return {
    porcentagem: Math.min(100, Math.max(0, porcentagem)),
    texto: `Faltam ${fim - usuario.pontosExperiencia} XP para o nível ${proximo}`,
  };
}

// Perfil de um usuário (GET /usuarios/:id e /usuarios/:id/registros)
export default function PerfilUsuario() {
  const { id } = useParams<{ id: string }>();
  const usuarioId = Number(id);
  const idValido = Number.isInteger(usuarioId) && usuarioId > 0;
  const navigate = useNavigate();
  const location = useLocation();
  const mensagem = (location.state as { mensagem?: string } | null)?.mensagem;
  const { usuarioAtivo, selecionarUsuario, sairDoPerfil } = useUsuarioAtivo();

  const [perfil, setPerfil] = useState<PerfilCompleto | null>(null);
  const [carregando, setCarregando] = useState(idValido);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);
  const [excluindo, setExcluindo] = useState(false);
  const [erroExclusao, setErroExclusao] = useState<string | null>(null);

  useEffect(() => {
    if (!idValido) return;

    async function carregarPerfil() {
      setCarregando(true);
      setErro(null);
      try {
        const [usuario, registros] = await Promise.all([
          buscarUsuario(usuarioId),
          listarRegistrosDoUsuario(usuarioId),
        ]);
        setPerfil({ ...usuario, registros });
      } catch (falha) {
        setErro(falha instanceof Error ? falha.message : "Não foi possível carregar o perfil.");
      } finally {
        setCarregando(false);
      }
    }
    carregarPerfil();
  }, [usuarioId, idValido, tentativa]);

  if (!idValido) {
    return (
      <section className="rounded-xl border border-folha-200 bg-folha-50 p-6">
        <h1 className="text-2xl font-bold text-folha-700">Endereço inválido</h1>
        <p className="mt-3 text-slate-600">"{id}" não é um identificador de usuário.</p>
        <div className="mt-6">
          <Botao onClick={() => navigate("/usuarios")}>Ver todos os usuários</Botao>
        </div>
      </section>
    );
  }

  if (carregando) return <Carregando mensagem="Carregando perfil..." />;

  if (erro || !perfil) {
    return (
      <section className="space-y-6">
        <MensagemErro
          mensagem={erro ?? "Perfil não encontrado."}
          aoTentarNovamente={() => setTentativa((n) => n + 1)}
        />
        <Botao tipo="secundario" onClick={() => navigate("/usuarios")}>
          Voltar para usuários
        </Botao>
      </section>
    );
  }

  async function excluir(usuario: Usuario) {
    const confirmou = window.confirm(
      `Excluir ${usuario.nome}? O histórico de ações e as missões também serão apagados.`,
    );
    if (!confirmou) return;

    setExcluindo(true);
    setErroExclusao(null);
    try {
      await excluirUsuario(usuario.id);
      if (usuarioAtivo?.id === usuario.id) {
        sairDoPerfil();
      }
      navigate("/usuarios", { state: { mensagem: `${usuario.nome} foi excluído.` } });
    } catch (falha) {
      setErroExclusao(falha instanceof Error ? falha.message : "Não foi possível excluir.");
      setExcluindo(false);
    }
  }

  const progresso = calcularProgresso(perfil);
  const emUso = usuarioAtivo?.id === perfil.id;

  return (
    <article>
      <Botao tipo="secundario" onClick={() => navigate("/usuarios")}>
        Voltar para usuários
      </Botao>

      {mensagem && (
        <p role="status" className="mt-6 rounded-lg border-2 border-folha-500 bg-folha-50 px-4 py-3 text-sm text-folha-700">
          {mensagem}
        </p>
      )}

      {erroExclusao && (
        <div className="mt-6">
          <MensagemErro mensagem={erroExclusao} />
        </div>
      )}

      <section className="mt-6 rounded-xl border border-folha-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold text-folha-500">
              Usuário #{perfil.id} · desde{" "}
              {new Date(`${perfil.dataCadastro}T00:00:00`).toLocaleDateString("pt-BR")}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-folha-700 md:text-3xl">{perfil.nome}</h1>
            <p className="mt-1 break-all text-sm text-slate-600">{perfil.email}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {emUso ? (
              <span className="rounded-lg bg-folha-50 px-4 py-3 text-sm font-semibold text-folha-700">
                Perfil em uso
              </span>
            ) : (
              <Botao onClick={() => selecionarUsuario(perfil)}>Usar este perfil</Botao>
            )}
            <Link
              to={`/usuarios/${perfil.id}/editar`}
              className="rounded-lg border-2 border-folha-500 px-5 py-3 text-sm font-semibold text-folha-700 transition-colors hover:bg-folha-50"
            >
              Editar
            </Link>
            <button
              type="button"
              disabled={excluindo}
              onClick={() => excluir(perfil)}
              className="cursor-pointer rounded-lg border-2 border-red-300 px-5 py-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
            >
              {excluindo ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-folha-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Nível</dt>
            <dd className="mt-1 text-2xl font-bold text-folha-700">{perfil.nivel}</dd>
          </div>
          <div className="rounded-lg bg-folha-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Experiência</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums text-folha-700">
              {perfil.pontosExperiencia.toLocaleString("pt-BR")} XP
            </dd>
          </div>
          <div className="rounded-lg bg-folha-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Saldo para recompensas</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums text-folha-700">
              {perfil.saldoPontos.toLocaleString("pt-BR")} pts
            </dd>
          </div>
        </dl>

        <div
          className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuenow={Math.round(progresso.porcentagem)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso para o próximo nível"
        >
          <div className="h-full bg-folha-500" style={{ width: `${progresso.porcentagem}%` }} />
        </div>
        <p className="mt-2 text-xs text-slate-500">{progresso.texto}</p>
      </section>

      <section className="mt-10" aria-labelledby="titulo-historico">
        <h2 id="titulo-historico" className="text-xl font-bold text-folha-700">
          Histórico de ações
        </h2>
        <div className="mt-4">
          {perfil.registros.length === 0 ? (
            <ListaVazia mensagem="Este usuário ainda não registrou nenhuma ação sustentável." />
          ) : (
            <ul className="space-y-3">
              {perfil.registros.map((registro) => (
                <li
                  key={registro.id}
                  className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-800">{registro.nomeAcao}</p>
                    <p className="mt-1 text-sm text-slate-600">{registro.descricao}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {registro.categoria} ·{" "}
                      {new Date(registro.dataRegistro).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${CORES_IMPACTO[registro.impacto]}`}>
                      {registro.impacto}
                    </span>
                    <span className="font-bold tabular-nums text-folha-700">+{registro.pontuacao}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <p className="mt-10 text-sm text-slate-600">
        <Link to="/usuarios" className="font-semibold text-folha-700 underline">
          Ver o ranking completo
        </Link>
      </p>
    </article>
  );
}
