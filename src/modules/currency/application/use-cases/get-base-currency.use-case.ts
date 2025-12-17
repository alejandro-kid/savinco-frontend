import type { Currency, CurrencyRepository } from '../../domain';

export const getBaseCurrencyUseCase = async (
  currencyRepository: CurrencyRepository
): Promise<Currency | null> => {
  return await currencyRepository.getBase();
};
