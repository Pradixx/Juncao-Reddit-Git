import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={clsx('bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition hover:shadow-lg', className)}>
      {children}
    </div>
  );
}
