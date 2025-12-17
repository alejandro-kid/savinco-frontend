import { useMemo } from 'react';
import type { CurrencyRepository } from '../../domain';
import { currencyRepository } from '../../infrastructure/repository/currency.repository';

export const useCurrencyRepository = (): CurrencyRepository => {
  return useMemo(() => currencyRepository, []);
};
