import type { Currency, CurrencyRepository } from '../../domain';

export const getCurrencyByCodeUseCase = async (
  currencyRepository: CurrencyRepository,
  code: string
): Promise<Currency | null> => {
  return await currencyRepository.getByCode(code);
};
