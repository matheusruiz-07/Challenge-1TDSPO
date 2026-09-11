import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contato from "./pages/Contato";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <p className="p-8 text-slate-600">
              SoulUp em migracao para React. As paginas entram nos proximos commits.
            </p>
          }
        />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </BrowserRouter>
  );
}
