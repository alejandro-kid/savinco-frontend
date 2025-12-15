export interface ApiErrorResponse {
  status: number;
  message: string;
  errors?: Record<string, string>;
  timestamp: string;
}

export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
}
