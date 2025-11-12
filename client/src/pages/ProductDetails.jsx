import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addProductToCart, fetchCartByUuid, getStoredCartUuid } from '../api/api';
import { Breadcrumb } from '../components';

const ProductDetails = () => {
  const { identifier } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  const [isSyncingQuantity, setIsSyncingQuantity] = useState(false);
  const [addToCartFeedback, setAddToCartFeedback] = useState(null);
  const addToCartFeedbackTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (addToCartFeedbackTimeoutRef.current) {
        clearTimeout(addToCartFeedbackTimeoutRef.current);
      }
    };
  }, []);

  const setAddToCartFeedbackMessage = useCallback((type, message) => {
    setAddToCartFeedback({ type, message });

    if (addToCartFeedbackTimeoutRef.current) {
      clearTimeout(addToCartFeedbackTimeoutRef.current);
    }

    addToCartFeedbackTimeoutRef.current = setTimeout(() => {
      setAddToCartFeedback(null);
    }, 3000);
  }, []);

  useEffect(() => {
    fetchProductDetails();
  }, [identifier]);

  useEffect(() => {
    const cartUuid = getStoredCartUuid();

    if (!product || !cartUuid) {
      return;
    }

    const productIdentifier = product.uuid || product.id;

    if (!productIdentifier) {
      return;
    }

    let isMounted = true;

    const syncQuantityFromCart = async () => {
      try {
        const response = await fetchCartByUuid(cartUuid);

        if (!isMounted) return;

        const cartProducts = response?.data?.products;

        if (!Array.isArray(cartProducts)) return;

        const cartProduct = cartProducts.find(
          (item) => item.productUuid === productIdentifier
        );

        if (cartProduct?.quantity && cartProduct.quantity > 0) {
          setQuantity(cartProduct.quantity);
        }
      } catch (err) {
        console.error('Error syncing product quantity from cart:', err);
      }
    };

    syncQuantityFromCart();

    return () => {
      isMounted = false;
    };
  }, [product]);

  const fetchProductDetails = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await axios.get(`${apiUrl}/products/${identifier}`);
      
      if (response.data.success) {
        setProduct(response.data.data);
        setSelectedImage(0);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Product not found');
      } else {
        setError('Error loading product details');
      }
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return `₹${price.toFixed(2)}`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-lg">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-lg relative">
          <span className="absolute inset-0 overflow-hidden w-1/2">★</span>
          <span className="text-gray-300">★</span>
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-lg">
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

  const resolveQuantityFromResponse = useCallback(
    (responseData, fallbackQuantity) => {
      if (!product) {
        return fallbackQuantity;
      }

      const productIdentifier = product.uuid || product.id;

      if (!productIdentifier) {
        return fallbackQuantity;
      }

      const cartQuantity = responseData?.data?.cart?.products?.find(
        (item) => item.productUuid === productIdentifier
      )?.quantity;

      if (typeof cartQuantity === 'number' && cartQuantity > 0) {
        return cartQuantity;
      }

      const addedProductQuantity = responseData?.data?.addedProduct?.quantity;

      if (typeof addedProductQuantity === 'number' && addedProductQuantity > 0) {
        return addedProductQuantity;
      }

      return fallbackQuantity;
    },
    [product]
  );

  const syncCartQuantity = useCallback(
    async (nextQuantity) => {
      if (!product || nextQuantity < 1) {
        return;
      }

      const cartUuid = getStoredCartUuid();

      if (!cartUuid) {
        return;
      }

      try {
        setIsSyncingQuantity(true);

        const response = await addProductToCart({
          productId: product.uuid || product.id,
          quantity: nextQuantity,
        });

        const updatedQuantity = resolveQuantityFromResponse(response, nextQuantity);

        if (typeof updatedQuantity === 'number' && updatedQuantity > 0) {
          setQuantity(updatedQuantity);
        }
      } catch (err) {
        console.error('Error updating cart quantity:', err);
        const errorMessage =
          err?.response?.data?.message || 'Failed to update cart. Please try again.';
        setAddToCartFeedbackMessage('error', errorMessage);
      } finally {
        setIsSyncingQuantity(false);
      }
    },
    [product, resolveQuantityFromResponse, setAddToCartFeedbackMessage]
  );

  const handleQuantityChange = useCallback(
    (change) => {
      setQuantity((prevQuantity) => {
        const nextQuantity = Math.max(1, prevQuantity + change);

        if (nextQuantity === prevQuantity) {
          return prevQuantity;
        }

        syncCartQuantity(nextQuantity);
        return nextQuantity;
      });
    },
    [syncCartQuantity]
  );

  const handleAddToCart = async () => {
    if (!product || isAddingToCart) return;

    try {
      setIsAddingToCart(true);
      const response = await addProductToCart({
        productId: product.uuid || product.id,
        quantity,
      });

      const updatedQuantity = resolveQuantityFromResponse(response, quantity);

      if (typeof updatedQuantity === 'number' && updatedQuantity > 0) {
        setQuantity(updatedQuantity);
      }

      setAddToCartFeedbackMessage('success', 'Added to cart');
    } catch (err) {
      console.error('Error adding product to cart:', err);
      const errorMessage =
        err?.response?.data?.message || 'Failed to add to cart. Please try again.';
      setAddToCartFeedbackMessage('error', errorMessage);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = useCallback(async () => {
    if (!product || isBuyNowLoading) return;

    try {
      setIsBuyNowLoading(true);
      const response = await addProductToCart({
        productId: product.uuid || product.id,
        quantity,
      });

      const updatedQuantity = resolveQuantityFromResponse(response, quantity);

      if (typeof updatedQuantity === 'number' && updatedQuantity > 0) {
        setQuantity(updatedQuantity);
      }

      const cartUuid =
        response?.data?.cartUuid || response?.data?.cart?.uuid || getStoredCartUuid();

      if (cartUuid) {
        navigate(`/cart?cartId=${encodeURIComponent(cartUuid)}`);
      } else {
        setAddToCartFeedbackMessage('success', 'Added to cart');
      }
    } catch (err) {
      console.error('Error processing buy now:', err);
      const errorMessage =
        err?.response?.data?.message || 'Failed to process buy now. Please try again.';
      setAddToCartFeedbackMessage('error', errorMessage);
    } finally {
      setIsBuyNowLoading(false);
    }
  }, [isBuyNowLoading, navigate, product, quantity, resolveQuantityFromResponse, setAddToCartFeedbackMessage]);

  const allImages = product ? [product.primaryImage, ...(product.secondaryImages || [])] : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg text-gray-600">Loading product details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg uppercase tracking-wide"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const discountPercentage = calculateDiscountPercentage(product.price, product.discountedPrice);
  const finalPrice = product.discountedPrice || product.price;
  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: product.title },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
  <Breadcrumb items={breadcrumbItems} preserveCartId />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src={allImages[selectedImage]} 
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder-product.jpg';
                }}
              />
            </div>
            
            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/placeholder-product.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              {product.subtitle && (
                <p className="text-lg text-gray-600 mb-4">{product.subtitle}</p>
              )}
              
              {product.userRating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">{renderStars(product.userRating)}</div>
                  <span className="text-gray-600">
                    {product.userRating.toFixed(1)} out of 5.0 stars
                  </span>
                  {product.numberOfPurchases > 0 && (
                    <span className="text-sm text-gray-500">
                      ({product.numberOfPurchases} customers bought this)
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-baseline space-x-4 mb-4">
                {product.discountedPrice ? (
                  <>
                    <span className="text-3xl font-bold text-green-600">
                      {formatPrice(product.discountedPrice)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                      {discountPercentage}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">Tax included.</p>
            </div>

            {/* Highlighter Text */}
            {product.highlighterText && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 font-medium">{product.highlighterText}</p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="border-t border-gray-200 pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-blue-600 flex items-center justify-center hover:bg-blue-50 transition-all duration-200 text-gray-600 hover:text-blue-600 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={quantity <= 1 || isSyncingQuantity}
                >
                  -
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-blue-600 flex items-center justify-center hover:bg-blue-50 transition-all duration-200 text-gray-600 hover:text-blue-600 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isSyncingQuantity}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              {addToCartFeedback && (
                <div
                  className={`text-sm font-medium text-center ${
                    addToCartFeedback.type === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {addToCartFeedback.message}
                </div>
              )}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg uppercase tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isAddingToCart || isSyncingQuantity}
              >
                {isAddingToCart || isSyncingQuantity ? 'Updating…' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg uppercase tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isBuyNowLoading}
              >
                {isBuyNowLoading ? 'Redirecting…' : 'Buy Now'}
              </button>
            </div>

            {/* Benefits */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Comfortable and convenient application
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Enhanced skin tone and radiant look
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Gentle on skin with natural ingredients
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Vegan and cruelty-free choice
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Description */}
        {product.description && (
          <div className="mt-16 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        )}

        {/* Product Specifications */}
        {product.productSpecification && Object.keys(product.productSpecification).length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.productSpecification).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;