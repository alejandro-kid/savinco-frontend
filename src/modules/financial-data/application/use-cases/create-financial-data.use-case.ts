import { createFinancialDataInput } from '../../domain/factory';
import type { FinancialDataRepository } from '../../domain/repository.interface';
import type { FinancialData, FinancialDataInput } from '../../domain/types';

export const createFinancialDataUseCase = async (
  repository: FinancialDataRepository,
  input: FinancialDataInput
): Promise<FinancialData> => {
  const validatedInput = createFinancialDataInput(input);
  const result = await repository.create(validatedInput);
  return result;
};
