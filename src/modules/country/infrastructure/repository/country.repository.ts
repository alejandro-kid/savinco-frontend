import { store } from '../../../../shared/redux/store';
import type { CountryRepository } from '../../domain/repository.interface';
import type { Country, CreateCountryInput } from '../../domain/types';
import { countryApiClient } from '../http/country-api.client';
import { mapCountryFromDTO, mapCountryToCreateDTO } from '../http/mappers/country.mapper';
import { countryActions } from '../redux/country.slice';

export const countryRepository: CountryRepository = {
  async create(input: CreateCountryInput): Promise<Country> {
    store.dispatch(countryActions.mutationStarted());
    try {
      const dto = mapCountryToCreateDTO(input);
      const response = await countryApiClient.create(dto);
      const country = mapCountryFromDTO(response);
      store.dispatch(countryActions.upsertCountry(country));
      store.dispatch(countryActions.mutationEnded());
      return country;
    } catch (error) {
      store.dispatch(
        countryActions.mutationFailed(
          error instanceof Error ? error.message : 'Unknown error while creating country'
        )
      );
      throw error;
    }
  },

  async getAll(): Promise<Array<Country>> {
    store.dispatch(countryActions.requestStarted());
    try {
      const response = await countryApiClient.getAll();
      const items = response.map(mapCountryFromDTO);
      store.dispatch(countryActions.requestSucceeded(items));
      return items;
    } catch (error) {
      store.dispatch(
        countryActions.requestFailed(
          error instanceof Error ? error.message : 'Unknown error while fetching countries'
        )
      );
      throw error;
    }
  },

  async getByCode(code: string): Promise<Country | null> {
    try {
      const response = await countryApiClient.getByCode(code);
      const country = mapCountryFromDTO(response);
      store.dispatch(countryActions.upsertCountry(country));
      return country;
    } catch (_error) {
      return null;
    }
  },
};
