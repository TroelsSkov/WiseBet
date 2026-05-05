interface RequestOptions {
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T | null;
  ok: boolean;
  error: string | null;
  status: number;
}

export { RequestOptions, ApiResponse };