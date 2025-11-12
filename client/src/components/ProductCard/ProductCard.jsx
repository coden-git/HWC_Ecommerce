import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { addProductToCart } from '../../api/api';

const ProductCard = ({ product, index, initialQuantity = 0, onQuantityChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(initialQuantity);
  const [feedback, setFeedback] = useState(null);
  const feedbackTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setCartQuantity(initialQuantity);
  }, [initialQuantity]);

  const setFeedbackMessage = useCallback((type, message) => {
    setFeedback({ type, message });

    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }

    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback(null);
    }, 2500);
  }, []);
  
  const formatPrice = (price) => {
    return `₹${price.toFixed(2)}`;
  };

  const handleProductClick = () => {
    const cartId = new URLSearchParams(location.search || '').get('cartId');
    const productIdentifier = product.uri || product.uuid;

    if (cartId) {
      navigate({
        pathname: `/products/${productIdentifier}`,
        search: `?cartId=${encodeURIComponent(cartId)}`,
      });
    } else {
      navigate(`/products/${productIdentifier}`);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-sm">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-sm relative">
          <span className="absolute inset-0 overflow-hidden w-1/2">★</span>
          <span className="text-gray-300">★</span>
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-sm">
          ★
        </span>
      );
    }

    return stars;
  };

  const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    if (!discountedPrice || discountedPrice >= originalPrice) return 0;
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  const discountPercentage = calculateDiscountPercentage(product.price, product.discountedPrice);
  const finalPrice = product.discountedPrice || product.price;

  const performCartUpdate = useCallback(
    async ({ event, nextQuantity, successMessage }) => {
      event.stopPropagation();

      if (isUpdatingCart) return;

      try {
        setIsUpdatingCart(true);
        const response = await addProductToCart({
          productId: product.uuid || product.id,
          quantity: nextQuantity,
        });

        const updatedQuantity = response?.data?.cart?.products?.find(
          (item) => item.productUuid === (product.uuid || product.id)
        )?.quantity ?? response?.data?.addedProduct?.quantity ?? nextQuantity;
        setCartQuantity(updatedQuantity);
        if (onQuantityChange) {
          onQuantityChange(updatedQuantity);
        }
        setFeedbackMessage('success', successMessage);
      } catch (error) {
        console.error('Error updating cart quantity:', error);
        const errorMessage =
          error?.response?.data?.message || 'Failed to update cart. Please try again.';
        setFeedbackMessage('error', errorMessage);
      } finally {
        setIsUpdatingCart(false);
      }
    },
    [isUpdatingCart, onQuantityChange, product, setFeedbackMessage]
  );

  const handleAddToCart = useCallback(
    (event) => {
      performCartUpdate({
        event,
        nextQuantity: 1,
        successMessage: 'Added to cart',
      });
    },
    [performCartUpdate]
  );

  const handleIncreaseQuantity = useCallback(
    (event) => {
      const nextQuantity = cartQuantity + 1;
      performCartUpdate({
        event,
        nextQuantity,
        successMessage: 'Updated quantity',
      });
    },
    [cartQuantity, performCartUpdate]
  );

  const handleDecreaseQuantity = useCallback(
    (event) => {
      if (cartQuantity <= 1) {
        event.stopPropagation();
        return;
      }

      const nextQuantity = Math.max(1, cartQuantity - 1);
      performCartUpdate({
        event,
        nextQuantity,
        successMessage: 'Updated quantity',
      });
    },
    [cartQuantity, performCartUpdate]
  );

  return (
    <div 
      key={product.uuid} 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group animate-fade-in-up cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={handleProductClick}
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-video">
        <img 
          src={product.primaryImage} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg';
          }}
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold z-10">
            {discountPercentage}% OFF
          </div>
        )}
        
        {/* Highlight Badge */}
        {product.highlighterText && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold max-w-24 text-center line-clamp-2 z-10">
            {product.highlighterText}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>
        
        {/* Pricing */}
        <div className="mb-2">
          {product.discountedPrice ? (
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600">
                {formatPrice(product.discountedPrice)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.userRating && (
          <div className="mb-2">
            <div className="flex items-center mb-1">
              <div className="text-sm">{renderStars(product.userRating)}</div>
              <span className="ml-1 text-xs text-gray-500">({product.userRating.toFixed(1)})</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {feedback && (
          <div
            className={`text-xs font-medium mb-2 ${
              feedback.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {feedback.message}
          </div>
        )}

        {cartQuantity > 0 ? (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg mb-2">
            <button
              type="button"
              className="px-3 py-2 text-blue-700 hover:bg-blue-100 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleDecreaseQuantity}
              disabled={isUpdatingCart || cartQuantity <= 1}
            >
              −
            </button>
            <span className="px-4 py-2 text-sm font-semibold text-blue-700">
              {isUpdatingCart ? 'Updating…' : `Qty: ${cartQuantity}`}
            </span>
            <button
              type="button"
              className="px-3 py-2 text-blue-700 hover:bg-blue-100 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleIncreaseQuantity}
              disabled={isUpdatingCart}
            >
              +
            </button>
          </div>
        ) : (
          <button 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg uppercase tracking-wide text-sm mb-2 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleAddToCart}
            disabled={isUpdatingCart}
          >
            {isUpdatingCart ? 'Adding…' : 'Add to Cart'}
          </button>
        )}

        {/* Purchase Count */}
        {product.numberOfPurchases > 0 && (
          <div className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full text-center">
            {product.numberOfPurchases} bought
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;