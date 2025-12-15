import { useCallback, useEffect } from 'react';
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

  const load = useCallback(async (): Promise<Array<FinancialData>> => {
    return getAllFinancialDataUseCase(repository);
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
