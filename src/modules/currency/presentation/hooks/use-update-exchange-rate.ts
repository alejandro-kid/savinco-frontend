import { useCallback } from 'react';
import { useAppSelector } from '../../../../shared/redux/store';
import { updateExchangeRateUseCase } from '../../application';
import type { Currency, UpdateExchangeRateInput } from '../../domain/types';
import {
  selectCurrencyError,
  selectCurrencyIsMutating,
} from '../../infrastructure/redux/currency.selectors';
import { useCurrencyRepository } from './use-currency-repository';

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
