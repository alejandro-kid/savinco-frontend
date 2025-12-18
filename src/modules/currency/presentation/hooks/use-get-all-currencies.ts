import { useCallback, useEffect, useRef } from 'react';
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
  const hasLoadedOnceRef = useRef(false);

  const load = useCallback(async (): Promise<Array<Currency>> => {
    return getAllCurrenciesUseCase(repository);
  }, [repository]);

  const reload = useCallback(async (): Promise<Array<Currency>> => {
    // Resetear el flag para permitir recarga manual
    hasLoadedOnceRef.current = false;
    return load();
  }, [load]);

  useEffect(() => {
    // Solo cargar una vez cuando el componente se monta y no hay items
    // Si el API devuelve un array vacío, no volver a intentar cargar automáticamente
    if (!hasLoadedOnceRef.current && items.length === 0 && !isLoading && !error) {
      hasLoadedOnceRef.current = true;
      void load();
    }
  }, [items.length, isLoading, error, load]);

  return {
    items,
    isLoading,
    error,
    reload,
  };
};
