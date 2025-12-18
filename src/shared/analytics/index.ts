/**
 * Analytics and Error Tracking utilities
 *
 * This module provides:
 * - ErrorBoundary: Global error boundary that captures errors to PostHog
 * - useAnalytics: Hook for capturing events and tracking pageviews
 * - TrackedPage: Component wrapper for automatic pageview tracking
 * - useTrackedOperation: Hook for tracking CRUD operations
 * - useTrackedForm: Hook for tracking form interactions
 * - useTrackedButton: Hook for tracking button clicks
 * - useTrackedFilter: Hook for tracking filter changes
 */

export { ErrorBoundary } from './ErrorBoundary';
export { TrackedPage } from './TrackedPage';
export { useAnalytics } from './use-analytics';
export type { TrackedButtonOptions } from './use-tracked-button';
export { useTrackedButton } from './use-tracked-button';
export type { TrackedFilterOptions } from './use-tracked-filter';
export { useTrackedFilter } from './use-tracked-filter';
export type { TrackedFormOptions } from './use-tracked-form';
export { useTrackedForm } from './use-tracked-form';
export type { TrackedOperationOptions } from './use-tracked-operation';
export { useTrackedOperation } from './use-tracked-operation';
