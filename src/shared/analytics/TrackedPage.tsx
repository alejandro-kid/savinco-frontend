import { type ReactNode, useEffect } from 'react';
import { useAnalytics } from './use-analytics';

interface TrackedPageProps {
  children: ReactNode;
  /**
   * Custom page name for analytics (defaults to current pathname)
   */
  pageName?: string;
  /**
   * Additional properties to include with the pageview event
   */
  properties?: Record<string, unknown>;
  /**
   * Whether to automatically track pageview on mount (default: true)
   */
  autoTrack?: boolean;
}

/**
 * Component wrapper that automatically tracks pageviews and provides analytics context
 * Use this to wrap your page components for automatic analytics tracking
 *
 * @example
 * ```tsx
 * export const HomePage = () => {
 *   return (
 *     <TrackedPage pageName="Home" properties={{ section: 'dashboard' }}>
 *       <div>Your page content</div>
 *     </TrackedPage>
 *   );
 * };
 * ```
 */
export const TrackedPage = ({
  children,
  pageName,
  properties,
  autoTrack = true,
}: TrackedPageProps) => {
  const { trackPageView, capture } = useAnalytics();

  useEffect(() => {
    if (autoTrack) {
      // Track pageview with custom name and properties
      if (pageName) {
        trackPageView(pageName);
        if (properties) {
          capture('page_viewed', {
            page_name: pageName,
            ...properties,
          });
        }
      } else {
        trackPageView();
      }
    }
  }, [autoTrack, pageName, properties, trackPageView, capture]);

  return <>{children}</>;
};
