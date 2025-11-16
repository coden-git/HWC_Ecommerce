import { useState, useEffect, useCallback } from 'react';
import { getCartItemCount, getStoredCartUuid } from '../api/api';

// Custom hook for cart management
export const useCart = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCartCount = useCallback(async () => {
    setLoading(true);
    try {
      const count = await getCartItemCount();
      setCartItemCount(count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartItemCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshCart = useCallback(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    // Listen for URL changes (in case cart UUID changes)
    window.addEventListener('popstate', handleCartUpdate);
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Listen for storage changes
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('popstate', handleCartUpdate);
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, [fetchCartCount]);

  return {
    cartItemCount,
    loading,
    refreshCart,
    hasItems: cartItemCount > 0,
    cartUuid: getStoredCartUuid()
  };
};

// Utility function to trigger cart update event
export const triggerCartUpdate = () => {
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};