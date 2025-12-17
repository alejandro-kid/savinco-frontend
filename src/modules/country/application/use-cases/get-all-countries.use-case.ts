import type { Country, CountryRepository } from '../../domain';

export const getAllCountriesUseCase = async (
  countryRepository: CountryRepository
): Promise<Array<Country>> => {
  return await countryRepository.getAll();
};
