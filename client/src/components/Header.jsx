import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-green-600 transition-colors duration-300"
            onClick={closeMenu}
          >
            <Logo className="h-12 w-auto" />
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <div className="w-6 h-6 relative">
              <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : '-translate-y-1.5 top-0'}`}></span>
              <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100 top-1/2 -translate-y-1/2'}`}></span>
              <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 top-1/2 -translate-y-1/2' : 'translate-y-1.5 bottom-0'}`}></span>
            </div>
          </button>

          <nav className="hidden md:flex items-center space-x-2">
            <Link to="/" className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 rounded-lg hover:bg-green-50">
              Home
            </Link>
            <Link to="/products" className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 rounded-lg hover:bg-green-50">
              Products
            </Link>
            <Link to="/top-selling" className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 rounded-lg hover:bg-green-50">
              Top Selling
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className={`transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <nav className="py-2">
            <Link to="/" className="block px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 rounded-lg hover:bg-green-50" onClick={closeMenu}>Home</Link>
            <Link to="/products" className="block px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 rounded-lg hover:bg-green-50" onClick={closeMenu}>Products</Link>
            <Link to="/top-selling" className="block px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 rounded-lg hover:bg-green-50" onClick={closeMenu}>Top Selling</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;