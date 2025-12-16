import { APP_CONFIG } from '../../../../shared/config/env';
import { apiClient } from '../../../../shared/http/api-client';
import type { CountryCode } from '../../domain/types';
import type { CreateFinancialDataDTO } from './dtos/create-financial-data.dto';
import type {
  FinancialDataResponseDTO,
  FinancialDataSummaryResponseDTO,
} from './dtos/financial-data-response.dto';
import { mockFinancialDataApiClient } from './mocks/financial-data.mocks';
import type { UpdateFinancialDataDTO } from './dtos/update-financial-data.dto';

const BASE_PATH = '/api/v1/financial-data';

/**
 * Real API client implementation
 */
const realFinancialDataApiClient = {
  create: async (payload: CreateFinancialDataDTO): Promise<FinancialDataResponseDTO> => {
    const response = await apiClient.post<FinancialDataResponseDTO>(BASE_PATH, payload);
    return response.data;
  },

  update: async (
    countryCode: CountryCode,
    payload: UpdateFinancialDataDTO
  ): Promise<FinancialDataResponseDTO> => {
    const response = await apiClient.put<FinancialDataResponseDTO>(
      `${BASE_PATH}/${countryCode}`,
      payload
    );
    return response.data;
  },

  delete: async (countryCode: CountryCode): Promise<void> => {
    await apiClient.delete<void>(`${BASE_PATH}/${countryCode}`);
  },

  getAll: async (): Promise<Array<FinancialDataResponseDTO>> => {
    const response = await apiClient.get<Array<FinancialDataResponseDTO>>(BASE_PATH);
    return response.data;
  },

  getByCountry: async (countryCode: CountryCode): Promise<FinancialDataResponseDTO> => {
    const response = await apiClient.get<FinancialDataResponseDTO>(`${BASE_PATH}/${countryCode}`);
    return response.data;
  },

  getSummary: async (): Promise<FinancialDataSummaryResponseDTO> => {
    const response = await apiClient.get<FinancialDataSummaryResponseDTO>(`${BASE_PATH}/summary`);
    return response.data;
  },
};

/**
 * Financial Data API Client
 * Uses mock data in development mode, real API in production
 */
export const financialDataApiClient = APP_CONFIG.IS_DEV
  ? mockFinancialDataApiClient
  : realFinancialDataApiClient;
