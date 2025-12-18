import type { CreateCurrencyInput, Currency, UpdateExchangeRateInput } from './types';

/**
 * Repository interface for currency operations.
 */
export interface CurrencyRepository {
  getAll: () => Promise<Array<Currency>>;
  getByCode: (code: string) => Promise<Currency | null>;
  getBase: () => Promise<Currency | null>;
  create: (input: CreateCurrencyInput) => Promise<Currency>;
  updateExchangeRate: (code: string, input: UpdateExchangeRateInput) => Promise<Currency>;
  delete: (code: string) => Promise<void>;
}
