import type { RootState } from '../../../../shared/redux/store';
import type { Currency } from '../../domain/types';

export const selectAllCurrencies = (state: RootState): Array<Currency> => state.currency.items;
export const selectBaseCurrency = (state: RootState): Currency | null => state.currency.baseCurrency;
export const selectCurrencyByCode = (code: string) => (state: RootState): Currency | undefined =>
  state.currency.items.find((currency) => currency.code === code);
export const selectCurrencyIsLoading = (state: RootState): boolean => state.currency.isLoading;
export const selectCurrencyIsMutating = (state: RootState): boolean => state.currency.isMutating;
export const selectCurrencyError = (state: RootState): string | null => state.currency.error;
