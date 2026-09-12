import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Contato from "./pages/Contato";
import Home from "./pages/Home";
import Integrantes from "./pages/Integrantes";
import Sobre from "./pages/Sobre";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="integrantes" element={<Integrantes />} />
          <Route path="contato" element={<Contato />} />
          <Route
            path="*"
            element={
              <p className="text-slate-600">
                Esta página entra nos próximos commits da migração.
              </p>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
