export type ApiError = {
  status: number | null;
  code: string;
  message: string;
  details?: unknown;
  isNetworkError?: boolean;
  isTimeout?: boolean;
};

export function isApiError(e: unknown): e is ApiError {
  return !!e && typeof e === "object" && "code" in e && "message" in e;
}
