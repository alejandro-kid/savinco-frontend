import { useMemo } from 'react';
import { countryRepository } from '../../infrastructure/repository/country.repository';
import type { CountryRepository } from '../../domain';

export const useCountryRepository = (): CountryRepository => {
  return useMemo(() => countryRepository, []);
};
