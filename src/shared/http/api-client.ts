import axios from 'axios';
import { API_CONFIG } from '../config/env';
import type { ApiClientConfig } from './types';

export const createApiClient = (config?: ApiClientConfig) => {
  return axios.create({
    baseURL: config?.baseURL ?? API_CONFIG.BASE_URL,
    timeout: config?.timeout ?? API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const apiClient = createApiClient();
