import type { FinancialDataRepository } from '../../domain/repository.interface';
import type { CountryCode } from '../../domain/types';

export const deleteFinancialDataUseCase = async (
  repository: FinancialDataRepository,
  countryCode: CountryCode
): Promise<void> => {
  await repository.delete(countryCode);
};
