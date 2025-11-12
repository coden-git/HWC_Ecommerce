import axios from 'axios';

const CART_UUID_QUERY_PARAM = 'cartId';

const hasWindow = () => typeof window !== 'undefined';

const getApiBaseUrl = () => import.meta.env.VITE_API_URL || '/api';

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

  const response = await axios.post(`${apiUrl}/cart/add`, payload);
  const { data } = response;

  if (data?.success && data?.data?.cartUuid) {
    storeCartUuid(data.data.cartUuid);
  }

  return data;
};

export const fetchTopSellingProducts = async ({ limit = 8 } = {}) => {
  const apiUrl = getApiBaseUrl();
  const response = await axios.get(`${apiUrl}/products/top-selling`, {
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
  const response = await axios.get(`${apiUrl}/cart/${uuid}`);

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

  const response = await axios.post(`${apiUrl}/cart/checkout/${uuid}`, payload);
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
  const response = await axios.get(`${apiUrl}/postal/pincode/${pincode}`);

  return response.data;
};
