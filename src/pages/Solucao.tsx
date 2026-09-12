import { useState } from "react";
import Botao from "../components/Botao";
import Card from "../components/Card";
import { missoes } from "../data/missoes";

const XP_POR_NIVEL = 500;

export default function Solucao() {
  const [pontos, setPontos] = useState(1250);
  const [concluidas, setConcluidas] = useState<number[]>([]);

  const nivel = Math.floor(pontos / XP_POR_NIVEL) + 1;
  const faltam = XP_POR_NIVEL - (pontos % XP_POR_NIVEL);
  const progresso = ((pontos % XP_POR_NIVEL) / XP_POR_NIVEL) * 100;

  function concluir(id: number, valor: number) {
    if (concluidas.includes(id)) return;
    setConcluidas([...concluidas, id]);
    setPontos(pontos + valor);
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-folha-700 md:text-3xl">
        Evolução do seu avatar
      </h1>
      <p className="mt-3 leading-relaxed text-slate-600">
        Cada missão concluída rende pontos. A experiência acumulada define o
        nível e nunca diminui.
      </p>

      <section className="mt-6 rounded-xl border border-folha-200 bg-white p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Pontos acumulados
            </p>
            <p className="text-3xl font-bold tabular-nums text-folha-700">
              {pontos.toLocaleString("pt-BR")}
            </p>
          </div>
          <p className="text-right text-sm font-semibold text-folha-500">
            Nível {nivel}
          </p>
        </div>

        <div
          className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuenow={Math.round(progresso)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progresso para o nível ${nivel + 1}`}
        >
          <div
            className="h-full bg-folha-500 transition-all"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Faltam {faltam} XP para o nível {nivel + 1}
        </p>
      </section>

      <h2 className="mt-10 text-xl font-bold text-folha-700">Missões de hoje</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {missoes.map((missao) => {
          const feita = concluidas.includes(missao.id);
          return (
            <Card
              key={missao.id}
              titulo={missao.titulo}
              destaque={feita ? "Concluída" : `+${missao.pontos} pts`}
            >
              <p className="leading-relaxed">{missao.descricao}</p>
              <div className="mt-4">
                {feita ? (
                  <p className="text-sm font-semibold text-folha-500">
                    Missão registrada no seu perfil.
                  </p>
                ) : (
                  <Botao onClick={() => concluir(missao.id, missao.pontos)}>
                    Marcar como feita
                  </Botao>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
