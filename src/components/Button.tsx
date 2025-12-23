import { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

export default function Button({ children, onClick, type = 'button', variant = 'primary', className }: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  const variantClasses = clsx({
    'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
    'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
    'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
  });

  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </button>
  );
}
