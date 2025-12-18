import { parseApiError } from '../../../../shared/http/error-handler';
import { store } from '../../../../shared/redux/store';
import type { CurrencyRepository } from '../../domain/repository.interface';
import type { CreateCurrencyInput, Currency, UpdateExchangeRateInput } from '../../domain/types';
import { currencyApiClient } from '../http/currency-api.client';
import {
  mapCurrencyFromDTO,
  mapCurrencyToCreateDTO,
  mapUpdateExchangeRateToDTO,
} from '../http/mappers/currency.mapper';
import { currencyActions } from '../redux/currency.slice';

export const currencyRepository: CurrencyRepository = {
  async create(input: CreateCurrencyInput): Promise<Currency> {
    store.dispatch(currencyActions.mutationStarted());
    try {
      const dto = mapCurrencyToCreateDTO(input);
      const response = await currencyApiClient.create(dto);
      const currency = mapCurrencyFromDTO(response);
      store.dispatch(currencyActions.upsertCurrency(currency));
      store.dispatch(currencyActions.mutationEnded());
      return currency;
    } catch (error) {
      store.dispatch(currencyActions.mutationFailed('No se pudieron cargar los datos'));
      throw error;
    }
  },

  async getAll(): Promise<Array<Currency>> {
    store.dispatch(currencyActions.requestStarted());
    try {
      const response = await currencyApiClient.getAll();
      const items = response.map(mapCurrencyFromDTO);
      store.dispatch(currencyActions.requestSucceeded(items));
      return items;
    } catch (error) {
      store.dispatch(currencyActions.requestFailed('No se pudieron cargar los datos'));
      throw error;
    }
  },

  async getByCode(code: string): Promise<Currency | null> {
    try {
      const response = await currencyApiClient.getByCode(code);
      const currency = mapCurrencyFromDTO(response);
      store.dispatch(currencyActions.upsertCurrency(currency));
      return currency;
    } catch (_error) {
      return null;
    }
  },

  async getBase(): Promise<Currency | null> {
    store.dispatch(currencyActions.requestBaseStarted());
    try {
      const response = await currencyApiClient.getBase();
      const currency = mapCurrencyFromDTO(response);
      store.dispatch(currencyActions.requestBaseSucceeded(currency));
      return currency;
    } catch (_error) {
      store.dispatch(currencyActions.requestBaseFailed('No se pudieron cargar los datos'));
      return null;
    }
  },

  async updateExchangeRate(code: string, input: UpdateExchangeRateInput): Promise<Currency> {
    store.dispatch(currencyActions.mutationStarted());
    try {
      const dto = mapUpdateExchangeRateToDTO(input);
      const response = await currencyApiClient.updateExchangeRate(code, dto);
      const currency = mapCurrencyFromDTO(response);
      store.dispatch(currencyActions.upsertCurrency(currency));
      store.dispatch(currencyActions.mutationEnded());
      return currency;
    } catch (error) {
      store.dispatch(currencyActions.mutationFailed('No se pudieron cargar los datos'));
      throw error;
    }
  },

  async delete(code: string): Promise<void> {
    store.dispatch(currencyActions.mutationStarted());
    try {
      await currencyApiClient.delete(code);
      // Solo eliminamos del estado si la API confirma el éxito
      store.dispatch(currencyActions.deleteCurrencyOptimistic(code));
      store.dispatch(currencyActions.mutationEnded());
    } catch (error) {
      const apiError = parseApiError(error);
      const errorMessage =
        apiError?.message || 'No se pudo eliminar la moneda. Intente nuevamente.';
      store.dispatch(currencyActions.mutationFailed(errorMessage));
      // NO recargamos los datos - si dio error, los datos quedan igual
      throw error;
    }
  },
};
