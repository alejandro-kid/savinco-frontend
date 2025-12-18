import type { CreateCurrencyInput, Currency } from './types';

/**
 * Creates a valid currency entity.
 */
export const createCurrency = (currency: Currency): Currency => {
  ensureCurrencyIsValid(currency);
  return currency;
};

/**
 * Creates a currency from input data (typically from API).
 * Note: isBase is determined by the backend - the first currency becomes base automatically.
 */
export const createCurrencyFromInput = (
  input: CreateCurrencyInput,
  id: number,
  isBase: boolean,
  timestamps: { createdAt: string; updatedAt: string }
): Currency => {
  const currency: Currency = {
    id,
    code: input.code,
    name: input.name,
    isBase,
    exchangeRateToBase: input.exchangeRateToBase,
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
  };
  ensureCurrencyIsValid(currency);
  return currency;
};

/**
 * Validates currency data.
 */
const ensureCurrencyIsValid = (currency: Currency): void => {
  if (!currency.code || currency.code.length !== 3) {
    throw new Error('Currency code must be exactly 3 characters');
  }
  if (!/^[A-Z]{3}$/.test(currency.code)) {
    throw new Error('Currency code must be 3 uppercase letters');
  }
  if (!currency.name || currency.name.trim().length === 0) {
    throw new Error('Currency name cannot be empty');
  }
  if (currency.exchangeRateToBase <= 0) {
    throw new Error('Exchange rate must be positive');
  }
  if (currency.isBase && currency.exchangeRateToBase !== 1.0) {
    throw new Error('Base currency exchange rate must be exactly 1.0');
  }
};
