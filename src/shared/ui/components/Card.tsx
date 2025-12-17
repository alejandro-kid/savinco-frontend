import type { ReactNode } from 'react';

export interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Card = ({ title, children, className = '' }: CardProps) => {
  const baseClasses = 'rounded-lg border border-gray-200 bg-white p-4 shadow-sm';
  const mergedClasses = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <section className={mergedClasses}>
      {title ? <h2 className="mb-3 text-lg font-semibold text-gray-800">{title}</h2> : null}
      {children}
    </section>
  );
};
