import { useCallback } from 'react';
import { useAnalytics } from './use-analytics';

export interface TrackedFormOptions {
  /**
   * Form name (e.g., 'financial_data_form', 'currency_form')
   */
  formName: string;
  /**
   * Section where the form is used (e.g., 'financial-data-form', 'currency-form')
   */
  section: string;
  /**
   * Whether this is an edit form (defaults to false)
   */
  isEdit?: boolean;
  /**
   * Additional properties to include in all events
   */
  baseProperties?: Record<string, unknown>;
}

/**
 * Hook for tracking form interactions with consistent event naming
 *
 * @example
 * ```tsx
 * const trackedForm = useTrackedForm({
 *   formName: 'financial_data_form',
 *   section: 'financial-data-form',
 *   isEdit: !!initialValue,
 * });
 *
 * const handleSubmit = async (value) => {
 *   await trackedForm.onSubmit(async () => {
 *     return await onSubmit(value);
 *   }, { countryCode: value.countryCode });
 * };
 *
 * const handleCancel = () => {
 *   trackedForm.onCancel();
 *   onCancel();
 * };
 * ```
 */
export const useTrackedForm = (options: TrackedFormOptions) => {
  const { capture } = useAnalytics();
  const { formName, section, isEdit = false, baseProperties = {} } = options;

  /**
   * Track form submission
   */
  const onSubmit = useCallback(
    async <T>(fn: () => Promise<T>, submitProperties?: Record<string, unknown>): Promise<T> => {
      const allProperties = {
        ...baseProperties,
        ...submitProperties,
        isEdit,
        section,
      };

      capture(`${formName}_submitted`, allProperties);

      try {
        const result = await fn();
        return result;
      } catch (error) {
        capture(`${formName}_submit_failed`, {
          ...allProperties,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        throw error;
      }
    },
    [capture, formName, section, isEdit, baseProperties]
  );

  /**
   * Track form cancellation
   */
  const onCancel = useCallback(
    (cancelProperties?: Record<string, unknown>) => {
      capture(`${formName}_cancelled`, {
        ...baseProperties,
        ...cancelProperties,
        isEdit,
        section,
      });
    },
    [capture, formName, section, isEdit, baseProperties]
  );

  /**
   * Track field changes (optional, for advanced tracking)
   */
  const onFieldChange = useCallback(
    (fieldName: string, value: unknown) => {
      capture(`${formName}_field_changed`, {
        ...baseProperties,
        fieldName,
        fieldValue: value,
        isEdit,
        section,
      });
    },
    [capture, formName, section, isEdit, baseProperties]
  );

  return {
    onSubmit,
    onCancel,
    onFieldChange,
  };
};
