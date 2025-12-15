export enum CountryCode {
  ECU = 'ECU',
  ESP = 'ESP',
  PER = 'PER',
  NPL = 'NPL',
}

export enum CurrencyCode {
  USD = 'USD',
  EUR = 'EUR',
  PEN = 'PEN',
  NPR = 'NPR',
}

export type CountryName = 'Ecuador' | 'España' | 'Perú' | 'Nepal';

/**
 * Core financial data for a single country.
 *
 * All numeric values are expressed in USD, matching the backend responses.
 * The original currency is preserved for display purposes.
 */
export type FinancialData = {
  countryCode: CountryCode;
  countryName: CountryName;
  originalCurrency: CurrencyCode;
  capitalSaved: number;
  capitalLoaned: number;
  profitsGenerated: number;
  totalInUSD: number;
};

/**
 * Input data used when creating/updating a record from the UI.
 * Values are in the original currency specified by `currencyCode`.
 */
export type FinancialDataInput = {
  countryCode: CountryCode;
  currencyCode: CurrencyCode;
  capitalSaved: number;
  capitalLoaned: number;
  profitsGenerated: number;
};

/**
 * Consolidated summary across all countries.
 */
export type FinancialDataSummary = {
  totalCapitalSaved: number;
  totalCapitalLoaned: number;
  totalProfitsGenerated: number;
  grandTotal: number;
  byCountry: Array<FinancialDataByCountrySummary>;
};

export type FinancialDataByCountrySummary = {
  countryCode: CountryCode;
  countryName: CountryName;
  capitalSaved: number;
  capitalLoaned: number;
  profitsGenerated: number;
};
