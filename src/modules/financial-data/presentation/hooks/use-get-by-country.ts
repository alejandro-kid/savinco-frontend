import { useCallback, useState } from 'react';
import { getByCountryUseCase } from '../../application';
import type { CountryCode, FinancialData } from '../../domain/types';
import { useFinancialDataRepository } from './use-financial-data-repository';

export const useGetByCountry = () => {
  const repository = useFinancialDataRepository();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (countryCode: CountryCode): Promise<FinancialData | null> => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await getByCountryUseCase(repository, countryCode);
        setIsLoading(false);
        return result;
      } catch (err) {
        setIsLoading(false);
        setError('No se pudieron cargar los datos');
        throw err;
      }
    },
    [repository]
  );

  return {
    load,
    isLoading,
    error,
  };
};
