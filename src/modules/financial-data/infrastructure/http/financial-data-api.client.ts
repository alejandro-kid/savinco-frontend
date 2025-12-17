import { apiClient } from '../../../../shared/http/api-client';
import type { CountryCode } from '../../domain/types';
import type { CreateFinancialDataDTO } from './dtos/create-financial-data.dto';
import type {
  FinancialDataResponseDTO,
  FinancialDataSummaryResponseDTO,
} from './dtos/financial-data-response.dto';
import type { UpdateFinancialDataDTO } from './dtos/update-financial-data.dto';

const BASE_PATH = '/financial-data';

/**
 * Financial Data API Client
 * Always uses real API (mocks disabled)
 */
export const financialDataApiClient = {
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
