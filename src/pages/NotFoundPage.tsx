import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-4 py-16">
      <h1 className="text-7xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-8">Page Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        We couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 text-white font-medium bg-primary rounded-lg hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50"
      >
        Go Back Home
      </Link>
    </div>
  );
}
