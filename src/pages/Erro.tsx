import { Link } from "react-router";

// Exibida pelo errorElement quando o endereço não corresponde a nenhuma rota
export default function Erro() {
  return (
    <main className="grid min-h-screen place-items-center bg-folha-50 px-4 text-center">
      <section>
        <p className="font-bold text-folha-500">Erro 404</p>
        <h1 className="mt-4 text-3xl font-bold text-folha-700 md:text-4xl">
          Página não encontrada
        </h1>
        <p className="mt-3 text-slate-600">
          O endereço digitado não existe no SoulUp.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-folha-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-folha-700"
        >
          Voltar para a Home
        </Link>
      </section>
    </main>
  );
}
