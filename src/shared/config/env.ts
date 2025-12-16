/**
 * Centralized environment configuration
 *
 * All environment variables used in the application should be defined here.
 * This ensures a single source of truth for configuration values.
 */

/**
 * Get environment variable with optional default value
 */
const getEnv = (key: string, defaultValue?: string): string => {
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
 */
export const API_CONFIG = {
  /**
   * Base URL for the API backend
   * Default: http://localhost:8080/api/v1
   * Can be overridden with PUBLIC_API_BASE_URL environment variable
   */
  BASE_URL: getEnv('PUBLIC_API_BASE_URL', 'http://localhost:8080/api/v1'),

  /**
   * API timeout in milliseconds
   * Default: 30000 (30 seconds)
   * Can be overridden with PUBLIC_API_TIMEOUT environment variable
   */
  TIMEOUT: getEnvNumber('PUBLIC_API_TIMEOUT', 30000),
} as const;

/**
 * Application Configuration
 */
export const APP_CONFIG = {
  /**
   * Application name
   */
  NAME: getEnv('PUBLIC_APP_NAME', 'Savinco Frontend'),

  /**
   * Application version
   */
  VERSION: getEnv('PUBLIC_APP_VERSION', '1.0.0'),

  /**
   * Whether the application is running in development mode
   */
  IS_DEV: import.meta.env.DEV,

  /**
   * Whether the application is running in production mode
   */
  IS_PROD: import.meta.env.PROD,
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
 */
export const POSTHOG_CONFIG = {
  apiKey: import.meta.env.PUBLIC_POSTHOG_KEY || '',
  options: {
    api_host: import.meta.env.PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    defaults: '2025-05-24',
    capture_exceptions: true, // Enables exception capture via Error Tracking
    debug: APP_CONFIG.IS_DEV,
  },
  /**
   * Whether PostHog is properly configured
   * If false, analytics features will be disabled
   */
  isEnabled: Boolean(
    import.meta.env.PUBLIC_POSTHOG_KEY && import.meta.env.PUBLIC_POSTHOG_HOST
  ),
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
