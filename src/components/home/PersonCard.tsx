import { Link } from "react-router-dom";

import type { IContent } from "../../types/home";

interface Props {
  missingPerson: IContent;
}

export default function PersonCard({ missingPerson }: Props) {
  return (
    <Link 
      to={`/details/${missingPerson.id}`} 
      className="bg-white shadow-md rounded-md flex flex-col h-full"
    >
      <img
        src={
          missingPerson.urlFoto ||
          "/assets/img/unidentified-person.png"
        }
        alt={`Foto da pessoa desaparecida: ${missingPerson.nome}`}
        className="w-full h-60 object-cover rounded-t-md"
      />

      <div className="px-1 py-2 flex-col">
        <p className="font-bold text-center text-sm lg:txt-base">{missingPerson.nome}</p>
        <div className="text-center text-xs lg:text-sm">
          <p>{missingPerson.sexo} - {missingPerson.idade} anos</p>
        </div>
        <hr className="my-2 border-t border-gray-300"></hr>
        <p className="font-semibold text-center text-xs lg:text-sm">
          Data:{" "}
          <span className="font-normal text-xs lg:text-sm">
            {missingPerson.ultimaOcorrencia.dtDesaparecimento}
          </span>
        </p>
          <p className="font-semibold text-center text-xs lg:text-sm">
          Local:{" "}
          <span className="font-normal">
            {missingPerson.ultimaOcorrencia.localDesaparecimentoConcat}
          </span>
        </p>
      </div>
    </Link>
  );
}
