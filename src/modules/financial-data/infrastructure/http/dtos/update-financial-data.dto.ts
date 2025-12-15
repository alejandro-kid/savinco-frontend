import type { CountryCode, CurrencyCode } from '../../../domain/types';

export type UpdateFinancialDataDTO = {
  countryCode: CountryCode;
  currencyCode: CurrencyCode;
  capitalSaved: number;
  capitalLoaned: number;
  profitsGenerated: number;
};
