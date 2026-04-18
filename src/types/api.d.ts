interface RequestOptions {
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export { RequestOptions, ApiResponse };