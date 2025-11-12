import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <nav className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-white hover:text-green-100 transition-colors duration-200"
            onClick={closeMenu}
          >
            <span className="text-2xl">🌿</span>
            <span>Wellness Co.</span>
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-100 hover:bg-green-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <ul className="hidden md:flex space-x-1">
            <li>
              <Link
                to="/"
                className="text-white hover:text-green-100 font-medium transition-all duration-200 px-4 py-2 rounded-lg hover:bg-green-500/20"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="text-white hover:text-green-100 font-medium transition-all duration-200 px-4 py-2 rounded-lg hover:bg-green-500/20"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-service"
                className="text-white hover:text-green-100 font-medium transition-all duration-200 px-4 py-2 rounded-lg hover:bg-green-500/20"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <ul className="space-y-2 bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-lg">
              <li>
                <Link
                  to="/"
                  className="block text-white hover:text-green-100 font-medium transition-all duration-200 px-4 py-2 rounded-lg hover:bg-green-500/20"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="block text-white hover:text-green-100 font-medium transition-all duration-200 px-4 py-2 rounded-lg hover:bg-green-500/20"
                  onClick={closeMenu}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="block text-white hover:text-green-100 font-medium transition-all duration-200 px-4 py-2 rounded-lg hover:bg-green-500/20"
                  onClick={closeMenu}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;