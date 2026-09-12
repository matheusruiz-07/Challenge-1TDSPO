import { useState } from "react";
import { useForm } from "react-hook-form";

type FormContato = {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
};

export default function Contato() {
  const [enviado, setEnviado] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormContato>();

  function aoEnviar(dados: FormContato) {
    console.log("Mensagem recebida de", dados.nome, dados.email);
    setEnviado(true);
    reset();
  }

  const campo = "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-folha-200";
  const rotulo = "mb-1 block text-sm font-semibold text-slate-700";
  const aviso = "mt-1 text-xs text-red-600";

  return (
    <>
      <h1 className="text-2xl font-bold text-folha-700 md:text-3xl">Fale conosco</h1>
      <p className="mt-3 text-sm text-slate-600">Respondemos em ate dois dias uteis.</p>

      {enviado && (
        <p className="mt-5 rounded-lg border-2 border-folha-500 bg-folha-50 px-4 py-3 text-sm text-folha-700">
          Mensagem enviada. Obrigado pelo contato!
        </p>
      )}

      <form onSubmit={handleSubmit(aoEnviar)} className="mt-6 max-w-xl space-y-4" noValidate>
        <div>
          <label htmlFor="nome" className={rotulo}>Nome completo</label>
          <input
            id="nome"
            className={`${campo} ${errors.nome ? "border-red-500" : "border-slate-300"}`}
            {...register("nome", {
              required: "Escreva seu nome para sabermos com quem falamos.",
              minLength: { value: 3, message: "O nome precisa ter ao menos 3 letras." },
            })}
          />
          {errors.nome && <p className={aviso}>{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className={rotulo}>E-mail</label>
          <input
            id="email"
            className={`${campo} ${errors.email ? "border-red-500" : "border-slate-300"}`}
            {...register("email", {
              required: "Precisamos do seu e-mail para responder.",
              pattern: { value: /\S+@\S+\.\S+/, message: "Faltou o @ ou o dominio no e-mail." },
            })}
          />
          {errors.email && <p className={aviso}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="assunto" className={rotulo}>Assunto</label>
          <select
            id="assunto"
            className={`${campo} ${errors.assunto ? "border-red-500" : "border-slate-300"}`}
            defaultValue=""
            {...register("assunto", { required: "Escolha um assunto." })}
          >
            <option value="" disabled>Selecione</option>
            <option value="suporte">Suporte tecnico do avatar</option>
            <option value="pontos">Problemas com pontuacao</option>
            <option value="parceria">Proposta de parceria</option>
          </select>
          {errors.assunto && <p className={aviso}>{errors.assunto.message}</p>}
        </div>

        <div>
          <label htmlFor="mensagem" className={rotulo}>Mensagem</label>
          <textarea
            id="mensagem"
            rows={5}
            className={`${campo} ${errors.mensagem ? "border-red-500" : "border-slate-300"}`}
            {...register("mensagem", {
              required: "Conte o que aconteceu para podermos ajudar.",
              minLength: { value: 10, message: "Escreva ao menos 10 caracteres." },
            })}
          />
          {errors.mensagem && <p className={aviso}>{errors.mensagem.message}</p>}
        </div>

        <button
          type="submit"
          className="rounded-lg bg-folha-500 px-6 py-3 text-sm font-semibold text-white hover:bg-folha-700"
        >
          Enviar mensagem
        </button>
      </form>
    </>
  );
}
