import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  addProductToCart,
  fetchCartByUuid,
  lookupLocationByPincode,
  checkoutCart as checkoutCartApi,
} from '../api/api';
import { Breadcrumb, Button } from '../components';

const initialAddressState = {
  name: '',
  number: '',
  addressLine1: '',
  addressLine2: '',
  landmark: '',
  pincode: '',
  city: '',
  state: '',
  postOffice: '',
};

const Cart = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cartId = searchParams.get('cartId');

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingProductId, setUpdatingProductId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [shippingDetails, setShippingDetails] = useState(initialAddressState);
  const [billingDetails, setBillingDetails] = useState(initialAddressState);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingLookupStatus, setShippingLookupStatus] = useState({ loading: false, error: null });
  const [billingLookupStatus, setBillingLookupStatus] = useState({ loading: false, error: null });
  const [checkoutStatus, setCheckoutStatus] = useState({ loading: false, error: null, success: false });
  const lastLookupRef = useRef({ shipping: '', billing: '' });

  const breadcrumbItems = useMemo(
    () => [
      { label: 'Home', to: '/' },
      { label: 'Cart' },
    ],
    []
  );

  const loadCart = useCallback(async () => {
    if (!cartId) {
      setError('Missing cart reference. Please add an item to your cart.');
      setCart(null);
      setLoading(false);
      return;
    }

    try {
      if (!isRefreshing) {
        setLoading(true);
      }
      const response = await fetchCartByUuid(cartId);

      if (!response?.success) {
        throw new Error(response?.message || 'Unable to load cart');
      }

      setCart(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to load cart:', err);
      setCart(null);
      setError(
        err?.response?.data?.message || err?.message || 'Unable to load cart details.'
      );
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [cartId, isRefreshing]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    if (sameAsShipping) {
      setBillingDetails(shippingDetails);
      setBillingLookupStatus({ ...shippingLookupStatus });
    }
  }, [sameAsShipping, shippingDetails, shippingLookupStatus]);

  const fetchLocationForPincode = useCallback(
    async (type, pincode) => {
      const setStatus = type === 'shipping' ? setShippingLookupStatus : setBillingLookupStatus;
      setStatus({ loading: true, error: null });

      try {
        const response = await lookupLocationByPincode(pincode);

        if (!response?.success) {
          throw new Error(response?.message || 'Unable to fetch location details');
        }

        const { state = '', city = '', offices = [] } = response.data || {};
        const primaryOfficeName = offices?.[0]?.name || '';

        if (type === 'shipping') {
          setShippingDetails((prev) => ({ ...prev, state, city, postOffice: primaryOfficeName }));
          if (sameAsShipping) {
            setBillingDetails((prev) => ({ ...prev, state, city, postOffice: primaryOfficeName }));
            setBillingLookupStatus({ loading: false, error: null });
          }
        } else {
          setBillingDetails((prev) => ({ ...prev, state, city, postOffice: primaryOfficeName }));
        }

        setStatus({ loading: false, error: null });
      } catch (err) {
        const message =
          err?.response?.data?.message || err?.message || 'Unable to fetch location details';

        setStatus({ loading: false, error: message });

        if (type === 'shipping') {
          setShippingDetails((prev) => {
            if (!prev.state && !prev.city && !prev.postOffice) {
              return prev;
            }
            return { ...prev, state: '', city: '', postOffice: '' };
          });

          if (sameAsShipping) {
            setBillingDetails((prev) => {
              if (!prev.state && !prev.city && !prev.postOffice) {
                return prev;
              }
              return { ...prev, state: '', city: '', postOffice: '' };
            });
            setBillingLookupStatus({ loading: false, error: message });
          }
        } else {
          setBillingDetails((prev) => {
            if (!prev.state && !prev.city && !prev.postOffice) {
              return prev;
            }
            return { ...prev, state: '', city: '', postOffice: '' };
          });
        }
      }
    },
    [sameAsShipping]
  );

  useEffect(() => {
    const pincode = shippingDetails.pincode;

    if (pincode && pincode.length === 6) {
      if (lastLookupRef.current.shipping !== pincode) {
        lastLookupRef.current.shipping = pincode;
        fetchLocationForPincode('shipping', pincode);
      }
    } else {
      lastLookupRef.current.shipping = '';
      setShippingLookupStatus({ loading: false, error: null });
      setShippingDetails((prev) => {
        if (!prev.state && !prev.city && !prev.postOffice) {
          return prev;
        }
        return { ...prev, state: '', city: '', postOffice: '' };
      });

      if (sameAsShipping) {
        setBillingDetails((prev) => {
          if (!prev.state && !prev.city && !prev.postOffice) {
            return prev;
          }
          return { ...prev, state: '', city: '', postOffice: '' };
        });
        setBillingLookupStatus({ loading: false, error: null });
      }
    }
  }, [fetchLocationForPincode, sameAsShipping, shippingDetails.pincode]);

  useEffect(() => {
    if (sameAsShipping) {
      lastLookupRef.current.billing = lastLookupRef.current.shipping;
      return;
    }

    const pincode = billingDetails.pincode;

    if (pincode && pincode.length === 6) {
      if (lastLookupRef.current.billing !== pincode) {
        lastLookupRef.current.billing = pincode;
        fetchLocationForPincode('billing', pincode);
      }
    } else {
      lastLookupRef.current.billing = '';
      setBillingLookupStatus({ loading: false, error: null });
      setBillingDetails((prev) => {
        if (!prev.state && !prev.city && !prev.postOffice) {
          return prev;
        }
        return { ...prev, state: '', city: '', postOffice: '' };
      });
    }
  }, [billingDetails.pincode, fetchLocationForPincode, sameAsShipping]);

  const handleQuantityUpdate = useCallback(
    async (productUuid, nextQuantity) => {
      if (!cartId || !productUuid) return;

      try {
        setUpdatingProductId(productUuid);
        setIsRefreshing(true);
        const response = await addProductToCart({
          productId: productUuid,
          quantity: Math.max(0, nextQuantity),
        });

        const updatedCart = response?.data?.cart;

        if (updatedCart) {
          setCart(updatedCart);
        } else {
          await loadCart();
        }
      } catch (err) {
        console.error('Failed to update cart quantity:', err);
        setError(
          err?.response?.data?.message || 'Unable to update quantity. Please try again.'
        );
      } finally {
        setUpdatingProductId(null);
        setIsRefreshing(false);
      }
    },
    [cartId, loadCart]
  );

  const handleShippingFieldChange = useCallback(
    (field, value) => {
      setShippingDetails((prev) => {
        const updated = { ...prev, [field]: value };
        if (sameAsShipping) {
          setBillingDetails(updated);
        }
        return updated;
      });
    },
    [sameAsShipping]
  );

  const handleBillingFieldChange = useCallback((field, value) => {
    setBillingDetails((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSameAsShippingToggle = useCallback(
    (checked) => {
      setSameAsShipping(checked);
      if (checked) {
        setBillingDetails(shippingDetails);
      }
    },
    [shippingDetails]
  );

  const isValidPhoneNumber = useCallback((value) => {
    const numericValue = (value || '').trim();
    return /^[6-9]\d{9}$/.test(numericValue);
  }, []);

  const hasRequiredAddressFields = useCallback((details) => {
    if (!details) {
      return false;
    }

    const {
      name,
      number,
      addressLine1,
      pincode,
      city,
      state,
      postOffice,
    } = details;

    return (
      !!(name && name.trim()) &&
      !! number &&
      !!(addressLine1 && addressLine1.trim()) &&
      /^\d{6}$/.test((pincode || '').trim()) &&
      !!(city && city.trim()) &&
      !!(state && state.trim()) &&
      !!(postOffice && postOffice.trim())
    );
  }, [isValidPhoneNumber]);

  const canProceedToCheckout = useMemo(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
        console.log('cart or products missing');
      return false;
    }

    if (shippingLookupStatus.loading || shippingLookupStatus.error) {
        console.log('Shipping lookup status invalid');
      return false;
    }

    if (!hasRequiredAddressFields(shippingDetails)) {
        console.log('Shipping address fields are incomplete');
      return false;
    }

    if (!sameAsShipping) {
      if (billingLookupStatus.loading || billingLookupStatus.error) {
        console.log('Billing lookup status invalid');
        return false;
      }

      if (!hasRequiredAddressFields(billingDetails)) {
        console.log('Billing address fields are incomplete');
        return false;
      }
    }

    return true;
  }, [
    billingDetails,
    billingLookupStatus.error,
    billingLookupStatus.loading,
    cart,
    hasRequiredAddressFields,
    sameAsShipping,
    shippingDetails,
    shippingLookupStatus.error,
    shippingLookupStatus.loading,
  ]);

  const handleProceedToCheckout = useCallback(async () => {
    if (!canProceedToCheckout || !cartId) {
      return;
    }

    setCheckoutStatus({ loading: true, error: null, success: false });

    try {
      const response = await checkoutCartApi(cartId, {
        shippingAddress: shippingDetails,
        billingAddress: sameAsShipping ? undefined : billingDetails,
      });

      if (!response?.success) {
        throw new Error(response?.message || 'Checkout failed');
      }

      setCheckoutStatus({ loading: false, error: null, success: true });
      setCart(response.data);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || 'Unable to complete checkout.';
      setCheckoutStatus({ loading: false, error: message, success: false });
    }
  }, [
    billingDetails,
    canProceedToCheckout,
    cartId,
    sameAsShipping,
    shippingDetails,
  ]);

  const totals = useMemo(() => {
    if (!cart) {
      return {
        subtotal: 0,
        discount: 0,
        total: 0,
        items: 0,
      };
    }

    return {
      subtotal: cart.totalValue || 0,
      discount: cart.totalDiscount || 0,
      total: cart.finalTotal ?? Math.max(0, (cart.totalValue || 0) - (cart.totalDiscount || 0)),
      items: cart.totalItems || (cart.products?.reduce((acc, item) => acc + (item.quantity || 0), 0) ?? 0),
    };
  }, [cart]);

  const renderCartItems = () => {
    if (!cart || !cart.products || cart.products.length === 0) {
      return (
        <div className="bg-white border border-dashed border-blue-200 rounded-xl p-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven&apos;t added anything just yet. Explore our products to discover more.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {cart.products.map((item) => {
          const isUpdating = updatingProductId === item.productUuid;
          const productTotal = (item.discountedPrice ?? item.price) * item.quantity;

          return (
            <div
              key={item.productUuid}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                  <img
                    src={item.primaryImage || '/placeholder-product.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">SKU: {item.productUuid}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Price</span>
                      <span className="text-lg font-semibold text-gray-900">
                        ₹{(item.discountedPrice ?? item.price).toFixed(2)}
                      </span>
                      {item.discountedPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{item.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1">
                      <button
                        type="button"
                        className="text-blue-700 text-lg leading-none disabled:opacity-40"
                        onClick={() => handleQuantityUpdate(item.productUuid, item.quantity - 1)}
                        disabled={isUpdating || item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold text-blue-700 min-w-[2rem] text-center">
                        {isUpdating ? '…' : item.quantity}
                      </span>
                      <button
                        type="button"
                        className="text-blue-700 text-lg leading-none disabled:opacity-40"
                        onClick={() => handleQuantityUpdate(item.productUuid, item.quantity + 1)}
                        disabled={isUpdating}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="text-sm text-red-500 font-medium hover:text-red-600"
                      onClick={() => handleQuantityUpdate(item.productUuid, 0)}
                      disabled={isUpdating}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="sm:w-32 text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-xl font-bold text-gray-900">₹{productTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb items={breadcrumbItems} preserveCartId />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          <p className="mt-4 text-gray-600">Retrieving your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb items={breadcrumbItems} preserveCartId />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-3">We couldn&apos;t load your cart</h2>
            <p className="text-red-500 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" onClick={loadCart}>
                Try Again
              </Button>
              <Button variant="secondary" onClick={() => navigate('/')}>Go Home</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log('Rendering cart with ID:', cartId, cart, canProceedToCheckout);

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} preserveCartId />

      <section className="border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
            Secure checkout
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Review your order
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl">
            Make sure everything looks correct before heading to checkout. You can update quantities or remove items below.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {renderCartItems()}

            <div className="bg-white border border-blue-100 rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Customer details</h2>
                <p className="mt-1 text-sm text-gray-500">
                  We&apos;ll use this information to deliver your order and keep you updated on its status.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="shipping-name">
                        Full name
                      </label>
                      <input
                        id="shipping-name"
                        type="text"
                        value={shippingDetails.name}
                        onChange={(event) => handleShippingFieldChange('name', event.target.value)}
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="shipping-number">
                        Phone number
                      </label>
                      <input
                        id="shipping-number"
                        type="tel"
                        value={shippingDetails.number}
                        onChange={(event) => handleShippingFieldChange('number', event.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        autoComplete="tel"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="shipping-address-line1">
                        Address line 1
                      </label>
                      <input
                        id="shipping-address-line1"
                        type="text"
                        value={shippingDetails.addressLine1}
                        onChange={(event) => handleShippingFieldChange('addressLine1', event.target.value)}
                        placeholder="House number, street name"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        autoComplete="address-line1"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="shipping-address-line2">
                        Address line 2 <span className="text-gray-400">(optional)</span>
                      </label>
                      <input
                        id="shipping-address-line2"
                        type="text"
                        value={shippingDetails.addressLine2}
                        onChange={(event) => handleShippingFieldChange('addressLine2', event.target.value)}
                        placeholder="Apartment, suite, building"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        autoComplete="address-line2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="shipping-landmark">
                        Landmark <span className="text-gray-400">(optional)</span>
                      </label>
                      <input
                        id="shipping-landmark"
                        type="text"
                        value={shippingDetails.landmark}
                        onChange={(event) => handleShippingFieldChange('landmark', event.target.value)}
                        placeholder="Nearby landmark"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="shipping-pincode">
                        Pincode
                      </label>
                      <input
                        id="shipping-pincode"
                        type="text"
                        value={shippingDetails.pincode}
                        onChange={(event) => {
                          const nextValue = event.target.value.replace(/[^\d]/g, '').slice(0, 6);
                          handleShippingFieldChange('pincode', nextValue);
                        }}
                        placeholder="6-digit pincode"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        inputMode="numeric"
                        autoComplete="postal-code"
                      />
                      {shippingLookupStatus.loading && (
                        <p className="mt-1 text-xs text-blue-600">Looking up location…</p>
                      )}
                      {!shippingLookupStatus.loading && shippingLookupStatus.error && (
                        <p className="mt-1 text-xs text-red-500">{shippingLookupStatus.error}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="shipping-city">
                        City
                      </label>
                      <input
                        id="shipping-city"
                        type="text"
                        value={shippingDetails.city}
                        readOnly
                        placeholder="Auto-filled city"
                        className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-700 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="shipping-state">
                        State
                      </label>
                      <input
                        id="shipping-state"
                        type="text"
                        value={shippingDetails.state}
                        readOnly
                        placeholder="Auto-filled state"
                        className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-700 cursor-not-allowed"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="shipping-post-office">
                        Post office
                      </label>
                      <input
                        id="shipping-post-office"
                        type="text"
                        value={shippingDetails.postOffice}
                        readOnly
                        placeholder="Auto-filled post office"
                        className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-700 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <label className="inline-flex items-center gap-3 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={sameAsShipping}
                      onChange={(event) => handleSameAsShippingToggle(event.target.checked)}
                    />
                    Billing address same as shipping address
                  </label>
                </div>

                {!sameAsShipping && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">Billing address</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="billing-name">
                          Full name
                        </label>
                        <input
                          id="billing-name"
                          type="text"
                          value={billingDetails.name}
                          onChange={(event) => handleBillingFieldChange('name', event.target.value)}
                          placeholder="Enter your full name"
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          autoComplete="billing name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="billing-number">
                          Phone number
                        </label>
                        <input
                          id="billing-number"
                          type="tel"
                          value={billingDetails.number}
                          onChange={(event) => handleBillingFieldChange('number', event.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          autoComplete="billing tel"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="billing-address-line1">
                          Address line 1
                        </label>
                        <input
                          id="billing-address-line1"
                          type="text"
                          value={billingDetails.addressLine1}
                          onChange={(event) => handleBillingFieldChange('addressLine1', event.target.value)}
                          placeholder="House number, street name"
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          autoComplete="billing address-line1"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="billing-address-line2">
                          Address line 2 <span className="text-gray-400">(optional)</span>
                        </label>
                        <input
                          id="billing-address-line2"
                          type="text"
                          value={billingDetails.addressLine2}
                          onChange={(event) => handleBillingFieldChange('addressLine2', event.target.value)}
                          placeholder="Apartment, suite, building"
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          autoComplete="billing address-line2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="billing-landmark">
                          Landmark <span className="text-gray-400">(optional)</span>
                        </label>
                        <input
                          id="billing-landmark"
                          type="text"
                          value={billingDetails.landmark}
                          onChange={(event) => handleBillingFieldChange('landmark', event.target.value)}
                          placeholder="Nearby landmark"
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          autoComplete="off"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="billing-pincode">
                          Pincode
                        </label>
                        <input
                          id="billing-pincode"
                          type="text"
                          value={billingDetails.pincode}
                          onChange={(event) => {
                            const nextValue = event.target.value.replace(/[^\d]/g, '').slice(0, 6);
                            handleBillingFieldChange('pincode', nextValue);
                          }}
                          placeholder="6-digit pincode"
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          inputMode="numeric"
                          autoComplete="billing postal-code"
                        />
                        {billingLookupStatus.loading && (
                          <p className="mt-1 text-xs text-blue-600">Looking up location…</p>
                        )}
                        {!billingLookupStatus.loading && billingLookupStatus.error && (
                          <p className="mt-1 text-xs text-red-500">{billingLookupStatus.error}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="billing-city">
                          City
                        </label>
                        <input
                          id="billing-city"
                          type="text"
                          value={billingDetails.city}
                          readOnly
                          placeholder="Auto-filled city"
                          className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-700 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="billing-state">
                          State
                        </label>
                        <input
                          id="billing-state"
                          type="text"
                          value={billingDetails.state}
                          readOnly
                          placeholder="Auto-filled state"
                          className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-700 cursor-not-allowed"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="billing-post-office">
                          Post office
                        </label>
                        <input
                          id="billing-post-office"
                          type="text"
                          value={billingDetails.postOffice}
                          readOnly
                          placeholder="Auto-filled post office"
                          className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-700 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Need help with your order?</h3>
                <p className="text-sm text-gray-500">Our wellness specialists can help you pick the perfect plan.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="secondary" onClick={() => navigate('/products')}>
                  Continue Shopping
                </Button>
                <a
                  href="tel:+1800123456"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
                >
                  Talk to us
                </a>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order summary</h2>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Savings</span>
                  <span className="text-green-600">− ₹{totals.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{totals.items}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4" />

              <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
                <span>Total due today</span>
                <span>₹{totals.total.toFixed(2)}</span>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Shipping and taxes calculated at the next step.
              </p>

              <Button
                variant="primary"
                className="w-full mt-6"
                onClick={handleProceedToCheckout}
                disabled={!canProceedToCheckout || checkoutStatus.loading || checkoutStatus.success}
              >
                {checkoutStatus.loading ? 'Processing…' : checkoutStatus.success ? 'Order placed' : 'Proceed to checkout'}
              </Button>

              {checkoutStatus.error && (
                <p className="mt-2 text-sm text-red-500 text-center">{checkoutStatus.error}</p>
              )}

              {checkoutStatus.success && (
                <p className="mt-2 text-sm text-green-600 text-center">
                  Thank you! Your order has been placed successfully.
                </p>
              )}

              <p className="mt-4 text-xs text-gray-500 text-center">
                Secure payments powered by Stripe · 30-day money back guarantee
              </p>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-blue-700 space-y-2">
              <p className="font-medium">Did you know?</p>
              <p>Most customers start feeling the difference within 2 weeks. Consistency is key to lasting results.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
