import api from "./api";

import type { IStatisticsData } from "../types/header";

export async function getStatisticsData(
  options?: { signal?: AbortSignal }
): Promise<IStatisticsData> {
  const { data } = await api.get<IStatisticsData>(
    "/v1/pessoas/aberto/estatistico",
    { signal: options?.signal }
  );
  return data;
}
