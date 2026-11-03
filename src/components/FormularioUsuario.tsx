import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Usuario, UsuarioFormulario } from "../types/usuario";

type FormularioUsuarioProps = {
  titulo: string;
  textoBotao: string;
  usuario?: Usuario;
  aoSalvar: (dados: UsuarioFormulario) => Promise<void>;
};

const valoresVazios: UsuarioFormulario = { nome: "", email: "" };

// Formulário reutilizado no cadastro e na edição de usuários
export default function FormularioUsuario({
  titulo,
  textoBotao,
  usuario,
  aoSalvar,
}: FormularioUsuarioProps) {
  const [erroApi, setErroApi] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UsuarioFormulario>({ defaultValues: valoresVazios, mode: "onBlur" });

  // Na edição, preenche os campos quando o usuário chega da API
  useEffect(() => {
    if (usuario) {
      reset({ nome: usuario.nome, email: usuario.email });
    }
  }, [usuario, reset]);

  async function enviar(dados: UsuarioFormulario) {
    setErroApi(null);
    try {
      await aoSalvar({ nome: dados.nome.trim(), email: dados.email.trim() });
    } catch (falha) {
      setErroApi(falha instanceof Error ? falha.message : "Não foi possível salvar.");
    }
  }

  const campo = "w-full rounded-lg border px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-folha-200";
  const rotulo = "mb-1 block text-sm font-semibold text-slate-700";
  const aviso = "mt-1 text-xs text-red-600";

  return (
    <form
      onSubmit={handleSubmit(enviar)}
      noValidate
      className="max-w-xl space-y-4 rounded-xl border border-folha-200 bg-white p-6 shadow-xs"
    >
      <h1 className="text-2xl font-bold text-folha-700 md:text-3xl">{titulo}</h1>

      {erroApi && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erroApi}
        </p>
      )}

      <div>
        <label htmlFor="nome" className={rotulo}>Nome completo</label>
        <input
          id="nome"
          className={`${campo} ${errors.nome ? "border-red-500" : "border-slate-300"}`}
          aria-invalid={Boolean(errors.nome)}
          aria-describedby={errors.nome ? "erro-nome" : undefined}
          {...register("nome", {
            required: "Informe o nome do usuário.",
            minLength: { value: 3, message: "O nome precisa ter ao menos 3 letras." },
            maxLength: { value: 100, message: "Use no máximo 100 caracteres." },
          })}
        />
        {errors.nome && <p id="erro-nome" role="alert" className={aviso}>{errors.nome.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className={rotulo}>E-mail</label>
        <input
          id="email"
          type="email"
          className={`${campo} ${errors.email ? "border-red-500" : "border-slate-300"}`}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "erro-email" : undefined}
          {...register("email", {
            required: "Informe o e-mail.",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Faltou o @ ou o domínio no e-mail." },
            maxLength: { value: 150, message: "Use no máximo 150 caracteres." },
          })}
        />
        {errors.email && <p id="erro-email" role="alert" className={aviso}>{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer rounded-lg bg-folha-500 px-6 py-3 text-sm font-semibold text-white hover:bg-folha-700 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? "Salvando..." : textoBotao}
      </button>
    </form>
  );
}
