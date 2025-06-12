import { cn } from "../../lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fallback?: string;
}

export function Avatar({ 
  src, 
  alt = "User Avatar", 
  size = 'md', 
  className,
  fallback
}: AvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-lg'
  };

  return (
    <div className={cn(
      "relative inline-flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-full",
      sizeClasses[size],
      className
    )}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-cover" 
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <span className="font-medium text-gray-700 dark:text-gray-200">
          {fallback ? getInitials(fallback) : '?'}
        </span>
      )}
    </div>
  );
}
