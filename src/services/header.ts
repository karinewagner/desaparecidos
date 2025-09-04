import api from "./api";

import type { IStatisticsData } from "../types/header";

export async function getStatisticsData(): Promise<IStatisticsData> {
  const response = await api.get<IStatisticsData>("/v1/pessoas/aberto/estatistico");
  return response.data;
}
