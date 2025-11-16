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
      if (cartQuantity <= 0) {
        event.stopPropagation();
        return;
      }

      const nextQuantity = Math.max(0, cartQuantity - 1);
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
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group animate-fade-in-up cursor-pointer"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={handleProductClick}
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-wellness-100 aspect-w-16 aspect-h-9">
        <img 
          src={product.primaryImage} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg';
          }}
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold z-10 shadow-md">
            {discountPercentage}% OFF
          </div>
        )}
        
        {/* Highlight Badge */}
        {product.highlighterText && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold max-w-24 text-center shadow-md line-clamp-2 z-10">
            {product.highlighterText}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-md font-bold text-wellness-800 mb-2 line-clamp-2 min-h-[2.8rem]">
          {product.title}
        </h3>
        
        {/* Pricing */}
        <div className="mb-3">
          {product.discountedPrice ? (
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-extrabold text-wellness-600">
                {formatPrice(product.discountedPrice)}
              </span>
              <span className="text-sm text-wellness-300 line-through">
                {formatPrice(product.price)}
              </span>
            </div>
          ) : (
            <span className="text-xl font-extrabold text-wellness-700">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.userRating && (
          <div className="mb-3">
            <div className="flex items-center">
              <div className="text-sm">{renderStars(product.userRating)}</div>
              <span className="ml-2 text-xs text-wellness-400">({product.userRating.toFixed(1)})</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {feedback && (
          <div
            className={`text-xs font-semibold mb-2 transition-opacity duration-300 ${
              feedback.type === 'success' ? 'text-wellness-600' : 'text-red-600'
            }`}
          >
            {feedback.message}
          </div>
        )}

        {cartQuantity > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center bg-green-50 border border-green-600 rounded-lg mb-2 transition-all duration-300 h-12">
              <button
                type="button"
                className="px-4 py-3 text-green-600 hover:bg-green-100 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 font-bold text-sm"
                onClick={handleDecreaseQuantity}
                disabled={isUpdatingCart || cartQuantity <= 0}
              >
                −
              </button>
              <div className="flex-1 flex items-center justify-center py-3 px-4 text-sm font-bold text-green-600">
                {isUpdatingCart ? 'Updating…' : `Qty: ${cartQuantity}`}
              </div>
              <button
                type="button"
                className="px-4 py-3 text-green-600 hover:bg-green-100 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 font-bold text-sm"
                onClick={handleIncreaseQuantity}
                disabled={isUpdatingCart}
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <button 
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-sm mb-2 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleAddToCart}
            disabled={isUpdatingCart}
          >
            {isUpdatingCart ? 'Adding…' : 'Add to Cart'}
          </button>
        )}

        {/* Purchase Count */}
        {product.numberOfPurchases > 0 && (
          <div className="bg-wellness-100 text-wellness-800 text-xs font-semibold px-2.5 py-1 rounded-full text-center mt-2">
            {product.numberOfPurchases} bought in last 24 hours
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
