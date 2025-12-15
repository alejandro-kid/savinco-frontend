import type { ReactNode } from 'react';

export interface ErrorMessageProps {
  children: ReactNode;
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <div
      className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
      data-testid="error-message"
    >
      {children}
    </div>
  );
};
