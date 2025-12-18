import { NegativeAmountError } from './errors';
import type { FinancialDataInput } from './types';

// Validations are now minimal - backend is the source of truth
// We only validate basic format and non-negative amounts

export const ensureNonNegativeAmounts = (input: FinancialDataInput): void => {
  if (input.capitalSaved < 0) {
    throw new NegativeAmountError('capitalSaved');
  }
  if (input.capitalLoaned < 0) {
    throw new NegativeAmountError('capitalLoaned');
  }
  if (input.profitsGenerated < 0) {
    throw new NegativeAmountError('profitsGenerated');
  }
};

// Basic format validation - backend will validate business rules
export const ensureCountryCodeFormat = (countryCode: string): string => {
  if (!countryCode || countryCode.trim().length === 0) {
    throw new Error('Country code cannot be empty');
  }
  return countryCode.trim().toUpperCase();
};

export const ensureCurrencyCodeFormat = (currencyCode: string): string => {
  if (!currencyCode || currencyCode.trim().length === 0) {
    throw new Error('Currency code cannot be empty');
  }
  return currencyCode.trim().toUpperCase();
};
