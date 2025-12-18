import { useCallback } from 'react';
import { useAppSelector } from '../../../../shared/redux/store';
import { deleteCountryUseCase } from '../../application';
import {
  selectCountryError,
  selectCountryIsMutating,
} from '../../infrastructure/redux/country.selectors';
import { useCountryRepository } from './use-country-repository';

export const useDeleteCountry = () => {
  const repository = useCountryRepository();
  const isMutating = useAppSelector(selectCountryIsMutating);
  const error = useAppSelector(selectCountryError);

  const remove = useCallback(
    async (code: string): Promise<void> => {
      await deleteCountryUseCase(repository, code);
    },
    [repository]
  );

  return {
    remove,
    isMutating,
    error,
  };
};
