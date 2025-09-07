import axios, { AxiosError } from "axios";
import type { ApiError } from "../types/apiError";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://abitus-api.geia.vip",
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const err: ApiError = normalizeAxiosError(error);
    return Promise.reject(err);
  }
);

export default api;

// ----------------- helpers -----------------

function normalizeAxiosError(error: AxiosError): ApiError {
  if (error.code === "ECONNABORTED") {
    return {
      status: null,
      code: "TIMEOUT",
      message: "Tempo de resposta excedido. Tente novamente.",
      isTimeout: true,
    };
  }

  if (error.request && !error.response) {
    return {
      status: null,
      code: "NETWORK_ERROR",
      message: "Falha de rede. Verifique sua conexão e tente novamente.",
      isNetworkError: true,
    };
  }

console.log("----->>> ", error.response);


  const status = error.response?.status ?? null;

  const backendMsg =
    (error.response?.data as any)?.message ||
    (error.response?.data as any)?.error ||
    null;

  const message =
    backendMsg ||
    (status === 400 && "Requisição inválida.") ||
    (status === 401 && "Sessão expirada ou não autorizada.") ||
    (status === 403 && "Acesso negado.") ||
    (status === 404 && "Registro não encontrado.") ||
    (status && status >= 500 && "Erro no servidor. Tente mais tarde.") ||
    console.error("----->>> ", error);

  return {
    status,
    code: status ? `HTTP_${status}` : "HTTP_ERROR",
    message,
    details: error.response?.data,
  };
}
