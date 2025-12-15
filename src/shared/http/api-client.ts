import axios from 'axios';
import type { ApiClientConfig } from './types';

const DEFAULT_BASE_URL = 'http://localhost:8080/api/v1';

export const createApiClient = (config?: ApiClientConfig) => {
  return axios.create({
    baseURL: config?.baseURL ?? DEFAULT_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const apiClient = createApiClient();


