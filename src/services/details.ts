import api from "./api";
import type { IMissingPersonByIdResponse, IMoreInformation } from "../types/details";

export async function getMissingPersonDetailsById(id: string): Promise<IMissingPersonByIdResponse> {
  const response = await api.get<IMissingPersonByIdResponse>(`/v1/pessoas/${id}`);
  return response.data;
}

export async function postMoreInformation(body: IMoreInformation, anexos: File[]): Promise<IMoreInformation> {
  const formData = new FormData();

  anexos.forEach((file) => {
    formData.append("files", file, file.name);
  });

  const response = await api.post<IMoreInformation>(
    "/v1/ocorrencias/informacoes-desaparecido",
    formData,
    { params: body }
  );

  return response.data;
}
