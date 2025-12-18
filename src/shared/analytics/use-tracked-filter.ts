import { useCallback } from 'react';
import { useAnalytics } from './use-analytics';

export interface TrackedFilterOptions {
  /**
   * Filter name (e.g., 'country_filter', 'date_filter')
   */
  filterName: string;
  /**
   * Section where the filter is used (e.g., 'home-page', 'dashboard')
   */
  section: string;
}

/**
 * Hook for tracking filter changes with consistent event naming
 *
 * @example
 * ```tsx
 * const trackedFilter = useTrackedFilter({
 *   filterName: 'country_filter',
 *   section: 'home-page',
 * });
 *
 * <Select
 *   value={filter}
 *   onChange={(e) => {
 *     trackedFilter.onChange(e.target.value, filter, setFilter);
 *   }}
 * />
 * ```
 */
export const useTrackedFilter = (options: TrackedFilterOptions) => {
  const { capture } = useAnalytics();
  const { filterName, section } = options;

  /**
   * Track filter change
   */
  const onChange = useCallback(
    <T>(
      newValue: T,
      previousValue: T,
      setValue: (value: T) => void,
      additionalProperties?: Record<string, unknown>
    ) => {
      capture(`${filterName}_changed`, {
        previousFilter: previousValue,
        newFilter: newValue,
        ...additionalProperties,
        section,
      });
      setValue(newValue);
    },
    [capture, filterName, section]
  );

  return {
    onChange,
  };
};
