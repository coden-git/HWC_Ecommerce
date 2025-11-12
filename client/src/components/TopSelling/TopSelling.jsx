import React, { useState, useEffect, useCallback } from 'react';
import { ProductCard } from '../index';
import { fetchTopSellingProducts, fetchCartByUuid, getStoredCartUuid } from '../../api/api';

const TopSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartQuantities, setCartQuantities] = useState({});
  const [cartLoading, setCartLoading] = useState(false);

  const loadTopSellingProducts = useCallback(async () => {
    try {
      const response = await fetchTopSellingProducts({ limit: 8 });

      if (response?.success) {
        setProducts(response.data);
      } else {
        setError(response?.message || 'Failed to fetch products');
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Error fetching products';
      setError(message);
      console.error('Error fetching top selling products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCartQuantities = useCallback(async () => {
    const cartUuid = getStoredCartUuid();

    if (!cartUuid) {
      return;
    }

    try {
      setCartLoading(true);
      const response = await fetchCartByUuid(cartUuid);

      if (response?.success && Array.isArray(response.data?.products)) {
        const quantityMap = response.data.products.reduce((acc, item) => {
          acc[item.productUuid] = item.quantity;
          return acc;
        }, {});

        setCartQuantities(quantityMap);
      }
    } catch (err) {
      console.error('Error loading cart data:', err);
    } finally {
      setCartLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTopSellingProducts();
  }, [loadTopSellingProducts]);

  useEffect(() => {
    loadCartQuantities();
  }, [loadCartQuantities]);

  const handleQuantityChange = useCallback((productUuid, quantity) => {
    setCartQuantities((prev) => ({
      ...prev,
      [productUuid]: quantity,
    }));
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Top Selling
          </h2>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600">Loading products...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Top Selling
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 tracking-tight">
          Top Selling
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <ProductCard 
              key={product.uuid}
              product={product}
              index={index}
              initialQuantity={cartQuantities[product.uuid] || 0}
              onQuantityChange={(quantity) => handleQuantityChange(product.uuid, quantity)}
            />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg uppercase tracking-wide">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopSelling;