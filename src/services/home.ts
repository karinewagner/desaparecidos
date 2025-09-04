import api from "./api";

import type { IMissingPersonList, IMissingPersonListResponse } from "../types/home";

export async function getMissingPersonList(
  params: IMissingPersonList
): Promise<IMissingPersonListResponse> {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== null && value !== undefined)
  );

  const response = await api.get<IMissingPersonListResponse>(
    "/v1/pessoas/aberto/filtro",
    { params: filteredParams }
  );

  return response.data;
}
