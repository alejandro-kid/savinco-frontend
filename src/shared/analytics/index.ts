/**
 * Analytics and Error Tracking utilities
 *
 * This module provides:
 * - ErrorBoundary: Global error boundary that captures errors to PostHog
 * - useAnalytics: Hook for capturing events and tracking pageviews
 * - TrackedPage: Component wrapper for automatic pageview tracking
 */

export { ErrorBoundary } from './ErrorBoundary';
export { TrackedPage } from './TrackedPage';
export { useAnalytics } from './use-analytics';
