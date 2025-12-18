import { useCallback } from 'react';
import { useAnalytics } from './use-analytics';

export interface TrackedButtonOptions {
  /**
   * Button action name (e.g., 'edit', 'delete', 'create', 'navigate')
   */
  actionName: string;
  /**
   * Section where the button is used (e.g., 'financial-data-card', 'home-page')
   */
  section: string;
  /**
   * Additional properties to include in the event
   */
  baseProperties?: Record<string, unknown>;
}

/**
 * Hook for tracking button clicks with consistent event naming
 *
 * @example
 * ```tsx
 * const trackedButton = useTrackedButton({
 *   actionName: 'edit',
 *   section: 'financial-data-card',
 * });
 *
 * <Button onClick={trackedButton.onClick(() => onEdit(item.id), {
 *   countryCode: item.countryCode
 * })}>
 *   Editar
 * </Button>
 * ```
 */
export const useTrackedButton = (options: TrackedButtonOptions) => {
  const { capture } = useAnalytics();
  const { actionName, section, baseProperties = {} } = options;

  /**
   * Create a click handler that tracks the event
   */
  const onClick = useCallback(
    (handler: () => void, clickProperties?: Record<string, unknown>) => {
      return () => {
        capture(`${actionName}_clicked`, {
          ...baseProperties,
          ...clickProperties,
          section,
        });
        handler();
      };
    },
    [capture, actionName, section, baseProperties]
  );

  return {
    onClick,
  };
};
