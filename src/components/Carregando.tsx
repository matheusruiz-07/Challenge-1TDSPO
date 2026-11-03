type CarregandoProps = {
  mensagem?: string;
};

// Estado de carregamento enquanto a API não responde
export default function Carregando({ mensagem = "Carregando..." }: CarregandoProps) {
  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-xl border border-folha-200 bg-folha-50 px-5 py-4 text-sm text-folha-700"
    >
      <span
        aria-hidden="true"
        className="h-5 w-5 animate-spin rounded-full border-2 border-folha-200 border-t-folha-500"
      />
      <span>{mensagem}</span>
    </div>
  );
}
