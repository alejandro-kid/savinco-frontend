import type { FinancialDataRepository } from '../../domain/repository.interface';
import { CountryCode, CurrencyCode, type FinancialDataInput } from '../../domain/types';
import { createFinancialDataUseCase } from '../use-cases/create-financial-data.use-case';

describe('createFinancialDataUseCase', () => {
  it('should call repository.create with validated input', async () => {
    const input: FinancialDataInput = {
      countryCode: CountryCode.ESP,
      currencyCode: CurrencyCode.EUR,
      capitalSaved: 100,
      capitalLoaned: 200,
      profitsGenerated: 50,
    };

    const repository: jest.Mocked<FinancialDataRepository> = {
      create: jest.fn().mockResolvedValue({
        countryCode: CountryCode.ESP,
        countryName: 'España',
        originalCurrency: CurrencyCode.EUR,
        capitalSaved: 111,
        capitalLoaned: 222,
        profitsGenerated: 55,
        totalInUSD: 388,
      }),
      update: jest.fn(),
      delete: jest.fn(),
      getAll: jest.fn(),
      getByCountry: jest.fn(),
      getSummary: jest.fn(),
    };

    const result = await createFinancialDataUseCase(repository, input);

    expect(repository.create).toHaveBeenCalledWith(input);
    expect(result.countryCode).toBe(CountryCode.ESP);
  });
});
