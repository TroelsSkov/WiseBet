interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}