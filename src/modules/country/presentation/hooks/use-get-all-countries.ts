import { useCallback, useEffect, useRef } from 'react';
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
  const hasLoadedOnceRef = useRef(false);

  const load = useCallback(async (): Promise<Array<Country>> => {
    return getAllCountriesUseCase(repository);
  }, [repository]);

  const reload = useCallback(async (): Promise<Array<Country>> => {
    // Resetear el flag para permitir recarga manual
    hasLoadedOnceRef.current = false;
    return load();
  }, [load]);

  useEffect(() => {
    // Solo cargar una vez cuando el componente se monta y no hay items
    // Si el API devuelve un array vacío, no volver a intentar cargar automáticamente
    if (!hasLoadedOnceRef.current && items.length === 0 && !isLoading && !error) {
      hasLoadedOnceRef.current = true;
      void load();
    }
  }, [items.length, isLoading, error, load]);

  return {
    items,
    isLoading,
    error,
    reload,
  };
};
