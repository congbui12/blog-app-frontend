import { GlobeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto w-full bg-white border-t border-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand / Logo Section */}
        <div className="flex items-center gap-2">
          <GlobeIcon className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl tracking-tight text-gray-900">Blog This</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-gray-500">
          <Link to="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
        </nav>

        {/* Copyright Section */}
        <div className="text-sm text-gray-400 font-medium">
          @ {currentYear} <span className="text-gray-700 font-semibold">Blog This. </span>
          <span className="hidden sm:inline">All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
