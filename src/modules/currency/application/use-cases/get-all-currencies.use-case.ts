import type { Currency, CurrencyRepository } from '../../domain';

export const getAllCurrenciesUseCase = async (
  currencyRepository: CurrencyRepository
): Promise<Array<Currency>> => {
  return await currencyRepository.getAll();
};
