import { useEffect, useState, type ReactNode } from "react";
import { UsuarioAtivoContext, type UsuarioAtivo } from "./UsuarioAtivoContext";

const CHAVE_LOCAL = "soulup-usuario-ativo";

// localStorage pode falhar (modo privado ou bloqueado): nesse caso começa sem usuário
function lerUsuarioSalvo(): UsuarioAtivo | null {
  try {
    const texto = localStorage.getItem(CHAVE_LOCAL);
    return texto ? (JSON.parse(texto) as UsuarioAtivo) : null;
  } catch {
    return null;
  }
}

type UsuarioAtivoProviderProps = {
  children: ReactNode;
};

// Fornece o usuário ativo para toda a árvore abaixo dele
export function UsuarioAtivoProvider({ children }: UsuarioAtivoProviderProps) {
  const [usuarioAtivo, setUsuarioAtivo] = useState<UsuarioAtivo | null>(lerUsuarioSalvo);

  // Mantém a escolha salva para quando o site for aberto novamente
  useEffect(() => {
    try {
      if (usuarioAtivo) {
        localStorage.setItem(CHAVE_LOCAL, JSON.stringify(usuarioAtivo));
      } else {
        localStorage.removeItem(CHAVE_LOCAL);
      }
    } catch {
      // sem armazenamento disponível: a escolha vale só nesta visita
    }
  }, [usuarioAtivo]);

  function selecionarUsuario(usuario: UsuarioAtivo) {
    setUsuarioAtivo({ id: usuario.id, nome: usuario.nome });
  }

  function sairDoPerfil() {
    setUsuarioAtivo(null);
  }

  return (
    <UsuarioAtivoContext value={{ usuarioAtivo, selecionarUsuario, sairDoPerfil }}>
      {children}
    </UsuarioAtivoContext>
  );
}
