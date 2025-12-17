import { useCallback } from 'react';
import { createCountryUseCase } from '../../application';
import type { CreateCountryInput, Country } from '../../domain/types';
import { useCountryRepository } from './use-country-repository';
import { useAppSelector } from '../../../../shared/redux/store';
import { selectCountryIsMutating, selectCountryError } from '../../infrastructure/redux/country.selectors';

export const useCreateCountry = () => {
  const repository = useCountryRepository();
  const isMutating = useAppSelector(selectCountryIsMutating);
  const error = useAppSelector(selectCountryError);

  const create = useCallback(
    async (input: CreateCountryInput): Promise<Country> => {
      return createCountryUseCase(repository, input);
    },
    [repository]
  );

  return {
    create,
    isMutating,
    error,
  };
};
