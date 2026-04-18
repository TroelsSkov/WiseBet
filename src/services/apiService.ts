import type { ApiResponse, RequestOptions } from "../types/api";

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}${path}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const message = await res.text();
    return { data: null, error: message, status: res.status };
  }

  const contentType = res.headers.get("Content-Type") ?? "";
  const data: T = contentType.includes("application/json")
    ? await res.json()
    : (await res.text()) as T;

  return { data, error: null, status: res.status };
}

export const apiService = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>("GET", path, undefined, options),

  post: <T>(path: string, body: unknown, options?: RequestOptions) =>
    request<T>("POST", path, body, options),

  put: <T>(path: string, body: unknown, options?: RequestOptions) =>
    request<T>("PUT", path, body, options),

  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, undefined, options),
};