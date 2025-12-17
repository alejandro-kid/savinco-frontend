import type { CreateCurrencyInput, Currency, CurrencyRepository } from '../../domain';

export const createCurrencyUseCase = async (
  currencyRepository: CurrencyRepository,
  input: CreateCurrencyInput
): Promise<Currency> => {
  return await currencyRepository.create(input);
};
