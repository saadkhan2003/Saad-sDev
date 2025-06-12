interface PostSkeletonProps {
  variant?: 'default' | 'featured' | 'compact';
}

export function PostSkeleton({ variant = 'default' }: PostSkeletonProps) {
  if (variant === 'featured') {
    return (
      <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow-lg animate-pulse">
        <div className="aspect-video bg-gray-300 dark:bg-gray-700" />
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-3">
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>
          <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded mb-3" />
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2" />
          <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
          <div className="h-4 w-4/6 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }
  
  if (variant === 'compact') {
    return (
      <div className="relative bg-white dark:bg-gray-900 p-4 rounded-lg shadow animate-pulse">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 text-xs mb-1">
              <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-3 w-3 bg-gray-300 dark:bg-gray-700 rounded-full" />
              <div className="h-3 w-12 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
            <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-1" />
            <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    );
  }
  
  // Default skeleton
  return (
    <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow animate-pulse">
      <div className="aspect-video bg-gray-300 dark:bg-gray-700" />
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-3">
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
        <div className="h-7 w-5/6 bg-gray-300 dark:bg-gray-700 rounded mb-3" />
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2" />
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-4" />
        <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}
