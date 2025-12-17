import { useCallback } from 'react';
import { useAppSelector } from '../../../../shared/redux/store';
import { createCountryUseCase } from '../../application';
import type { Country, CreateCountryInput } from '../../domain/types';
import {
  selectCountryError,
  selectCountryIsMutating,
} from '../../infrastructure/redux/country.selectors';
import { useCountryRepository } from './use-country-repository';

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
