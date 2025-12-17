import { useMemo } from 'react';
import { getAllEntities } from './entities-config';
import { useGetAllFinancialData } from '../../modules/financial-data/presentation/hooks/use-get-all-financial-data';
import type { DashboardEntity } from '../../modules/financial-data/presentation/components/DashboardLayout';

/**
 * Hook para obtener todas las entidades del dashboard con badges actualizados
 * 
 * Este hook se encarga de:
 * - Obtener la configuración de todas las entidades
 * - Actualizar los badges dinámicamente basándose en los datos reales
 * - Retornar el formato esperado por DashboardLayout
 */
export const useDashboardEntities = (): Array<DashboardEntity> => {
  // Obtener datos de financial-data para el badge
  const { items: financialDataItems } = useGetAllFinancialData();

  return useMemo(() => {
    const entitiesConfig = getAllEntities();

    return entitiesConfig.map((config) => {
      // Calcular badge basado en el ID de la entidad
      let badge: number | undefined;
      if (config.id === 'financial-data') {
        badge = financialDataItems.length;
      }
      // Aquí puedes agregar más lógica para otras entidades:
      // else if (config.id === 'users') {
      //   badge = usersItems.length;
      // }

      return {
        id: config.id,
        label: config.label,
        icon: config.icon,
        path: config.basePath,
        badge,
      };
    });
  }, [financialDataItems.length]);
};
