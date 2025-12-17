import type { CountryCode, CurrencyCode } from '../../../domain/types';

export type CountryResponseDTO = {
  id: number;
  code: CountryCode;
  name: string;
  currencyCode: CurrencyCode;
  createdAt: string;
  updatedAt: string;
};

export type CreateCountryDTO = {
  code: CountryCode;
  name: string;
  currencyCode: CurrencyCode;
};
