/**
 * Country code (3 uppercase letters, e.g., ECU, ESP, PER, NPL)
 */
export type CountryCode = string;

/**
 * Currency code (3 uppercase letters, e.g., USD, EUR, PEN, NPR)
 */
export type CurrencyCode = string;

/**
 * Country entity representing a country with its associated currency.
 */
export type Country = {
  id: number;
  code: CountryCode;
  name: string;
  currencyCode: CurrencyCode;
  createdAt: string;
  updatedAt: string;
};

/**
 * Input data for creating a country.
 */
export type CreateCountryInput = {
  code: CountryCode;
  name: string;
  currencyCode: CurrencyCode;
};
