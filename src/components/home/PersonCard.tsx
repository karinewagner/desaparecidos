import { Link } from "react-router-dom";

import type { IContent } from "../../types/home";

interface Props {
  missingPerson: IContent;
}

export default function PersonCard({ missingPerson }: Props) {
  return (
    <div className="bg-white shadow-md rounded-md flex flex-col h-full">
      <img
        src={
          missingPerson.urlFoto ||
          "/assets/img/unidentified-person.png"
        }
        alt={`Foto da pessoa desaparecida: ${missingPerson.nome}`}
        className="w-full h-60 object-cover rounded-t-md"
      />

      <div className="flex-1 flex flex-col gap-2 mt-4 px-4">
        <p className="font-semibold">
          Nome: <span className="font-normal">{missingPerson.nome}</span>
        </p>
        <p className="font-semibold">
          Idade: <span className="font-normal">{missingPerson.idade} anos</span>
        </p>
        <p className="font-semibold">
          Sexo: <span className="font-normal">{missingPerson.sexo}</span>
        </p>
        <p className="font-semibold">
          Data:{" "}
          <span className="font-normal">
            {new Date(missingPerson.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString(
              "pt-BR"
            )}
          </span>
        </p>
        <p className="font-semibold">
          Local:{" "}
          <span className="font-normal">
            {missingPerson.ultimaOcorrencia.localDesaparecimentoConcat}
          </span>
        </p>
      </div>

      <div className="mt-auto p-4">
        <Link
          to={`/details/${missingPerson.id}`}
          className="w-full inline-block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Mais detalhes
        </Link>
      </div>
    </div>
  );
}
