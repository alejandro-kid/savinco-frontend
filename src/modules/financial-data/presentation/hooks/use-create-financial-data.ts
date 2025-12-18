import { useCallback } from 'react';
import { useAppSelector } from '../../../../shared/redux/store';
import { createFinancialDataUseCase } from '../../application';
import type { FinancialData, FinancialDataInput } from '../../domain/types';
import {
  selectFinancialDataIsMutating,
  selectFinancialDataMutationError,
} from '../../infrastructure/redux/financial-data.selectors';
import { useFinancialDataRepository } from './use-financial-data-repository';

export const useCreateFinancialData = () => {
  const repository = useFinancialDataRepository();
  const isMutating = useAppSelector(selectFinancialDataIsMutating);
  const error = useAppSelector(selectFinancialDataMutationError);

  const create = useCallback(
    async (input: FinancialDataInput): Promise<FinancialData> => {
      return createFinancialDataUseCase(repository, input);
    },
    [repository]
  );

  return {
    create,
    isMutating,
    error,
  };
};
