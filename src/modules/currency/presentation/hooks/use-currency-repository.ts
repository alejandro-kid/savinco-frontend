import { useMemo } from 'react';
import { currencyRepository } from '../../infrastructure/repository/currency.repository';
import type { CurrencyRepository } from '../../domain';

export const useCurrencyRepository = (): CurrencyRepository => {
  return useMemo(() => currencyRepository, []);
};
