import { useCallback } from 'react';
import { useAppSelector } from '../../../../shared/redux/store';
import { deleteFinancialDataUseCase } from '../../application';
import type { CountryCode } from '../../domain/types';
import {
  selectFinancialDataError,
  selectFinancialDataIsMutating,
} from '../../infrastructure/redux/financial-data.selectors';
import { useFinancialDataRepository } from './use-financial-data-repository';

export const useDeleteFinancialData = () => {
  const repository = useFinancialDataRepository();
  const isMutating = useAppSelector(selectFinancialDataIsMutating);
  const error = useAppSelector(selectFinancialDataError);

  const remove = useCallback(
    async (countryCode: CountryCode): Promise<void> => {
      await deleteFinancialDataUseCase(repository, countryCode);
    },
    [repository]
  );

  return {
    remove,
    isMutating,
    error,
  };
};
