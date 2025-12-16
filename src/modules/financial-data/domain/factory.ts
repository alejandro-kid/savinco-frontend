import {
  CountryCode,
  type CountryName,
  type CurrencyCode,
  type FinancialData,
  type FinancialDataByCountrySummary,
  type FinancialDataInput,
  type FinancialDataSummary,
} from './types';
import {
  ensureCurrencyMatchesCountry,
  ensureNonNegativeAmounts,
  ensureValidCountryCode,
  ensureValidCurrencyCode,
} from './validations';

const COUNTRY_NAME_MAP: Record<CountryCode, CountryName> = {
  [CountryCode.ECU]: 'Ecuador',
  [CountryCode.ESP]: 'España',
  [CountryCode.PER]: 'Perú',
  [CountryCode.NPL]: 'Nepal',
};

export const createFinancialDataFromResponse = (params: {
  countryCode: CountryCode;
  countryName: string;
  originalCurrency: CurrencyCode;
  capitalSaved: number;
  capitalLoaned: number;
  profitsGenerated: number;
  totalInUSD: number;
}): FinancialData => {
  const countryCode = ensureValidCountryCode(params.countryCode);
  const originalCurrency = ensureValidCurrencyCode(params.originalCurrency);

  return {
    countryCode,
    countryName: COUNTRY_NAME_MAP[countryCode],
    originalCurrency,
    capitalSaved: params.capitalSaved,
    capitalLoaned: params.capitalLoaned,
    profitsGenerated: params.profitsGenerated,
    totalInUSD: params.totalInUSD,
  };
};

export const createFinancialDataInput = (input: FinancialDataInput): FinancialDataInput => {
  const countryCode = ensureValidCountryCode(input.countryCode);
  const currencyCode = ensureValidCurrencyCode(input.currencyCode);

  ensureCurrencyMatchesCountry(countryCode, currencyCode);
  ensureNonNegativeAmounts(input);

  return {
    countryCode,
    currencyCode,
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
  const byCountry: Array<FinancialDataByCountrySummary> = params.byCountry.map((item) => {
    const countryCode = ensureValidCountryCode(item.countryCode);
    return {
      countryCode,
      countryName: COUNTRY_NAME_MAP[countryCode],
      capitalSaved: item.capitalSaved,
      capitalLoaned: item.capitalLoaned,
      profitsGenerated: item.profitsGenerated,
    };
  });

  return {
    totalCapitalSaved: params.totalCapitalSaved,
    totalCapitalLoaned: params.totalCapitalLoaned,
    totalProfitsGenerated: params.totalProfitsGenerated,
    grandTotal: params.grandTotal,
    byCountry,
  };
};
