import { useMemo } from 'react';
import { useGetAllCountries } from '../../modules/country/presentation/hooks/use-get-all-countries';
import { useGetAllCurrencies } from '../../modules/currency/presentation/hooks/use-get-all-currencies';
import type { DashboardEntity } from '../../modules/financial-data/presentation/components/DashboardLayout';
import { useGetAllFinancialData } from '../../modules/financial-data/presentation/hooks/use-get-all-financial-data';
import { getAllEntities } from './entities-config';

/**
 * Hook para obtener todas las entidades del dashboard con badges actualizados
 *
 * Este hook se encarga de:
 * - Obtener la configuración de todas las entidades
 * - Actualizar los badges dinámicamente basándose en los datos reales
 * - Retornar el formato esperado por DashboardLayout
 */
export const useDashboardEntities = (): Array<DashboardEntity> => {
  // Obtener datos de todas las entidades para los badges
  const { items: financialDataItems } = useGetAllFinancialData();
  const { items: currencyItems } = useGetAllCurrencies();
  const { items: countryItems } = useGetAllCountries();

  return useMemo(() => {
    const entitiesConfig = getAllEntities();

    return entitiesConfig.map((config) => {
      // Calcular badge basado en el ID de la entidad
      let badge: number | undefined;
      if (config.id === 'financial-data') {
        badge = financialDataItems.length;
      } else if (config.id === 'currency') {
        badge = currencyItems.length;
      } else if (config.id === 'country') {
        badge = countryItems.length;
      }

      return {
        id: config.id,
        label: config.label,
        icon: config.icon,
        path: config.basePath,
        badge,
      };
    });
  }, [financialDataItems.length, currencyItems.length, countryItems.length]);
};
