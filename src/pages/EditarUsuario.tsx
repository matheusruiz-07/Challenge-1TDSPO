import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Botao from "../components/Botao";
import Carregando from "../components/Carregando";
import FormularioUsuario from "../components/FormularioUsuario";
import MensagemErro from "../components/MensagemErro";
import { useUsuarioAtivo } from "../contexts/UsuarioAtivoContext";
import { atualizarUsuario, buscarUsuario } from "../services/usuarios";
import type { Usuario, UsuarioFormulario } from "../types/usuario";

// Edição de nome e e-mail (GET e PUT /usuarios/:id)
export default function EditarUsuario() {
  const { id } = useParams<{ id: string }>();
  const usuarioId = Number(id);
  const navigate = useNavigate();
  const { usuarioAtivo, selecionarUsuario } = useUsuarioAtivo();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
          throw new Error(`"${id}" não é um identificador de usuário.`);
        }
        setUsuario(await buscarUsuario(usuarioId));
      } catch (falha) {
        setErro(falha instanceof Error ? falha.message : "Não foi possível carregar o usuário.");
      } finally {
        setCarregando(false);
      }
    }
    carregarUsuario();
  }, [id, usuarioId]);

  async function salvar(dados: UsuarioFormulario) {
    const atualizado = await atualizarUsuario(usuarioId, dados);
    // mantém o nome do Header em dia quando o perfil editado é o que está em uso
    if (usuarioAtivo?.id === atualizado.id) {
      selecionarUsuario(atualizado);
    }
    navigate(`/usuarios/${atualizado.id}`, { state: { mensagem: "Dados atualizados com sucesso." } });
  }

  if (carregando) return <Carregando mensagem="Carregando usuário..." />;

  if (erro || !usuario) {
    return (
      <section className="space-y-6">
        <MensagemErro mensagem={erro ?? "Usuário não encontrado."} />
        <Botao tipo="secundario" onClick={() => navigate("/usuarios")}>
          Voltar para usuários
        </Botao>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <Botao tipo="secundario" onClick={() => navigate(`/usuarios/${usuario.id}`)}>
        Cancelar
      </Botao>
      <FormularioUsuario
        titulo="Editar usuário"
        textoBotao="Salvar alterações"
        usuario={usuario}
        aoSalvar={salvar}
      />
    </section>
  );
}
