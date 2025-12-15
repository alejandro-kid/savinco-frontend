import type { CountryCode, CurrencyCode } from '../../../domain/types';

export type CreateFinancialDataDTO = {
  countryCode: CountryCode;
  currencyCode: CurrencyCode;
  capitalSaved: number;
  capitalLoaned: number;
  profitsGenerated: number;
};
