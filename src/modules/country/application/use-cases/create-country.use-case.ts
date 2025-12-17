import type { Country, CountryRepository, CreateCountryInput } from '../../domain';

export const createCountryUseCase = async (
  countryRepository: CountryRepository,
  input: CreateCountryInput
): Promise<Country> => {
  return await countryRepository.create(input);
};
