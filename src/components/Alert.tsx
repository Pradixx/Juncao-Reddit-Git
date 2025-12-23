import clsx from 'clsx';

interface AlertProps {
  type?: 'success' | 'error' | 'info';
  message: string;
  className?: string;
}

export default function Alert({ type = 'info', message, className }: AlertProps) {
  const bgColor = clsx({
    'bg-green-100 text-green-800': type === 'success',
    'bg-red-100 text-red-800': type === 'error',
    'bg-blue-100 text-blue-800': type === 'info',
  });

  return (
    <div className={`${bgColor} p-3 rounded-md border ${className}`}>
      {message}
    </div>
  );
}
