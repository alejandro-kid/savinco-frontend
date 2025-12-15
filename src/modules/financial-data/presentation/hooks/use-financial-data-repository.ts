import type { FinancialDataRepository } from '../../domain/repository.interface';
import { financialDataRepository } from '../../infrastructure/repository/financial-data.repository';

/**
 * Simple adapter in case we want to swap repository implementation later
 * or inject additional cross-cutting concerns.
 */
export const useFinancialDataRepository = (): FinancialDataRepository => {
  return financialDataRepository;
};
