import { store } from '../../../../shared/redux/store';
import type { FinancialDataRepository } from '../../domain/repository.interface';
import type {
  CountryCode,
  FinancialData,
  FinancialDataInput,
  FinancialDataSummary,
} from '../../domain/types';
import { financialDataApiClient } from '../http/financial-data-api.client';
import {
  mapFinancialDataArrayFromResponseDTO,
  mapFinancialDataFromResponseDTO,
  mapFinancialDataSummaryFromResponseDTO,
  mapToCreateFinancialDataDTO,
  mapToUpdateFinancialDataDTO,
} from '../http/mappers/financial-data.mapper';
import { financialDataActions } from '../redux/financial-data.slice';

export const financialDataRepository: FinancialDataRepository = {
  async create(input: FinancialDataInput): Promise<FinancialData> {
    store.dispatch(financialDataActions.mutationStarted());
    try {
      const dto = mapToCreateFinancialDataDTO(input);
      const response = await financialDataApiClient.create(dto);
      const financialData = mapFinancialDataFromResponseDTO(response);
      store.dispatch(financialDataActions.upsertFinancialData(financialData));
      store.dispatch(financialDataActions.mutationEnded());
      return financialData;
    } catch (error) {
      store.dispatch(financialDataActions.mutationFailed('No se pudieron cargar los datos'));
      throw error;
    }
  },

  async update(countryCode: CountryCode, input: FinancialDataInput): Promise<FinancialData> {
    store.dispatch(financialDataActions.mutationStarted());
    try {
      const dto = mapToUpdateFinancialDataDTO(input);
      const response = await financialDataApiClient.update(countryCode, dto);
      const financialData = mapFinancialDataFromResponseDTO(response);
      store.dispatch(financialDataActions.upsertFinancialData(financialData));
      store.dispatch(financialDataActions.mutationEnded());
      return financialData;
    } catch (error) {
      store.dispatch(financialDataActions.mutationFailed('No se pudieron cargar los datos'));
      throw error;
    }
  },

  async delete(countryCode: CountryCode): Promise<void> {
    // Optimistic delete
    store.dispatch(financialDataActions.deleteFinancialDataOptimistic(countryCode));
    try {
      await financialDataApiClient.delete(countryCode);
    } catch (error) {
      // Rollback strategy (simple version: refetch list)
      store.dispatch(financialDataActions.mutationFailed('No se pudieron cargar los datos'));
      // The calling use case will decide whether to refetch list/summary.
      throw error;
    }
  },

  async getAll(): Promise<Array<FinancialData>> {
    store.dispatch(financialDataActions.requestListStarted());
    try {
      const response = await financialDataApiClient.getAll();
      const items = mapFinancialDataArrayFromResponseDTO(response);
      store.dispatch(financialDataActions.requestListSucceeded(items));
      return items;
    } catch (error) {
      store.dispatch(financialDataActions.requestListFailed('No se pudieron cargar los datos'));
      throw error;
    }
  },

  async getByCountry(countryCode: CountryCode): Promise<FinancialData | null> {
    const response = await financialDataApiClient.getByCountry(countryCode);
    return mapFinancialDataFromResponseDTO(response);
  },

  async getSummary(): Promise<FinancialDataSummary> {
    store.dispatch(financialDataActions.requestSummaryStarted());
    try {
      const response = await financialDataApiClient.getSummary();
      const summary = mapFinancialDataSummaryFromResponseDTO(response);
      store.dispatch(financialDataActions.requestSummarySucceeded(summary));
      return summary;
    } catch (error) {
      store.dispatch(financialDataActions.requestSummaryFailed('No se pudieron cargar los datos'));
      throw error;
    }
  },
};
