import { useCallback } from 'react';
import { updateExchangeRateUseCase } from '../../application';
import type { Currency, UpdateExchangeRateInput } from '../../domain/types';
import { useCurrencyRepository } from './use-currency-repository';
import { useAppSelector } from '../../../../shared/redux/store';
import { selectCurrencyIsMutating, selectCurrencyError } from '../../infrastructure/redux/currency.selectors';

export const useUpdateExchangeRate = () => {
  const repository = useCurrencyRepository();
  const isMutating = useAppSelector(selectCurrencyIsMutating);
  const error = useAppSelector(selectCurrencyError);

  const update = useCallback(
    async (code: string, input: UpdateExchangeRateInput): Promise<Currency> => {
      return updateExchangeRateUseCase(repository, code, input);
    },
    [repository]
  );

  return {
    update,
    isMutating,
    error,
  };
};
