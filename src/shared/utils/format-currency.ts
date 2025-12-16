/**
 * Formats a number as USD currency.
 * @param value - The numeric value to format
 * @param options - Optional formatting options
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export const formatCurrency = (
  value: number,
  options?: {
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
  }
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
  }).format(value);
};
