import { useCallback, useState } from 'react';
import { createCurrencyUseCase } from '../../application';
import type { CreateCurrencyInput, Currency } from '../../domain/types';
import { useCurrencyRepository } from './use-currency-repository';
import { useAppSelector } from '../../../../shared/redux/store';
import { selectCurrencyIsMutating, selectCurrencyError } from '../../infrastructure/redux/currency.selectors';

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
