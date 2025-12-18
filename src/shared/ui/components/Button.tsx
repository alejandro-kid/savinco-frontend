import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60';

  const variantClasses =
    variant === 'secondary'
      ? 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
      : variant === 'danger'
        ? 'bg-red-600 text-white hover:bg-red-700'
        : 'bg-blue-600 text-white hover:bg-blue-700';

  return (
    <button {...props} className={`${baseClasses} ${variantClasses} ${props.className ?? ''}`}>
      {children}
    </button>
  );
};
