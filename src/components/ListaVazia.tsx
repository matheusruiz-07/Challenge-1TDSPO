import type { ReactNode } from "react";

type ListaVaziaProps = {
  mensagem: string;
  children?: ReactNode;
};

// Estado vazio: a requisição funcionou, mas não trouxe itens
export default function ListaVazia({ mensagem, children }: ListaVaziaProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 px-5 py-8 text-center text-sm text-slate-600">
      <p>{mensagem}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
