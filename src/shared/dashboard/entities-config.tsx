import type { ReactNode } from 'react';
import { FinancialDataListPage } from '../../modules/financial-data/presentation/pages/FinancialDataListPage';
import { CurrencyListPage } from '../../modules/currency/presentation/pages/CurrencyListPage';
import { CountryListPage } from '../../modules/country/presentation/pages/CountryListPage';
import type { DashboardEntityConfig } from './types';

/**
 * Configuración centralizada de todas las entidades del dashboard
 * 
 * Para agregar una nueva entidad:
 * 1. Crea el módulo siguiendo la estructura de financial-data
 * 2. Crea la página de lista (ej: MyEntityListPage)
 * 3. Agrega la configuración aquí con todos los datos necesarios
 * 4. El sistema automáticamente la mostrará en el sidebar y routing
 */
export const DASHBOARD_ENTITIES: Array<DashboardEntityConfig> = [
  {
    id: 'financial-data',
    label: 'Datos Financieros',
    basePath: '/dashboard/financial-data',
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    getBadge: () => {
      return 0; // Se actualizará dinámicamente
    },
    ListPageComponent: FinancialDataListPage,
    createPath: '/dashboard/financial-data/create',
    editPath: (id: string) => `/dashboard/financial-data/edit/${id}`,
  },
  {
    id: 'currency',
    label: 'Monedas',
    basePath: '/dashboard/currency',
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    getBadge: () => {
      return 0; // Se actualizará dinámicamente
    },
    ListPageComponent: CurrencyListPage,
  },
  {
    id: 'country',
    label: 'Países',
    basePath: '/dashboard/country',
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    getBadge: () => {
      return 0; // Se actualizará dinámicamente
    },
    ListPageComponent: CountryListPage,
  },
];

/**
 * Obtiene una entidad por su ID
 */
export const getEntityById = (id: string): DashboardEntityConfig | undefined => {
  return DASHBOARD_ENTITIES.find((entity) => entity.id === id);
};

/**
 * Obtiene una entidad por su ruta base
 */
export const getEntityByPath = (path: string): DashboardEntityConfig | undefined => {
  return DASHBOARD_ENTITIES.find((entity) => path.startsWith(entity.basePath));
};

/**
 * Obtiene todas las entidades para el sidebar
 * Esto se usa en DashboardLayout para mostrar la navegación
 */
export const getAllEntities = (): Array<DashboardEntityConfig> => {
  return DASHBOARD_ENTITIES;
};
