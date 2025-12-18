import { apiClient } from '../../../../shared/http/api-client';
import type { CountryCode } from '../../domain/types';
import type { CountryResponseDTO, CreateCountryDTO } from './dtos/country-response.dto';

const BASE_PATH = '/countries';

/**
 * Real API client implementation
 */
const realCountryApiClient = {
  create: async (payload: CreateCountryDTO): Promise<CountryResponseDTO> => {
    const response = await apiClient.post<CountryResponseDTO>(BASE_PATH, payload);
    return response.data;
  },

  getAll: async (): Promise<Array<CountryResponseDTO>> => {
    const response = await apiClient.get<Array<CountryResponseDTO>>(BASE_PATH);
    return response.data;
  },

  getByCode: async (code: CountryCode): Promise<CountryResponseDTO> => {
    const response = await apiClient.get<CountryResponseDTO>(`${BASE_PATH}/${code}`);
    return response.data;
  },

  delete: async (code: CountryCode): Promise<void> => {
    await apiClient.delete(`${BASE_PATH}/${code}`);
  },
};

/**
 * Country API Client
 * Uses real API (no mocks needed for now)
 */
export const countryApiClient = realCountryApiClient;
