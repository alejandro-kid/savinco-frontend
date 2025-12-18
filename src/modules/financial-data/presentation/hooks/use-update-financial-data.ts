import { useCallback } from 'react';
import { useAppSelector } from '../../../../shared/redux/store';
import { updateFinancialDataUseCase } from '../../application';
import type { CountryCode, FinancialData, FinancialDataInput } from '../../domain/types';
import {
  selectFinancialDataIsMutating,
  selectFinancialDataMutationError,
} from '../../infrastructure/redux/financial-data.selectors';
import { useFinancialDataRepository } from './use-financial-data-repository';

export const useUpdateFinancialData = () => {
  const repository = useFinancialDataRepository();
  const isMutating = useAppSelector(selectFinancialDataIsMutating);
  const error = useAppSelector(selectFinancialDataMutationError);

  const update = useCallback(
    async (countryCode: CountryCode, input: FinancialDataInput): Promise<FinancialData> => {
      return updateFinancialDataUseCase(repository, countryCode, input);
    },
    [repository]
  );

  return {
    update,
    isMutating,
    error,
  };
};
