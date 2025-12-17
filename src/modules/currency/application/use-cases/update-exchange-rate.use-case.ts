import type { Currency, CurrencyRepository, UpdateExchangeRateInput } from '../../domain';

export const updateExchangeRateUseCase = async (
  currencyRepository: CurrencyRepository,
  code: string,
  input: UpdateExchangeRateInput
): Promise<Currency> => {
  return await currencyRepository.updateExchangeRate(code, input);
};
