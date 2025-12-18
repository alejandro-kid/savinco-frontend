import { useCallback } from 'react';
import { useAppSelector } from '../../../../shared/redux/store';
import { deleteCurrencyUseCase } from '../../application';
import {
  selectCurrencyError,
  selectCurrencyIsMutating,
} from '../../infrastructure/redux/currency.selectors';
import { useCurrencyRepository } from './use-currency-repository';

export const useDeleteCurrency = () => {
  const repository = useCurrencyRepository();
  const isMutating = useAppSelector(selectCurrencyIsMutating);
  const error = useAppSelector(selectCurrencyError);

  const remove = useCallback(
    async (code: string): Promise<void> => {
      await deleteCurrencyUseCase(repository, code);
    },
    [repository]
  );

  return {
    remove,
    isMutating,
    error,
  };
};
