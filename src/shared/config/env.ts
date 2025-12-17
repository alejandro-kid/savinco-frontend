/**
 * Centralized environment configuration
 *
 * All environment variables used in the application should be defined here.
 * This ensures a single source of truth for configuration values.
 */

/**
 * Runtime environment variables injected by Docker entrypoint script
 * This allows configuration without rebuilding the image
 */
declare global {
  interface Window {
    __ENV__?: Record<string, string>;
  }
}

/**
 * Get environment variable from runtime (window.__ENV__) or build-time (import.meta.env)
 * Runtime values take precedence over build-time values for security
 */
const getEnv = (key: string, defaultValue?: string): string => {
  // First, try to get from runtime environment (injected by Docker entrypoint)
  if (typeof window !== 'undefined' && window.__ENV__?.[key]) {
    return window.__ENV__[key];
  }

  // Fallback to build-time environment variable
  const value = import.meta.env[key];
  if (value === undefined || value === '') {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

/**
 * Get environment variable as number with optional default value
 */
const getEnvNumber = (key: string, defaultValue?: number): number => {
  const value = getEnv(key, defaultValue?.toString());
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not a valid number`);
  }
  return parsed;
};

/**
 * Get environment variable as boolean
 * Exported for use in feature flags and other boolean configurations
 */
export const getEnvBoolean = (key: string, defaultValue = false): boolean => {
  const value = getEnv(key, defaultValue.toString());
  return value === 'true' || value === '1';
};

/**
 * API Configuration
 * Using getters for lazy evaluation to ensure window.__ENV__ is available when accessed
 */
export const API_CONFIG = {
  /**
   * Base URL for the API backend
   * Default: http://localhost:8080/api/v1
   * Can be overridden with PUBLIC_API_BASE_URL environment variable
   * Note: If PUBLIC_API_BASE_URL doesn't end with /api/v1, it will be appended
   */
  get BASE_URL(): string {
    const url = getEnv('PUBLIC_API_BASE_URL', 'http://localhost:8080');
    // Ensure URL doesn't end with slash
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    // Append /api/v1 if not already present
    return cleanUrl.endsWith('/api/v1') ? cleanUrl : `${cleanUrl}/api/v1`;
  },

  /**
   * API timeout in milliseconds
   * Default: 30000 (30 seconds)
   * Can be overridden with PUBLIC_API_TIMEOUT environment variable
   */
  get TIMEOUT(): number {
    return getEnvNumber('PUBLIC_API_TIMEOUT', 30000);
  },
} as const;

/**
 * Application Configuration
 * Using getters for lazy evaluation to ensure window.__ENV__ is available when accessed
 */
export const APP_CONFIG = {
  /**
   * Application name
   */
  get NAME(): string {
    return getEnv('PUBLIC_APP_NAME', 'Savinco Frontend');
  },

  /**
   * Application version
   */
  get VERSION(): string {
    return getEnv('PUBLIC_APP_VERSION', '1.0.0');
  },

  /**
   * Whether the application is running in development mode
   */
  get IS_DEV(): boolean {
    return import.meta.env.DEV;
  },

  /**
   * Whether the application is running in production mode
   */
  get IS_PROD(): boolean {
    return import.meta.env.PROD;
  },
} as const;

/**
 * Feature Flags (if needed in the future)
 */
export const FEATURE_FLAGS = {
  // Example: ENABLE_ANALYTICS: getEnvBoolean('PUBLIC_ENABLE_ANALYTICS', false),
} as const;

/**
 * PostHog Configuration
 * Used by PostHogProvider in the application root
 *
 * Note: If PostHog variables are not set, analytics will be disabled gracefully
 * Using getters for lazy evaluation to ensure window.__ENV__ is available when accessed
 */
export const POSTHOG_CONFIG = {
  get apiKey(): string {
    return getEnv('PUBLIC_POSTHOG_KEY', '');
  },
  get options() {
    return {
      api_host: getEnv('PUBLIC_POSTHOG_HOST', 'https://app.posthog.com'),
      defaults: '2025-05-24',
      capture_exceptions: true, // Enables exception capture via Error Tracking
      debug: APP_CONFIG.IS_DEV,
    };
  },
  /**
   * Whether PostHog is properly configured
   * If false, analytics features will be disabled
   */
  get isEnabled(): boolean {
    return Boolean(getEnv('PUBLIC_POSTHOG_KEY', '') && getEnv('PUBLIC_POSTHOG_HOST', ''));
  },
} as const;

/**
 * Export all configuration as a single object for convenience
 */
export const ENV = {
  API: API_CONFIG,
  APP: APP_CONFIG,
  FEATURES: FEATURE_FLAGS,
  POSTHOG: POSTHOG_CONFIG,
} as const;
