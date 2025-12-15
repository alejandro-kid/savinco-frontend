import type { ReactNode } from 'react';

export interface CardProps {
  title?: string;
  children: ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {title ? <h2 className="mb-3 text-lg font-semibold text-gray-800">{title}</h2> : null}
      {children}
    </section>
  );
};


