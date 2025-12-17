import type { Country, CountryRepository } from '../../domain';

export const getCountryByCodeUseCase = async (
  countryRepository: CountryRepository,
  code: string
): Promise<Country | null> => {
  return await countryRepository.getByCode(code);
};
