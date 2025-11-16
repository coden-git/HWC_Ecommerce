import axios from 'axios';

const CART_UUID_QUERY_PARAM = 'cartId';

const hasWindow = () => typeof window !== 'undefined';

const getApiBaseUrl = () => import.meta.env.VITE_API_URL || '/api';

// Create axios instance with default headers for ngrok
const api = axios.create({
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  },
});

export const getStoredCartUuid = () => {
  if (!hasWindow()) {
    return null;
  }

  try {
    const url = new URL(window.location.href);
    return url.searchParams.get(CART_UUID_QUERY_PARAM);
  } catch (error) {
    console.warn('Unable to read cart UUID from URL:', error);
    return null;
  }
};

export const storeCartUuid = (uuid) => {
  if (!uuid || !hasWindow()) {
    return;
  }

  try {
    const url = new URL(window.location.href);
    url.searchParams.set(CART_UUID_QUERY_PARAM, uuid);
    window.history.replaceState(window.history.state, '', url.toString());
  } catch (error) {
    console.warn('Unable to persist cart UUID to URL:', error);
  }
};

export const clearStoredCartUuid = () => {
  if (!hasWindow()) {
    return;
  }

  try {
    const url = new URL(window.location.href);
    url.searchParams.delete(CART_UUID_QUERY_PARAM);
    window.history.replaceState(window.history.state, '', url.toString());
  } catch (error) {
    console.warn('Unable to clear cart UUID from URL:', error);
  }
};

export const addProductToCart = async ({ productId, quantity = 1 }) => {
  if (!productId) {
    throw new Error('productId is required to add product to cart');
  }

  const apiUrl = getApiBaseUrl();
  const uuid = getStoredCartUuid();

  const payload = {
    productId,
    quantity,
  };

  if (uuid) {
    payload.uuid = uuid;
  }

  const response = await api.post(`${apiUrl}/cart/add`, payload);
  const { data } = response;

  if (data?.success && data?.data?.cartUuid) {
    storeCartUuid(data.data.cartUuid);
    // Trigger cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }

  return data;
};

export const fetchTopSellingProducts = async ({ limit = 8 } = {}) => {
  const apiUrl = getApiBaseUrl();
  const response = await api.get(`${apiUrl}/products/top-selling`, {
    params: {
      limit,
    },
  });

  return response.data;
};

export const fetchCartByUuid = async (uuid) => {
  if (!uuid) {
    throw new Error('Cart UUID is required');
  }

  const apiUrl = getApiBaseUrl();
  const response = await api.get(`${apiUrl}/cart/${uuid}`);

  return response.data;
};

export const getCartItemCount = async () => {
  try {
    const cartUuid = getStoredCartUuid();
    if (!cartUuid) {
      return 0;
    }

    const cartData = await fetchCartByUuid(cartUuid);
    if (cartData?.success && cartData?.data) {
      return cartData.data.products?.reduce(
        (total, product) => total + (product.quantity || 0),
        0
      ) || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error getting cart item count:', error);
    return 0;
  }
};

export const fetchCarts = async ({
  status,
  startDate,
  endDate,
  name,
  phoneNumber,
  pageNumber = 1,
} = {}) => {
  const apiUrl = getApiBaseUrl();

  const params = {
    status,
    startDate,
    endDate,
    name,
    phoneNumber,
    pageNumber,
  };

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value === undefined || value === null || value === '') {
      delete params[key];
    }
  });

  const response = await api.get(`${apiUrl}/cart`, { params });
  return response.data;
};

export const dispatchCart = async (uuid) => {
  if (!uuid) {
    throw new Error('Cart UUID is required for dispatch');
  }

  const apiUrl = getApiBaseUrl();
  const response = await api.get(`${apiUrl}/cart/${uuid}/dispatch`);
  return response.data;
};

const formatAddressPayload = (address = {}) => {
  if (!address) {
    return undefined;
  }

  const {
    addressLine1 = '',
    addressLine2 = '',
    landmark = '',
    pincode = '',
    city = '',
    state = '',
    postOffice = '',
  } = address;

  return {
    addressLine1,
    addressLine2,
    landmark,
    pincode,
    city,
    state,
    office: postOffice,
  };
};

export const checkoutCart = async (uuid, { shippingAddress, billingAddress } = {}) => {
  if (!uuid) {
    throw new Error('Cart UUID is required for checkout');
  }

  if (!shippingAddress) {
    throw new Error('Shipping address is required for checkout');
  }

  const apiUrl = getApiBaseUrl();
  const payload = {
    shippingAddress: formatAddressPayload(shippingAddress),
  };

  if (billingAddress) {
    payload.billingAddress = formatAddressPayload(billingAddress);
  }

  const response = await api.post(`${apiUrl}/cart/checkout/${uuid}`, payload);
  const { data } = response;

  if (data?.success) {
    clearStoredCartUuid();
  }

  return data;
};

export const lookupLocationByPincode = async (pincode) => {
  if (!pincode || !/^\d{6}$/.test(pincode)) {
    throw new Error('A valid 6-digit pincode is required');
  }

  const apiUrl = getApiBaseUrl();
  const response = await api.get(`${apiUrl}/postal/pincode/${pincode}`);

  return response.data;
};

export const fetchProductDetails = async (identifier) => {
  if (!identifier) {
    throw new Error('Product identifier is required');
  }

  const apiUrl = getApiBaseUrl();
  const response = await api.get(`${apiUrl}/products/${identifier}`);

  return response.data;
};
