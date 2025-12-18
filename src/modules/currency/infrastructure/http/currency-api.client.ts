import { apiClient } from '../../../../shared/http/api-client';
import type { CurrencyCode } from '../../domain/types';
import type {
  CreateCurrencyDTO,
  CurrencyResponseDTO,
  UpdateExchangeRateDTO,
} from './dtos/currency-response.dto';

const BASE_PATH = '/currencies';

/**
 * Real API client implementation
 */
const realCurrencyApiClient = {
  create: async (payload: CreateCurrencyDTO): Promise<CurrencyResponseDTO> => {
    const response = await apiClient.post<CurrencyResponseDTO>(BASE_PATH, payload);
    return response.data;
  },

  getAll: async (): Promise<Array<CurrencyResponseDTO>> => {
    const response = await apiClient.get<Array<CurrencyResponseDTO>>(BASE_PATH);
    return response.data;
  },

  getByCode: async (code: CurrencyCode): Promise<CurrencyResponseDTO> => {
    const response = await apiClient.get<CurrencyResponseDTO>(`${BASE_PATH}/${code}`);
    return response.data;
  },

  getBase: async (): Promise<CurrencyResponseDTO> => {
    const response = await apiClient.get<CurrencyResponseDTO>(`${BASE_PATH}/base`);
    return response.data;
  },

  updateExchangeRate: async (
    code: CurrencyCode,
    payload: UpdateExchangeRateDTO
  ): Promise<CurrencyResponseDTO> => {
    const response = await apiClient.put<CurrencyResponseDTO>(
      `${BASE_PATH}/${code}/exchange-rate`,
      payload
    );
    return response.data;
  },

  delete: async (code: CurrencyCode): Promise<void> => {
    await apiClient.delete(`${BASE_PATH}/${code}`);
  },
};

/**
 * Currency API Client
 * Uses real API (no mocks needed for now)
 */
export const currencyApiClient = realCurrencyApiClient;
