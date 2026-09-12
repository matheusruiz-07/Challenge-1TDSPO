import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Contato from "./pages/Contato";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import IntegranteDetalhe from "./pages/IntegranteDetalhe";
import Integrantes from "./pages/Integrantes";
import Sobre from "./pages/Sobre";
import Solucao from "./pages/Solucao";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="solucao" element={<Solucao />} />
          <Route path="integrantes" element={<Integrantes />} />
          <Route path="integrantes/:rm" element={<IntegranteDetalhe />} />
          <Route path="faq" element={<Faq />} />
          <Route path="contato" element={<Contato />} />
          <Route
            path="*"
            element={
              <p className="text-slate-600">
                Página não encontrada. Use o menu para voltar ao início.
              </p>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
