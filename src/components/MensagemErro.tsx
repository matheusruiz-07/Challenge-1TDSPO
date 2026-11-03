type MensagemErroProps = {
  mensagem: string;
  aoTentarNovamente?: () => void;
};

// Estado de erro: explica a falha e, quando possível, oferece nova tentativa
export default function MensagemErro({ mensagem, aoTentarNovamente }: MensagemErroProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
    >
      <p>{mensagem}</p>
      {aoTentarNovamente && (
        <button
          type="button"
          onClick={aoTentarNovamente}
          className="cursor-pointer self-start rounded-lg border border-red-300 px-4 py-2 font-semibold hover:bg-red-100 sm:self-auto"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
