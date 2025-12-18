import { useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '../../../../shared/redux/store';
import { getAllFinancialDataUseCase } from '../../application';
import type { FinancialData } from '../../domain/types';
import {
  selectFinancialDataError,
  selectFinancialDataIsLoadingList,
  selectFinancialDataItems,
} from '../../infrastructure/redux/financial-data.selectors';
import { useFinancialDataRepository } from './use-financial-data-repository';

export const useGetAllFinancialData = () => {
  const repository = useFinancialDataRepository();
  const items = useAppSelector(selectFinancialDataItems);
  const isLoading = useAppSelector(selectFinancialDataIsLoadingList);
  const error = useAppSelector(selectFinancialDataError);
  const hasLoadedOnceRef = useRef(false);

  const load = useCallback(async (): Promise<Array<FinancialData>> => {
    return getAllFinancialDataUseCase(repository);
  }, [repository]);

  const reload = useCallback(async (): Promise<Array<FinancialData>> => {
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
