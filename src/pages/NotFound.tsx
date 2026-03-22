import { Link } from 'react-router-dom';
import { TriangleAlertIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <main className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:shadow-xl">
        <div className="bg-orange-50 p-4 rounded-full mb-4">
          <TriangleAlertIcon className="w-12 h-12 text-yellow-500" />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Page Not Found</h2>

        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for has vanished into thin air or never existed.
        </p>

        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          prefetch="intent"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
