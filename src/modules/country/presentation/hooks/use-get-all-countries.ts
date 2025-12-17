import { useCallback, useEffect } from 'react';
import { useAppSelector } from '../../../../shared/redux/store';
import { getAllCountriesUseCase } from '../../application';
import type { Country } from '../../domain/types';
import {
  selectAllCountries,
  selectCountryError,
  selectCountryIsLoading,
} from '../../infrastructure/redux/country.selectors';
import { useCountryRepository } from './use-country-repository';

export const useGetAllCountries = () => {
  const repository = useCountryRepository();
  const items = useAppSelector(selectAllCountries);
  const isLoading = useAppSelector(selectCountryIsLoading);
  const error = useAppSelector(selectCountryError);

  const load = useCallback(async (): Promise<Array<Country>> => {
    return getAllCountriesUseCase(repository);
  }, [repository]);

  useEffect(() => {
    if (items.length === 0 && !isLoading && !error) {
      void load();
    }
  }, [items.length, isLoading, error, load]);

  return {
    items,
    isLoading,
    error,
    reload: load,
  };
};
