import { useCallback } from 'react';
import { useAppSelector } from '../../../../shared/redux/store';
import { createCurrencyUseCase } from '../../application';
import type { CreateCurrencyInput, Currency } from '../../domain/types';
import {
  selectCurrencyError,
  selectCurrencyIsMutating,
} from '../../infrastructure/redux/currency.selectors';
import { useCurrencyRepository } from './use-currency-repository';

export const useCreateCurrency = () => {
  const repository = useCurrencyRepository();
  const isMutating = useAppSelector(selectCurrencyIsMutating);
  const error = useAppSelector(selectCurrencyError);

  const create = useCallback(
    async (input: CreateCurrencyInput): Promise<Currency> => {
      return createCurrencyUseCase(repository, input);
    },
    [repository]
  );

  return {
    create,
    isMutating,
    error,
  };
};
