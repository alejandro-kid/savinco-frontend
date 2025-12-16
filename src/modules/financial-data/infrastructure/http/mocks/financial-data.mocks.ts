import { CountryCode, CurrencyCode } from '../../../domain/types';
import type {
  FinancialDataResponseDTO,
  FinancialDataSummaryResponseDTO,
} from '../dtos/financial-data-response.dto';

/**
 * Mock data for development
 * Based on API_DOCUMENTATION.md structure and requirements.md expected values
 */

/**
 * Mock summary data matching the expected totals from requirements.md:
 * - Capital ahorrado: $33,666,477
 * - Capital prestado: $274,878,091
 * - Utilidades generadas: $39,581,411
 * - Grand Total: $348,125,979
 */
export const MOCK_SUMMARY_RESPONSE: FinancialDataSummaryResponseDTO = {
  totalCapitalSaved: 33666477.0,
  totalCapitalLoaned: 274878091.0,
  totalProfitsGenerated: 39581411.0,
  grandTotal: 348125979.0,
  byCountry: [
    {
      countryCode: CountryCode.ECU,
      countryName: 'Ecuador',
      capitalSaved: 8000000.0,
      capitalLoaned: 65000000.0,
      profitsGenerated: 9500000.0,
    },
    {
      countryCode: CountryCode.ESP,
      countryName: 'España',
      capitalSaved: 12000000.0,
      capitalLoaned: 98000000.0,
      profitsGenerated: 12500000.0,
    },
    {
      countryCode: CountryCode.PER,
      countryName: 'Perú',
      capitalSaved: 10000000.0,
      capitalLoaned: 85000000.0,
      profitsGenerated: 12000000.0,
    },
    {
      countryCode: CountryCode.NPL,
      countryName: 'Nepal',
      capitalSaved: 3666477.0,
      capitalLoaned: 26878091.0,
      profitsGenerated: 5581411.0,
    },
  ],
};

/**
 * Mock financial data for all countries
 */
export const MOCK_FINANCIAL_DATA_RESPONSE: Array<FinancialDataResponseDTO> = [
  {
    countryCode: CountryCode.ECU,
    countryName: 'Ecuador',
    originalCurrency: CurrencyCode.USD,
    capitalSaved: 8000000.0,
    capitalLoaned: 65000000.0,
    profitsGenerated: 9500000.0,
    totalInUSD: 82500000.0,
  },
  {
    countryCode: CountryCode.ESP,
    countryName: 'España',
    originalCurrency: CurrencyCode.EUR,
    capitalSaved: 12000000.0,
    capitalLoaned: 98000000.0,
    profitsGenerated: 12500000.0,
    totalInUSD: 122500000.0,
  },
  {
    countryCode: CountryCode.PER,
    countryName: 'Perú',
    originalCurrency: CurrencyCode.PEN,
    capitalSaved: 10000000.0,
    capitalLoaned: 85000000.0,
    profitsGenerated: 12000000.0,
    totalInUSD: 107000000.0,
  },
  {
    countryCode: CountryCode.NPL,
    countryName: 'Nepal',
    originalCurrency: CurrencyCode.NPR,
    capitalSaved: 3666477.0,
    capitalLoaned: 26878091.0,
    profitsGenerated: 5581411.0,
    totalInUSD: 36125979.0,
  },
];

/**
 * Simulate API delay for more realistic development experience
 */
const simulateDelay = (ms = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Mock API client methods for development
 */
export const mockFinancialDataApiClient = {
  getSummary: async (): Promise<FinancialDataSummaryResponseDTO> => {
    await simulateDelay(300);
    return MOCK_SUMMARY_RESPONSE;
  },

  getAll: async (): Promise<Array<FinancialDataResponseDTO>> => {
    await simulateDelay(300);
    return MOCK_FINANCIAL_DATA_RESPONSE;
  },

  getByCountry: async (countryCode: CountryCode): Promise<FinancialDataResponseDTO> => {
    await simulateDelay(200);
    const data = MOCK_FINANCIAL_DATA_RESPONSE.find((item) => item.countryCode === countryCode);
    if (!data) {
      throw new Error(`Financial data not found for country: ${countryCode}`);
    }
    return data;
  },

  create: async (): Promise<FinancialDataResponseDTO> => {
    await simulateDelay(400);
    throw new Error('Mock: Create operation not implemented in development mode');
  },

  update: async (): Promise<FinancialDataResponseDTO> => {
    await simulateDelay(400);
    throw new Error('Mock: Update operation not implemented in development mode');
  },

  delete: async (): Promise<void> => {
    await simulateDelay(300);
    throw new Error('Mock: Delete operation not implemented in development mode');
  },
};
