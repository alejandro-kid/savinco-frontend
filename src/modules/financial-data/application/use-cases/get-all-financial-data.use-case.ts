import type { FinancialDataRepository } from '../../domain/repository.interface';
import type { FinancialData } from '../../domain/types';

export const getAllFinancialDataUseCase = async (
  repository: FinancialDataRepository
): Promise<Array<FinancialData>> => {
  return repository.getAll();
};
