import { useCallback } from 'react';
import { deleteFinancialDataUseCase } from '../../application';
import type { CountryCode } from '../../domain/types';
import { useFinancialDataRepository } from './use-financial-data-repository';

export const useDeleteFinancialData = () => {
  const repository = useFinancialDataRepository();

  const remove = useCallback(
    async (countryCode: CountryCode): Promise<void> => {
      await deleteFinancialDataUseCase(repository, countryCode);
    },
    [repository]
  );

  return {
    remove,
  };
};
