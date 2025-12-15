import type { FinancialDataRepository } from '../../domain/repository.interface';
import type { CountryCode, FinancialData } from '../../domain/types';

export const getByCountryUseCase = async (
  repository: FinancialDataRepository,
  countryCode: CountryCode
): Promise<FinancialData | null> => {
  return repository.getByCountry(countryCode);
};
