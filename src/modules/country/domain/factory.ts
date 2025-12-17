import type { Country, CreateCountryInput } from './types';

/**
 * Creates a valid country entity.
 */
export const createCountry = (country: Country): Country => {
  ensureCountryIsValid(country);
  return country;
};

/**
 * Creates a country from input data (typically from API).
 */
export const createCountryFromInput = (
  input: CreateCountryInput,
  id: number,
  timestamps: { createdAt: string; updatedAt: string }
): Country => {
  const country: Country = {
    id,
    code: input.code,
    name: input.name,
    currencyCode: input.currencyCode,
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
  };
  ensureCountryIsValid(country);
  return country;
};

/**
 * Validates country data.
 */
const ensureCountryIsValid = (country: Country): void => {
  if (!country.code || country.code.length !== 3) {
    throw new Error('Country code must be exactly 3 characters');
  }
  if (!/^[A-Z]{3}$/.test(country.code)) {
    throw new Error('Country code must be 3 uppercase letters');
  }
  if (!country.name || country.name.trim().length === 0) {
    throw new Error('Country name cannot be empty');
  }
  if (!country.currencyCode || country.currencyCode.length !== 3) {
    throw new Error('Currency code must be exactly 3 characters');
  }
  if (!/^[A-Z]{3}$/.test(country.currencyCode)) {
    throw new Error('Currency code must be 3 uppercase letters');
  }
};
