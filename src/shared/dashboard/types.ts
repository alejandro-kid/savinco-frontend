import type { ReactNode } from 'react';

/**
 * Configuración de una entidad del dashboard
 */
export interface DashboardEntityConfig<TItem = unknown, TCreateInput = unknown, TUpdateInput = unknown> {
  /** ID único de la entidad */
  id: string;
  /** Etiqueta mostrada en el sidebar */
  label: string;
  /** Icono SVG para el sidebar */
  icon?: ReactNode;
  /** Ruta base de la entidad (ej: '/dashboard/financial-data') */
  basePath: string;
  /** Función para obtener el badge (número de items) */
  getBadge?: () => number | Promise<number>;
  /** Componente de página de lista */
  ListPageComponent: React.ComponentType;
  /** Ruta de la página de creación (opcional, si no se usa modal) */
  createPath?: string;
  /** Ruta de la página de edición (opcional, si no se usa modal) */
  editPath?: (itemId: string) => string;
}

/**
 * Configuración de hooks para operaciones CRUD de una entidad
 */
export interface EntityCRUDHooks<TItem = unknown, TCreateInput = unknown, TUpdateInput = unknown> {
  /** Hook para obtener todos los items */
  useGetAll: () => {
    items: Array<TItem>;
    isLoading: boolean;
    error: string | null;
    reload: () => Promise<void>;
  };
  /** Hook para crear un item */
  useCreate?: () => {
    create: (input: TCreateInput) => Promise<void>;
    isMutating: boolean;
    error: string | null;
  };
  /** Hook para actualizar un item */
  useUpdate?: () => {
    update: (id: string, input: TUpdateInput) => Promise<void>;
    isMutating: boolean;
    error: string | null;
  };
  /** Hook para eliminar un item */
  useDelete?: () => {
    remove: (id: string) => Promise<void>;
    isMutating: boolean;
  };
  /** Hook para obtener un item por ID (para edición) */
  useGetById?: () => {
    load: (id: string) => Promise<TItem | null>;
    isLoading: boolean;
  };
}
