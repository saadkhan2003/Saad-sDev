import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 w-full">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-4 text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
}
