import { useMemo } from 'react';
import type { CountryRepository } from '../../domain';
import { countryRepository } from '../../infrastructure/repository/country.repository';

export const useCountryRepository = (): CountryRepository => {
  return useMemo(() => countryRepository, []);
};
