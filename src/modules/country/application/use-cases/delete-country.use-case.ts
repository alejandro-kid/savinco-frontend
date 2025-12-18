import type { CountryRepository } from '../../domain';

export const deleteCountryUseCase = async (
  countryRepository: CountryRepository,
  code: string
): Promise<void> => {
  await countryRepository.delete(code);
};
