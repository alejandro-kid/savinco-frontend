import posthog from 'posthog-js';
import React, { Component, type ReactNode } from 'react';
import { ErrorMessage } from '../ui/components/ErrorMessage';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary that automatically captures errors to PostHog
 * and displays a fallback UI when an error occurs.
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Try to capture error to PostHog if available
    try {
      if (posthog && typeof posthog.captureException === 'function') {
        posthog.captureException(error, {
          componentStack: errorInfo.componentStack,
          errorBoundary: true,
        });
      }
    } catch {
      // PostHog might not be initialized yet, that's okay
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-md">
            <ErrorMessage>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Algo salió mal</h2>
                <p className="text-sm text-gray-600">
                  Ha ocurrido un error inesperado. Por favor, recarga la página o intenta más tarde.
                </p>
                {this.state.error && import.meta.env.DEV && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700">
                      Detalles del error (solo en desarrollo)
                    </summary>
                    <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs">
                      {this.state.error.toString()}
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
                <button
                  type="button"
                  onClick={() => {
                    this.setState({ hasError: false, error: null });
                    window.location.reload();
                  }}
                  className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Recargar página
                </button>
              </div>
            </ErrorMessage>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Wrapper component that provides PostHog context to ErrorBoundary
 */
export const ErrorBoundary = ({ children, fallback, onError }: ErrorBoundaryProps) => {
  return (
    <ErrorBoundaryClass fallback={fallback} onError={onError}>
      {children}
    </ErrorBoundaryClass>
  );
};
