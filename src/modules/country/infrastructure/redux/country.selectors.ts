import type { RootState } from '../../../../shared/redux/store';
import type { Country } from '../../domain/types';

export const selectAllCountries = (state: RootState): Array<Country> => state.country.items;
export const selectCountryByCode =
  (code: string) =>
  (state: RootState): Country | undefined =>
    state.country.items.find((country) => country.code === code);
export const selectCountryIsLoading = (state: RootState): boolean => state.country.isLoading;
export const selectCountryIsMutating = (state: RootState): boolean => state.country.isMutating;
export const selectCountryError = (state: RootState): string | null => state.country.error;
