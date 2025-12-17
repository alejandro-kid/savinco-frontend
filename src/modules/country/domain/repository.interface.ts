import type { Country, CreateCountryInput } from './types';

/**
 * Repository interface for country operations.
 */
export interface CountryRepository {
  getAll: () => Promise<Array<Country>>;
  getByCode: (code: string) => Promise<Country | null>;
  create: (input: CreateCountryInput) => Promise<Country>;
}
