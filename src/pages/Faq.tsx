import { useState } from "react";
import { perguntas } from "../data/faq";

export default function Faq() {
  const [perguntaAberta, setPerguntaAberta] = useState<number | null>(null);

  function alternarPergunta(id: number) {
    setPerguntaAberta((idAtual) => (idAtual === id ? null : id));
  }

  return (
    <section>
      <h1 className="text-2xl font-bold text-folha-700 md:text-3xl">
        Dúvidas frequentes
      </h1>
      <p className="mt-3 text-slate-600">
        Encontre respostas sobre o avatar, a pontuação e o funcionamento da
        SoulUp.
      </p>

      <div className="mt-8 space-y-3">
        {perguntas.map((item) => {
          const aberta = perguntaAberta === item.id;
          const respostaId = `resposta-${item.id}`;

          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-folha-200 bg-white"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-folha-700 hover:bg-folha-50"
                aria-expanded={aberta}
                aria-controls={respostaId}
                onClick={() => alternarPergunta(item.id)}
              >
                <span>{item.pergunta}</span>
                <span className="text-xl" aria-hidden="true">
                  {aberta ? "−" : "+"}
                </span>
              </button>

              {aberta && (
                <div id={respostaId} className="border-t border-folha-200 px-5 py-4">
                  <p className="leading-relaxed text-slate-600">{item.resposta}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
