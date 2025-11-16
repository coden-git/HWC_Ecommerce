import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useCart } from '../hooks/useCart';
import { preserveCartId, navigateWithScroll } from '../utils/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemCount, cartUuid } = useCart();
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Generate cart URL with cartId parameter
  const getCartUrl = useCallback(() => {
    return preserveCartId('/cart', cartUuid);
  }, [cartUuid]);

  // Generate navigation URLs with cartId parameter
  const getNavUrl = useCallback((path) => {
    return preserveCartId(path, cartUuid);
  }, [cartUuid]);

  // Handle navigation with scroll to top
  const handleNavigation = useCallback((path) => {
    closeMenu();
    navigateWithScroll(navigate, path, cartUuid);
  }, [navigate, cartUuid, closeMenu]);

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
          <button
            onClick={() => handleNavigation('/')}
            className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-green-600 transition-colors duration-300"
          >
            <Logo className="h-13 w-auto" />
          </button>

          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <button onClick={() => handleNavigation('/')} className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 rounded-lg hover:bg-green-50">
                Home
              </button>
              <button onClick={() => handleNavigation('/products')} className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 rounded-lg hover:bg-green-50">
                Products
              </button>
              {/* <button onClick={() => handleNavigation('/top-selling')} className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 rounded-lg hover:bg-green-50">
                Top Selling
              </button> */}
            </nav>

            {/* Cart Icon */}
            <button
              onClick={() => handleNavigation('/cart')}
              className="relative p-2 text-gray-700 hover:text-green-600 transition-colors duration-300 rounded-lg hover:bg-green-50"
              aria-label="Shopping cart"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v4a2 2 0 002 2h8a2 2 0 002-2v-4m-8 6h.01M15 19h.01"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
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
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <nav className="py-2">
            <button onClick={() => handleNavigation('/')} className="block w-full text-left px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 rounded-lg hover:bg-green-50">Home</button>
            <button onClick={() => handleNavigation('/products')} className="block w-full text-left px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 rounded-lg hover:bg-green-50">Products</button>
            {/* <button onClick={() => handleNavigation('/top-selling')} className="block w-full text-left px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 rounded-lg hover:bg-green-50">Top Selling</button> */}
            <button onClick={() => handleNavigation('/cart')} className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 rounded-lg hover:bg-green-50">
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;