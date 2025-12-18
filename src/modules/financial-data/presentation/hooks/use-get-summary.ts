import { useCallback, useEffect } from 'react';
import { useAppSelector } from '../../../../shared/redux/store';
import { getSummaryUseCase } from '../../application';
import type { FinancialDataSummary } from '../../domain/types';
import {
  selectFinancialDataError,
  selectFinancialDataIsLoadingSummary,
  selectFinancialDataSummary,
} from '../../infrastructure/redux/financial-data.selectors';
import { useFinancialDataRepository } from './use-financial-data-repository';

export const useGetSummary = () => {
  const repository = useFinancialDataRepository();
  const summary = useAppSelector(selectFinancialDataSummary);
  const isLoading = useAppSelector(selectFinancialDataIsLoadingSummary);
  const error = useAppSelector(selectFinancialDataError);

  const load = useCallback(async (): Promise<FinancialDataSummary> => {
    return getSummaryUseCase(repository);
  }, [repository]);

  useEffect(() => {
    // Recargar cuando el summary se invalida (se pone en null) o cuando no hay summary y no está cargando
    // Esto asegura que cuando se hace create/update/delete, el summary se recarga automáticamente
    if (!summary && !isLoading && !error) {
      void load();
    }
  }, [summary, isLoading, error, load]);

  return {
    summary,
    isLoading,
    error,
    reload: load,
  };
};
