import { parseApiError } from '../../../../shared/http/error-handler';
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
      // Solo invalidar summary si la operación fue exitosa
      store.dispatch(financialDataActions.invalidateSummary());
      store.dispatch(financialDataActions.mutationEnded());
      return financialData;
    } catch (error) {
      const apiError = parseApiError(error);
      const errorMessage =
        apiError?.message || 'No se pudieron crear los datos financieros. Intente nuevamente.';
      store.dispatch(financialDataActions.mutationFailed(errorMessage));
      // No invalidar summary ni hacer reload cuando hay error
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
      // Solo invalidar summary si la operación fue exitosa
      store.dispatch(financialDataActions.invalidateSummary());
      store.dispatch(financialDataActions.mutationEnded());
      return financialData;
    } catch (error) {
      const apiError = parseApiError(error);
      const errorMessage =
        apiError?.message || 'No se pudieron actualizar los datos financieros. Intente nuevamente.';
      store.dispatch(financialDataActions.mutationFailed(errorMessage));
      // No invalidar summary ni hacer reload cuando hay error
      throw error;
    }
  },

  async delete(countryCode: CountryCode): Promise<void> {
    store.dispatch(financialDataActions.mutationStarted());
    // Optimistic delete - actualiza UI inmediatamente
    store.dispatch(financialDataActions.deleteFinancialDataOptimistic(countryCode));
    store.dispatch(financialDataActions.invalidateSummary());
    try {
      await financialDataApiClient.delete(countryCode);
      store.dispatch(financialDataActions.mutationEnded());
    } catch (error) {
      const apiError = parseApiError(error);
      const errorMessage =
        apiError?.message || 'No se pudieron eliminar los datos financieros. Intente nuevamente.';
      store.dispatch(financialDataActions.mutationFailed(errorMessage));
      // Rollback: recargar lista para restaurar el estado correcto
      try {
        const response = await financialDataApiClient.getAll();
        const items = mapFinancialDataArrayFromResponseDTO(response);
        store.dispatch(financialDataActions.requestListSucceeded(items));
      } catch (_reloadError) {
        // Si falla el reload, el error ya está manejado arriba
      }
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
      const apiError = parseApiError(error);
      const errorMessage =
        apiError?.message || 'No se pudieron cargar los datos financieros. Intente nuevamente.';
      store.dispatch(financialDataActions.requestListFailed(errorMessage));
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
      const apiError = parseApiError(error);
      const errorMessage =
        apiError?.message || 'No se pudieron cargar los datos financieros. Intente nuevamente.';
      store.dispatch(financialDataActions.requestSummaryFailed(errorMessage));
      throw error;
    }
  },
};
