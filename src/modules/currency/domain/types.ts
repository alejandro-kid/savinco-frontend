/**
 * Currency code (3 uppercase letters, e.g., USD, EUR, PEN, NPR)
 */
export type CurrencyCode = string;

/**
 * Currency entity representing a currency with its exchange rate.
 */
export type Currency = {
  id: number;
  code: CurrencyCode;
  name: string;
  isBase: boolean;
  exchangeRateToBase: number;
  createdAt: string;
  updatedAt: string;
};

/**
 * Input data for creating a currency.
 * Note: isBase is determined automatically by the backend - if no base currency exists, the first currency becomes the base.
 */
export type CreateCurrencyInput = {
  code: CurrencyCode;
  name: string;
  exchangeRateToBase: number;
};

/**
 * Input data for updating exchange rate.
 */
export type UpdateExchangeRateInput = {
  exchangeRateToBase: number;
};
