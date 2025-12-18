import type {
  CountryCode,
  CurrencyCode,
  FinancialData,
  FinancialDataByCountrySummary,
  FinancialDataInput,
  FinancialDataSummary,
} from './types';
import {
  ensureCountryCodeFormat,
  ensureCurrencyCodeFormat,
  ensureNonNegativeAmounts,
} from './validations';

export const createFinancialDataFromResponse = (params: {
  countryCode: CountryCode;
  countryName: string;
  originalCurrency: CurrencyCode;
  capitalSaved: number;
  capitalLoaned: number;
  profitsGenerated: number;
  totalInUSD: number;
}): FinancialData => {
  // Use country name from backend response, not hardcoded map
  return {
    countryCode: ensureCountryCodeFormat(params.countryCode),
    countryName: params.countryName,
    originalCurrency: ensureCurrencyCodeFormat(params.originalCurrency),
    capitalSaved: params.capitalSaved,
    capitalLoaned: params.capitalLoaned,
    profitsGenerated: params.profitsGenerated,
    totalInUSD: params.totalInUSD,
  };
};

export const createFinancialDataInput = (input: FinancialDataInput): FinancialDataInput => {
  // Only validate format and non-negative amounts
  // Backend will validate country/currency validity and matching
  ensureNonNegativeAmounts(input);

  return {
    countryCode: ensureCountryCodeFormat(input.countryCode),
    currencyCode: ensureCurrencyCodeFormat(input.currencyCode),
    capitalSaved: input.capitalSaved,
    capitalLoaned: input.capitalLoaned,
    profitsGenerated: input.profitsGenerated,
  };
};

export const createFinancialDataSummary = (params: {
  totalCapitalSaved: number;
  totalCapitalLoaned: number;
  totalProfitsGenerated: number;
  grandTotal: number;
  byCountry: Array<{
    countryCode: CountryCode;
    countryName: string;
    capitalSaved: number;
    capitalLoaned: number;
    profitsGenerated: number;
  }>;
}): FinancialDataSummary => {
  // Use country names from backend response
  const byCountry: Array<FinancialDataByCountrySummary> = params.byCountry.map((item) => ({
    countryCode: ensureCountryCodeFormat(item.countryCode),
    countryName: item.countryName,
    capitalSaved: item.capitalSaved,
    capitalLoaned: item.capitalLoaned,
    profitsGenerated: item.profitsGenerated,
  }));

  return {
    totalCapitalSaved: params.totalCapitalSaved,
    totalCapitalLoaned: params.totalCapitalLoaned,
    totalProfitsGenerated: params.totalProfitsGenerated,
    grandTotal: params.grandTotal,
    byCountry,
  };
};
