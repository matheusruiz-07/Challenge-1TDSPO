import type { ReactNode } from "react";

type CardProps = {
  titulo: string;
  children: ReactNode;
  destaque?: string;
};

export default function Card({ titulo, children, destaque }: CardProps) {
  return (
    <article className="relative rounded-xl border border-folha-200 bg-white p-5 shadow-sm">
      {destaque && (
        <span className="absolute right-4 top-4 rounded-full bg-folha-50 px-3 py-1 text-xs font-semibold text-folha-700">
          {destaque}
        </span>
      )}
      <h2 className={`text-lg font-bold text-folha-700 ${destaque ? "pr-24" : ""}`}>
        {titulo}
      </h2>
      <div className="mt-3 text-sm text-slate-600">{children}</div>
    </article>
  );
}
