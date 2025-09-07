import api from "./api";

import type { IMissingPersonList, IMissingPersonListResponse } from "../types/home";

export async function getMissingPersonList(
  params: IMissingPersonList,
  options?: { signal?: AbortSignal }
) {
  const { data } = await api.get<IMissingPersonListResponse>("/v1/pessoas/aberto/filtro", {
    params,
    signal: options?.signal,
  });
  return data;
}
