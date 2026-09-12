import type { ReactNode } from "react";

type BotaoProps = {
  children: ReactNode;
  onClick?: () => void;
  tipo?: "principal" | "secundario";
  submit?: boolean;
};

export default function Botao({
  children,
  onClick,
  tipo = "principal",
  submit = false,
}: BotaoProps) {
  const estilo =
    tipo === "principal"
      ? "bg-folha-500 text-white hover:bg-folha-700"
      : "border-2 border-folha-500 text-folha-700 hover:bg-folha-50";

  return (
    <button
      type={submit ? "submit" : "button"}
      className={`rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${estilo}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
