import type { FinancialDataRepository } from '../../domain/repository.interface';
import type { FinancialDataSummary } from '../../domain/types';

export const getSummaryUseCase = async (
  repository: FinancialDataRepository
): Promise<FinancialDataSummary> => {
  return repository.getSummary();
};
