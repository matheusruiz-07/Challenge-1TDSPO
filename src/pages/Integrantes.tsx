import { useNavigate } from "react-router";
import Botao from "../components/Botao";
import Card from "../components/Card";
import { integrantes } from "../data/integrantes";

export default function Integrantes() {
  const navegar = useNavigate();

  return (
    <>
      <h1 className="text-2xl font-bold text-folha-700 md:text-3xl">
        Quem somos
      </h1>
      <p className="mt-3 leading-relaxed text-slate-600">
        Conheça a dupla por trás do desenvolvimento do avatar interativo.
      </p>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {integrantes.map((pessoa) => (
          <Card
            key={pessoa.rm}
            titulo={pessoa.nome}
            destaque={`RM ${pessoa.rm}`}
          >
            <div className="flex items-center gap-4">
              <img
                src={pessoa.foto}
                alt={`Foto de ${pessoa.nome}`}
                className="h-20 w-20 shrink-0 rounded-full border-2 border-folha-200 object-cover sm:h-24 sm:w-24"
              />
              <div>
                <p className="font-semibold text-folha-500">{pessoa.papel}</p>
                <p className="mt-1 text-xs text-slate-500">Turma {pessoa.turma}</p>
              </div>
            </div>
            <p className="mt-4 leading-relaxed">{pessoa.descricao}</p>

            <div className="mt-4 flex gap-4 text-sm font-semibold text-folha-700">
              <a
                href={pessoa.github}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-folha-500"
              >
                GitHub
              </a>
              <a
                href={pessoa.linkedin}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-folha-500"
              >
                LinkedIn
              </a>
            </div>

            <div className="mt-5">
              <Botao
                tipo="secundario"
                onClick={() => navegar(`/integrantes/${pessoa.rm}`)}
              >
                Ver perfil
              </Botao>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
