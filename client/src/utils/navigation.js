import { getStoredCartUuid } from '../api/api';

/**
 * Preserves the cartId query parameter when navigating to different routes
 * @param {string} path - The path to navigate to
 * @param {string} [cartUuid] - Optional cart UUID, will use stored one if not provided
 * @returns {string} Path with cartId parameter if cart exists
 */
export const preserveCartId = (path, cartUuid = null) => {
  const uuid = cartUuid || getStoredCartUuid();
  
  if (!uuid) {
    return path;
  }

  // Check if path already has query parameters
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}cartId=${uuid}`;
};

/**
 * Get current cart UUID from URL or storage
 * @returns {string|null} Cart UUID if exists
 */
export const getCurrentCartId = () => {
  return getStoredCartUuid();
};