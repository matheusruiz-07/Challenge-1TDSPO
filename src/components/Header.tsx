import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { nome: "Home", caminho: "/" },
  { nome: "Sobre", caminho: "/sobre" },
  { nome: "Solucao", caminho: "/solucao" },
  { nome: "Integrantes", caminho: "/integrantes" },
  { nome: "FAQ", caminho: "/faq" },
  { nome: "Contato", caminho: "/contato" },
];

function classeDoLink({ isActive }: { isActive: boolean }) {
  return `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-folha-500 text-white"
      : "text-folha-50 hover:bg-folha-500 hover:text-white"
  }`;
}

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="bg-folha-700 text-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="text-2xl font-bold" onClick={() => setMenuAberto(false)}>
          Soul<span className="text-folha-200">Up</span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegacao principal">
          {links.map((link) => (
            <NavLink
              key={link.caminho}
              to={link.caminho}
              end={link.caminho === "/"}
              className={classeDoLink}
            >
              {link.nome}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-md border border-folha-200 px-3 py-2 text-sm font-semibold text-white md:hidden"
          aria-controls="menu-celular"
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          {menuAberto ? "Fechar" : "Menu"}
        </button>
      </div>

      <nav
        id="menu-celular"
        className={`${menuAberto ? "block" : "hidden"} border-t border-folha-500 px-4 pb-4 md:hidden`}
        aria-label="Navegacao no celular"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 pt-3">
          {links.map((link) => (
            <NavLink
              key={link.caminho}
              to={link.caminho}
              end={link.caminho === "/"}
              className={classeDoLink}
              onClick={() => setMenuAberto(false)}
            >
              {link.nome}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
