import { useCallback } from 'react';
import { useAnalytics } from './use-analytics';

export interface TrackedOperationOptions {
  /**
   * Entity name (e.g., 'financial_data', 'currency', 'country')
   */
  entityName: string;
  /**
   * Section where the operation occurs (e.g., 'financial-data-list', 'currency-form')
   */
  section: string;
  /**
   * Additional properties to include in all events
   */
  baseProperties?: Record<string, unknown>;
}

/**
 * Hook for tracking CRUD operations with consistent event naming
 * Automatically captures submitted, succeeded, and failed events
 *
 * @example
 * ```tsx
 * const trackedCreate = useTrackedOperation({
 *   entityName: 'financial_data',
 *   section: 'financial-data-list',
 * });
 *
 * const handleCreate = async (value) => {
 *   await trackedCreate.execute('create', async () => {
 *     return await createUseCase(value);
 *   }, { countryCode: value.countryCode });
 * };
 * ```
 */
export const useTrackedOperation = (options: TrackedOperationOptions) => {
  const { capture } = useAnalytics();
  const { entityName, section, baseProperties = {} } = options;

  /**
   * Execute an operation with automatic event tracking
   */
  const execute = useCallback(
    async <T>(
      operation: 'create' | 'update' | 'delete',
      fn: () => Promise<T>,
      operationProperties?: Record<string, unknown>
    ): Promise<T> => {
      const eventPrefix = `${entityName}_${operation}`;
      const allProperties = {
        ...baseProperties,
        ...operationProperties,
        section,
      };

      try {
        // Capture submitted event
        capture(`${eventPrefix}_submitted`, allProperties);

        // Execute the operation
        const result = await fn();

        // Capture succeeded event
        capture(`${eventPrefix}_succeeded`, allProperties);

        return result;
      } catch (error) {
        // Capture failed event
        capture(`${eventPrefix}_failed`, {
          ...allProperties,
          error: error instanceof Error ? error.message : 'Unknown error',
        });

        // Re-throw the error so it can be handled by the caller
        throw error;
      }
    },
    [capture, entityName, section, baseProperties]
  );

  /**
   * Track a click/action that opens a modal or triggers an action
   */
  const trackClick = useCallback(
    (action: string, properties?: Record<string, unknown>) => {
      capture(`${entityName}_${action}_clicked`, {
        ...baseProperties,
        ...properties,
        section,
      });
    },
    [capture, entityName, section, baseProperties]
  );

  /**
   * Track when a modal is opened
   */
  const trackModalOpened = useCallback(
    (modalType: string, properties?: Record<string, unknown>) => {
      capture(`${entityName}_${modalType}_modal_opened`, {
        ...baseProperties,
        ...properties,
        section,
      });
    },
    [capture, entityName, section, baseProperties]
  );

  /**
   * Track when an action is confirmed
   */
  const trackConfirmed = useCallback(
    (action: string, properties?: Record<string, unknown>) => {
      capture(`${entityName}_${action}_confirmed`, {
        ...baseProperties,
        ...properties,
        section,
      });
    },
    [capture, entityName, section, baseProperties]
  );

  return {
    execute,
    trackClick,
    trackModalOpened,
    trackConfirmed,
  };
};
