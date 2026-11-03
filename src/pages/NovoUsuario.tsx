import { useNavigate } from "react-router";
import FormularioUsuario from "../components/FormularioUsuario";
import { cadastrarUsuario } from "../services/usuarios";
import type { UsuarioFormulario } from "../types/usuario";

// Cadastro de usuário (POST /usuarios)
export default function NovoUsuario() {
  const navigate = useNavigate();

  async function cadastrar(dados: UsuarioFormulario) {
    const novo = await cadastrarUsuario(dados);
    navigate(`/usuarios/${novo.id}`, {
      state: { mensagem: `Usuário cadastrado! ${novo.nome} começa no nível 1 com o avatar Soul.` },
    });
  }

  return (
    <section>
      <p className="mb-6 max-w-xl text-slate-600">
        Todo usuário novo começa no nível 1, sem pontos, e recebe o avatar Soul para
        acompanhar a jornada.
      </p>
      <FormularioUsuario titulo="Cadastrar usuário" textoBotao="Cadastrar" aoSalvar={cadastrar} />
    </section>
  );
}
