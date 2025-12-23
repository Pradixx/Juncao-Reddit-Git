import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-gray-700 dark:text-gray-200 font-medium">{label}</label>}
      <input
        className={clsx(
          'border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200',
          className
        )}
        {...props}
      />
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
}
