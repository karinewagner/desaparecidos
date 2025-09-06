import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMissingPersonDetailsById } from "../services";
import type { IMissingPersonByIdResponse } from "../types/details";
import Alert from "../components/common/Alert";
import InfoDialog from "../components/details/InfoDialog";

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [person, setPerson] = useState<IMissingPersonByIdResponse | null>(null);
  const [daysMissing, setDaysMissing] = useState(0);
  const [alert, setAlert] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDetails(id);
    }
  }, [id]);

  const fetchDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await getMissingPersonDetailsById(id);
      setPerson(data);

      const disappearanceDate = new Date(data.ultimaOcorrencia.dtDesaparecimento);
      const diffTime = new Date().getTime() - disappearanceDate.getTime();
      setDaysMissing(Math.floor(diffTime / (1000 * 3600 * 24)));
    } catch (err: any) {
      setAlert("Erro ao buscar dados: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const shareOnWhatsApp = () => {
    if (!person) return;
    const mensagem = encodeURIComponent(
      `🚨 DESAPARECIDO 🚨\n\nNome: ${person.nome}\nÚltima localização: ${person.ultimaOcorrencia.localDesaparecimentoConcat}\nDesaparecido desde: ${new Date(person.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString()}\nVestimentas: ${person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}\nAjude a encontrar! Compartilhe!`
    );
    window.open(`https://wa.me/?text=${mensagem}`, "_blank");
  };

  return (
    <div className="-mt-20 lg:-mt-30 relative z-10 flex flex-col max-w-3xl md:max-w-4xl mx-auto my-4">
      {isLoading ? (
        <div className="flex flex-col gap-2 justify-center items-center w-full bg-white p-4 rounded-md shadow-md">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span>Carregando, aguarde...</span>
        </div>
      ) : person ? (
        <div className="bg-white shadow rounded p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center">
            <div className="grid grid-rows-2 gap-2">
              <div className="flex items-start">
                <Link
                    to="/"
                    className="flex items-center gap-1 text-xl px-4 py-2 rounded-xl shadow border border-gray-100 hover:bg-gray-200"
                  >
                    ⬅ Voltar
                </Link>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{person.nome}</h1>
                <p className="text-gray-600">
                  {person.idade} anos - {person.sexo}
                </p>

                {person.ultimaOcorrencia.encontradoVivo ? (
                  <div className="bg-green-700 text-white font-bold text-center p-2 rounded-lg mt-2">
                    Pessoa localizada!!
                  </div>
                ) : (
                  <div className="bg-orange-400 text-black font-bold text-center p-2 rounded-lg mt-2">
                    {daysMissing} dias do desaparecimento
                  </div>
                )}
              </div>
            </div>
            <img
              src={person.urlFoto || "/assets/img/unidentified-person.png"}
              alt="Foto da pessoa"
              className="object-cover rounded-2xl h-40 w-40 sm:h-60 sm:w-60 mt-4 sm:mt-0"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-6 gap-6">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">Dados sobre o desaparecimento:</h2>
              <p><strong>Local:</strong> {person.ultimaOcorrencia.localDesaparecimentoConcat}</p>
              <p>
                <strong>Data do desaparecimento:</strong>{" "}
                {new Date(person.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString("pt-BR")}
              </p>
              <p><strong>Vestimentas:</strong>{" "}
                {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido || "não há registro"}
              </p>
              <p><strong>Outras informações:</strong>{" "}
                {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao || "não há registro"}
              </p>
            </div>

            <div className="flex flex-col gap-4 md:w-1/3">
              <button
                onClick={() => setShowDialog(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                👀 Viu ou tem informações dessa pessoa?
              </button>
              <p className="text-lg">Ajude compartilhando:</p>
              <button
                onClick={shareOnWhatsApp}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                📲 Compartilhar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {alert && <Alert message={alert} type="error" onClose={() => setAlert(null)} />}

      {showDialog && person && (
        <InfoDialog person={person} onClose={() => setShowDialog(false)} />
      )}
    </div>
  );
}
