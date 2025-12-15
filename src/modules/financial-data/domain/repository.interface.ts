import type { CountryCode, FinancialData, FinancialDataInput, FinancialDataSummary } from './types';

export interface FinancialDataRepository {
  /**
   * Creates a new financial data record.
   *
   * Business rules:
   * - Only one record per country can exist.
   * - Validates country/currency and non-negative amounts.
   */
  create: (input: FinancialDataInput) => Promise<FinancialData>;

  /**
   * Updates an existing financial data record for the given country.
   *
   * Business rules:
   * - Country must already exist.
   * - Path countryCode must match body countryCode (handled in infrastructure).
   */
  update: (countryCode: CountryCode, input: FinancialDataInput) => Promise<FinancialData>;

  /**
   * Deletes financial data for the given country.
   *
   * Should be implemented with optimistic updates in the infrastructure layer.
   */
  delete: (countryCode: CountryCode) => Promise<void>;

  /**
   * Retrieves all financial data records with values in USD.
   */
  getAll: () => Promise<Array<FinancialData>>;

  /**
   * Retrieves financial data for a specific country.
   */
  getByCountry: (countryCode: CountryCode) => Promise<FinancialData | null>;

  /**
   * Retrieves the consolidated summary for all countries.
   */
  getSummary: () => Promise<FinancialDataSummary>;
}
