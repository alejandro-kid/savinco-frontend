import { useCallback, useEffect } from 'react';
import { useAppSelector } from '../../../../shared/redux/store';
import { getAllCurrenciesUseCase } from '../../application';
import type { Currency } from '../../domain/types';
import {
  selectAllCurrencies,
  selectCurrencyError,
  selectCurrencyIsLoading,
} from '../../infrastructure/redux/currency.selectors';
import { useCurrencyRepository } from './use-currency-repository';

export const useGetAllCurrencies = () => {
  const repository = useCurrencyRepository();
  const items = useAppSelector(selectAllCurrencies);
  const isLoading = useAppSelector(selectCurrencyIsLoading);
  const error = useAppSelector(selectCurrencyError);

  const load = useCallback(async (): Promise<Array<Currency>> => {
    return getAllCurrenciesUseCase(repository);
  }, [repository]);

  useEffect(() => {
    if (items.length === 0 && !isLoading && !error) {
      void load();
    }
  }, [items.length, isLoading, error, load]);

  return {
    items,
    isLoading,
    error,
    reload: load,
  };
};
