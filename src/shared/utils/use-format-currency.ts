import { useMemo } from 'react';
import { useBaseCurrency } from '../../modules/currency/presentation/hooks/use-base-currency';
import { formatCurrency } from './format-currency';

/**
 * Hook to format currency using the base currency dynamically.
 * @returns A function to format currency values
 */
export const useFormatCurrency = () => {
  const baseCurrency = useBaseCurrency();

  return useMemo(
    () =>
      (
        value: number,
        options?: { maximumFractionDigits?: number; minimumFractionDigits?: number }
      ) => {
        if (!baseCurrency) {
          // Fallback to USD if base currency is not loaded yet
          return formatCurrency(value, options);
        }

        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: baseCurrency.code,
          maximumFractionDigits: options?.maximumFractionDigits ?? 2,
          minimumFractionDigits: options?.minimumFractionDigits ?? 2,
        }).format(value);
      },
    [baseCurrency]
  );
};
