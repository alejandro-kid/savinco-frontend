import { usePostHog } from 'posthog-js/react';
import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook for PostHog analytics
 * Provides utilities to capture events and track pageviews automatically
 *
 * @example
 * ```tsx
 * const analytics = useAnalytics();
 *
 * // Capture a custom event
 * analytics.capture('button_clicked', { button_name: 'submit' });
 *
 * // Track a pageview manually
 * analytics.trackPageView('/custom-page');
 * ```
 */
export const useAnalytics = () => {
  const posthog = usePostHog();
  const location = useLocation();
  const previousPathRef = useRef<string | null>(null);

  /**
   * Capture a custom event with optional properties
   */
  const capture = useCallback(
    (eventName: string, properties?: Record<string, unknown>) => {
      if (!posthog) {
        if (import.meta.env.DEV) {
          console.warn('PostHog not initialized, event not captured:', eventName, properties);
        }
        return;
      }

      try {
        posthog.capture(eventName, {
          ...properties,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Error capturing event:', error);
        }
      }
    },
    [posthog]
  );

  /**
   * Track a pageview manually
   */
  const trackPageView = useCallback(
    (path?: string) => {
      if (!posthog) {
        return;
      }

      try {
        const pathToTrack = path || location.pathname;
        posthog.capture('$pageview', {
          $current_url: window.location.href,
          path: pathToTrack,
        });
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Error tracking pageview:', error);
        }
      }
    },
    [posthog, location.pathname]
  );

  /**
   * Capture an exception/error manually
   */
  const captureException = useCallback(
    (error: Error, properties?: Record<string, unknown>) => {
      if (!posthog) {
        if (import.meta.env.DEV) {
          console.warn('PostHog not initialized, exception not captured:', error);
        }
        return;
      }

      try {
        posthog.captureException(error, {
          ...properties,
          timestamp: new Date().toISOString(),
        });
      } catch (captureError) {
        if (import.meta.env.DEV) {
          console.error('Error capturing exception:', captureError);
        }
      }
    },
    [posthog]
  );

  /**
   * Automatically track pageviews on route changes
   */
  useEffect(() => {
    // Only track if path has changed
    if (previousPathRef.current !== location.pathname) {
      previousPathRef.current = location.pathname;
      trackPageView();
    }
  }, [location.pathname, trackPageView]);

  return {
    capture,
    trackPageView,
    captureException,
    posthog, // Expose posthog instance for advanced usage
  };
};
