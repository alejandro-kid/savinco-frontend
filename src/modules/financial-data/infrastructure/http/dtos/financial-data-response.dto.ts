import type { CountryCode, CurrencyCode } from '../../../domain/types';

export type FinancialDataResponseDTO = {
  countryCode: CountryCode;
  countryName: string;
  originalCurrency: CurrencyCode;
  capitalSaved: number;
  capitalLoaned: number;
  profitsGenerated: number;
  totalInUSD: number;
};

export type FinancialDataSummaryResponseDTO = {
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
};
