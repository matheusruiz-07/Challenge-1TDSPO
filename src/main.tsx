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
import Missoes from "./pages/Missoes.tsx";
import Integrantes from "./pages/Integrantes.tsx";
import NovoUsuario from "./pages/NovoUsuario.tsx";
import PerfilUsuario from "./pages/PerfilUsuario.tsx";
import RegistrarAcao from "./pages/RegistrarAcao.tsx";
import Sobre from "./pages/Sobre.tsx";
import Usuarios from "./pages/Usuarios.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Erro />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/missoes", element: <Missoes /> },
      { path: "/usuarios", element: <Usuarios /> },
      { path: "/usuarios/novo", element: <NovoUsuario /> },
      { path: "/usuarios/:id", element: <PerfilUsuario /> },
      { path: "/usuarios/:id/editar", element: <EditarUsuario /> },
      { path: "/registrar", element: <RegistrarAcao /> },
      { path: "/integrantes", element: <Integrantes /> },
      { path: "/integrantes/:rm", element: <IntegranteDetalhe /> },
      { path: "/faq", element: <Faq /> },
      { path: "/contato", element: <Contato /> },
      // Endereços antigos levam para a página que os substituiu
      { path: "/solucao", element: <Navigate to="/missoes" replace /> },
      { path: "/meu-avatar", element: <Navigate to="/missoes" replace /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
