interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-800 dark:border-zinc-700 dark:border-t-zinc-100`}
        role="status"
        aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}