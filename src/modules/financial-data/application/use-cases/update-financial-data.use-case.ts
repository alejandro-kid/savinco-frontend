import { createFinancialDataInput } from '../../domain/factory';
import type { FinancialDataRepository } from '../../domain/repository.interface';
import type { CountryCode, FinancialData, FinancialDataInput } from '../../domain/types';

export const updateFinancialDataUseCase = async (
  repository: FinancialDataRepository,
  countryCode: CountryCode,
  input: FinancialDataInput
): Promise<FinancialData> => {
  const validatedInput = createFinancialDataInput(input);
  return repository.update(countryCode, validatedInput);
};
