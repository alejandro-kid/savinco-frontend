import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from './types';

export const parseApiError = (error: unknown): ApiErrorResponse | null => {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  if (axiosError.response?.data) {
    return axiosError.response.data;
  }

  if (axiosError.response) {
    return {
      status: axiosError.response.status,
      message: axiosError.message,
      timestamp: new Date().toISOString(),
    };
  }

  return null;
};
