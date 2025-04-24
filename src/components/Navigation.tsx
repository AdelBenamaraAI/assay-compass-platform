
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navigation: React.FC = () => {
  return (
    <header className="bg-white border-b border-science-gray">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-science-purple to-science-teal flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M11.983 1.907a.75.75 0 0 0-1.292-.657l-8.5 9.5A.75.75 0 0 0 2.75 12h6.572l-1.305 6.093a.75.75 0 0 0 1.292.657l8.5-9.5A.75.75 0 0 0 17.25 8h-6.572l1.305-6.093Z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-science-blue ml-2">AssayCompass</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-gray-700 hover:text-primary">Home</Link>
          <Link to="/catalog" className="font-medium text-gray-700 hover:text-primary">Assay Catalog</Link>
          <Link to="#" className="font-medium text-gray-700 hover:text-primary">Resources</Link>
          <Link to="#" className="font-medium text-gray-700 hover:text-primary">About</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" className="hidden md:flex">
            <Link to="#">Sign In</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="#">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
