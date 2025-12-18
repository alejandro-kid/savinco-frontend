import type { CurrencyRepository } from '../../domain';

export const deleteCurrencyUseCase = async (
  currencyRepository: CurrencyRepository,
  code: string
): Promise<void> => {
  await currencyRepository.delete(code);
};
