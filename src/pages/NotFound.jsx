import { Link } from 'react-router-dom';
import { ShieldAlert, HomeIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="text-center glass-panel p-12 rounded-3xl animate-pulse shadow-lg">
        <ShieldAlert className="w-20 h-20 text-rose-500 mx-auto mb-6" />
        <h1 className="text-6xl font-black text-slate-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-600 mb-6">Page Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Oops! The tool or page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <HomeIcon className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
