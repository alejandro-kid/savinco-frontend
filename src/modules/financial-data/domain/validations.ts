import {
  CurrencyDoesNotMatchCountryError,
  InvalidCountryCodeError,
  InvalidCurrencyCodeError,
  NegativeAmountError,
} from './errors';
import { CountryCode, CurrencyCode, type FinancialDataInput } from './types';

const COUNTRY_TO_CURRENCY_MAP: Record<CountryCode, CurrencyCode> = {
  [CountryCode.ECU]: CurrencyCode.USD,
  [CountryCode.ESP]: CurrencyCode.EUR,
  [CountryCode.PER]: CurrencyCode.PEN,
  [CountryCode.NPL]: CurrencyCode.NPR,
};

export const isValidCountryCode = (countryCode: string): countryCode is CountryCode => {
  return Object.values(CountryCode).includes(countryCode as CountryCode);
};

export const isValidCurrencyCode = (currencyCode: string): currencyCode is CurrencyCode => {
  return Object.values(CurrencyCode).includes(currencyCode as CurrencyCode);
};

export const ensureValidCountryCode = (countryCode: string): CountryCode => {
  if (!isValidCountryCode(countryCode)) {
    throw new InvalidCountryCodeError(countryCode);
  }
  return countryCode;
};

export const ensureValidCurrencyCode = (currencyCode: string): CurrencyCode => {
  if (!isValidCurrencyCode(currencyCode)) {
    throw new InvalidCurrencyCodeError(currencyCode);
  }
  return currencyCode;
};

export const ensureCurrencyMatchesCountry = (
  countryCode: CountryCode,
  currencyCode: CurrencyCode
): void => {
  const expectedCurrency = COUNTRY_TO_CURRENCY_MAP[countryCode];

  if (currencyCode !== expectedCurrency) {
    throw new CurrencyDoesNotMatchCountryError(currencyCode, countryCode, expectedCurrency);
  }
};

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
