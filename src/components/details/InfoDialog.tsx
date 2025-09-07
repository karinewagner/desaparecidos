import { useState } from "react";
import type { IMissingPersonByIdResponse, IMoreInformation } from "../../types/details";
import { postMoreInformation } from "../../services";
import Alert from "../common/Alert";
import { isApiError } from "../../types/apiError";

interface Props {
  person: IMissingPersonByIdResponse;
  onClose: () => void;
}

export default function InfoDialog({ person, onClose }: Props) {
  const [informacao, setInformacao] = useState("");
  const [data, setData] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [alert, setAlert] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!informacao || !data) {
      setAlert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const payload: IMoreInformation = {
      ocoId: person.ultimaOcorrencia.ocoId,
      informacao,
      data,
      descricao: `Foto de ${person.nome}`,
    };

    try {
      setLoading(true);
      await postMoreInformation(payload, files);
      setAlert("Dados enviados com sucesso!");
      setTimeout(onClose, 2000);

    } catch (err: any) {
      const msg = isApiError(err) ? err.message : "Erro ao enviar dados. Tente novamente.";
      setAlert(msg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer">✖</button>
        
        <h2 className="text-xl font-bold mb-4">Formulário de informações</h2>
        <p className="mb-2">Desaparecido: {person.nome}</p>

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
        />

        <textarea
          value={informacao}
          onChange={(e) => setInformacao(e.target.value)}
          placeholder="Digite sua mensagem"
          maxLength={255}
          className="w-full border rounded px-3 py-2 mb-2"
        />

        {files.length > 0 ? (
          <div className="flex flex-col gap-1 my-2">
            {files.map((file, index) => (
              <div key={index} className="flex justify-between items-center border p-2 rounded">
                <span className="truncate text-sm">{file.name}</span>
                <button onClick={() => removeFile(index)} className="text-red-500 cursor-pointer">🗑</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-200 text-gray-700 p-2 rounded text-sm text-center">
            Nenhum arquivo anexado.
          </div>
        )}

        <input type="file" multiple accept=".pdf,.jpg,.png" onChange={handleFileChange} className="mt-2 cursor-pointer" />

        <div className="flex justify-end gap-2 mt-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 border border-red-500 text-red-500 font-semibold rounded hover:text-white hover:bg-red-500 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 border border-blue-500 text-blue-500 font-semibold rounded hover:text-white hover:bg-blue-500 cursor-pointer"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>

      {alert && <Alert message={alert} type="info" onClose={() => setAlert(null)} />}
    </div>
  );
}
