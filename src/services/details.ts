import api from "./api";
import type { IMissingPersonByIdResponse, IMoreInformation } from "../types/details";

export async function getMissingPersonDetailsById(
  id: string,
  options?: { signal?: AbortSignal }
) {
  const { data } = await api.get<IMissingPersonByIdResponse>(`/v1/pessoas/${id}`, {
    signal: options?.signal,
  });
  
  return data;
}

export async function postMoreInformation(body: IMoreInformation, anexos: File[]) {
  const formData = new FormData();
  anexos.forEach((f) => formData.append("files", f, f.name));
  
  const { data } = await api.post<IMoreInformation>(
    "/v1/ocorrencias/informacoes-desaparecido",
    formData,
    {
      params: body,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}
