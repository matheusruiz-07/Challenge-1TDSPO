import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.tsx";
import Contato from "./pages/Contato.tsx";
import EditarUsuario from "./pages/EditarUsuario.tsx";
import Erro from "./pages/Erro.tsx";
import Faq from "./pages/Faq.tsx";
import Home from "./pages/Home.tsx";
import IntegranteDetalhe from "./pages/IntegranteDetalhe.tsx";
import Integrantes from "./pages/Integrantes.tsx";
import NovoUsuario from "./pages/NovoUsuario.tsx";
import PerfilUsuario from "./pages/PerfilUsuario.tsx";
import RegistrarAcao from "./pages/RegistrarAcao.tsx";
import Sobre from "./pages/Sobre.tsx";
import Solucao from "./pages/Solucao.tsx";
import Usuarios from "./pages/Usuarios.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Erro />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/solucao", element: <Solucao /> },
      { path: "/usuarios", element: <Usuarios /> },
      { path: "/usuarios/novo", element: <NovoUsuario /> },
      { path: "/usuarios/:id", element: <PerfilUsuario /> },
      { path: "/usuarios/:id/editar", element: <EditarUsuario /> },
      { path: "/registrar", element: <RegistrarAcao /> },
      { path: "/integrantes", element: <Integrantes /> },
      { path: "/integrantes/:rm", element: <IntegranteDetalhe /> },
      { path: "/faq", element: <Faq /> },
      { path: "/contato", element: <Contato /> },
      // Endereço da versão em HTML (Sprint 2): leva para a página que a substituiu
      { path: "/meu-avatar", element: <Navigate to="/solucao" replace /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
