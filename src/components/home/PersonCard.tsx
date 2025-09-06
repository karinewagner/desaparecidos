import { Link } from "react-router-dom";
import type { IContent } from "../../types/home";
import { formatDateTimeBR } from "../../utils/formatDate";

interface Props {
  missingPerson: IContent;
}

export default function PersonCard({ missingPerson }: Props) {
  return (
    <Link
      to={`/details/${missingPerson.id}`}
      aria-label={`Ver detalhes de ${missingPerson.nome}`}
      className="
        group relative bg-white rounded-md overflow-hidden
        border border-gray-200 shadow-sm
        transform-gpu transition-all duration-300
        hover:shadow-xl hover:-translate-y-1 hover:scale-[1.03] hover:z-10
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        motion-reduce:transition-none
      "
    >
      <img
        src={missingPerson.urlFoto || "/assets/img/unidentified-person.png"}
        alt={`Foto da pessoa desaparecida: ${missingPerson.nome}`}
        className="
          w-full h-60 object-cover
          transition-transform duration-300
          group-hover:scale-105
          motion-reduce:transition-none
        "
      />

      <div className="px-2 py-3">
        <p className="font-bold text-center text-sm lg:text-base">
          {missingPerson.nome}
        </p>

        <div className="text-center text-xs lg:text-sm text-gray-700">
          <p>
            {missingPerson.sexo} - {missingPerson.idade} anos
          </p>
        </div>

        <hr className="my-2 border-t border-gray-200" />

        <p className="font-semibold text-center text-xs lg:text-sm">
          Data:{" "}
          <span className="font-normal">
            {formatDateTimeBR(missingPerson.ultimaOcorrencia.dtDesaparecimento)}
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
