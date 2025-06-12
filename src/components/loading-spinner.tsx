import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export function LoadingSpinner({ size = 'medium', message = 'Loading...' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      <p className="mt-4 text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
}
