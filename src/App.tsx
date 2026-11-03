import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { UsuarioAtivoProvider } from "./contexts/UsuarioAtivoProvider";

// Estrutura compartilhada: Header e Footer ficam fixos e o Outlet
// recebe a página da rota atual. O Provider deixa o usuário ativo
// disponível para todas as páginas.
export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <UsuarioAtivoProvider>
      <div className="flex min-h-screen flex-col bg-white text-slate-900">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </UsuarioAtivoProvider>
  );
}
