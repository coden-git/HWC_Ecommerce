import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Breadcrumb, ProductCard, Button } from '../components';
import { fetchCartByUuid, getStoredCartUuid } from '../api/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    pages: 0
  });
  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  
  // Pagination state
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const productsPerPage = 6;
  
  const breadcrumbItems = useMemo(
    () => [
      { label: 'Home', to: '/' },
      { label: 'Products' },
    ],
    []
  );

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using the existing API endpoint with search and pagination params
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const params = new URLSearchParams();
      
      // Add search parameter if exists
      const currentSearch = searchParams.get('search');
      if (currentSearch && currentSearch.trim()) {
        params.append('search', currentSearch.trim());
      }
      
      // Add pagination parameters
      params.append('page', currentPage.toString());
      params.append('limit', productsPerPage.toString());
      
      const url = `${apiUrl}/products${params.toString() ? `?${params.toString()}` : ''}`;
      
      const response = await fetch(url, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        setProducts(data.data);
        // Update pagination info from server response
        if (data.pagination) {
          setPagination(data.pagination);
        }
      } else {
        throw new Error(data.message || 'Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Unable to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchParams, currentPage, productsPerPage]);

  // Fetch cart data
  const fetchCart = useCallback(async () => {
    try {
      const cartUuid = getStoredCartUuid();
      if (!cartUuid) {
        setCart(null);
        return;
      }

      setCartLoading(true);
      const cartData = await fetchCartByUuid(cartUuid);
      if (cartData?.success && cartData?.data) {
        setCart(cartData.data);
      } else {
        setCart(null);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCart(null);
    } finally {
      setCartLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [fetchProducts, fetchCart]);

  // Update search term when URL params change
  useEffect(() => {
    const urlSearchTerm = searchParams.get('search') || '';
    setSearchTerm(urlSearchTerm);
  }, [searchParams]);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [fetchCart]);

  // Get product quantity from cart
  const getProductQuantity = useCallback((productUuid) => {
    if (!cart || !cart.products) return 0;
    const cartItem = cart.products.find(item => item.productUuid === productUuid);
    return cartItem ? cartItem.quantity : 0;
  }, [cart]);

  // Remove client-side filtering since we're doing server-side search
  const displayedProducts = products;
  const totalResults = pagination.total;
  
  // Calculate total pages from server response
  const totalPages = pagination.pages;

  // Handle search
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (searchTerm.trim()) {
      newSearchParams.set('search', searchTerm.trim());
    } else {
      newSearchParams.delete('search');
    }
    
    // Reset to page 1 when searching
    newSearchParams.set('page', '1');
    
    setSearchParams(newSearchParams);
    // fetchProducts will be called automatically due to useEffect dependency
  }, [searchTerm, searchParams, setSearchParams]);

  // Handle pagination
  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', newPage.toString());
      setSearchParams(newSearchParams);
      // fetchProducts will be called automatically due to useEffect dependency
    }
  }, [totalPages, searchParams, setSearchParams]);

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('search');
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  // Generate pagination numbers
  const getPaginationNumbers = useMemo(() => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((item, index, arr) => arr.indexOf(item) === index);
  }, [currentPage, totalPages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb items={breadcrumbItems} preserveCartId />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} preserveCartId />
      
      {/* Header Section */}
      <section className="border-b border-green-200 bg-gradient-to-r from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our premium wellness products designed to support your health journey.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-lg mx-auto">
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                className="px-6 py-3"
              >
                Search
              </Button>
              {searchTerm && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleClearSearch}
                  className="px-4 py-3"
                >
                  Clear
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            {searchTerm ? (
              <>Showing {displayedProducts.length} of {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchTerm}"</>
            ) : (
              <>Showing {displayedProducts.length} of {totalResults} product{totalResults !== 1 ? 's' : ''}</>
            )}
          </div>
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center mb-8">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Unable to load products</h3>
            <p className="text-red-500 mb-4">{error}</p>
            <Button variant="primary" onClick={fetchProducts}>
              Try Again
            </Button>
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && displayedProducts.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchTerm ? 'No products found' : 'No products available'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `We couldn't find any products matching "${searchTerm}". Try a different search term.`
                : 'Check back soon for new products.'
              }
            </p>
            {searchTerm && (
              <Button variant="primary" onClick={handleClearSearch}>
                View All Products
              </Button>
            )}
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && displayedProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedProducts.map((product, index) => (
                <ProductCard
                  key={product.uuid || product.id}
                  product={product}
                  index={index}
                  initialQuantity={getProductQuantity(product.uuid || product.id)}
                  onQuantityChange={(newQuantity) => {
                    // Update local cart state when quantity changes
                    if (cart && cart.products) {
                      const updatedProducts = cart.products.map(item => 
                        item.productUuid === (product.uuid || product.id)
                          ? { ...item, quantity: newQuantity }
                          : item
                      );
                      
                      // If quantity is 0, remove the item
                      const filteredProducts = newQuantity > 0 
                        ? updatedProducts
                        : updatedProducts.filter(item => item.productUuid !== (product.uuid || product.id));
                      
                      setCart({ ...cart, products: filteredProducts });
                    }
                  }}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {getPaginationNumbers.map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
                    disabled={pageNum === '...'}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pageNum === currentPage
                        ? 'bg-green-600 text-white'
                        : pageNum === '...'
                        ? 'text-gray-400 cursor-default'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;