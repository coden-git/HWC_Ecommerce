import { getStoredCartUuid } from '../api/api';

/**
 * Scrolls to the top of the page smoothly
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

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
 * Navigate with scroll to top and cart ID preservation
 * @param {function} navigate - React Router navigate function
 * @param {string} path - The path to navigate to
 * @param {string} [cartUuid] - Optional cart UUID
 * @param {boolean} [scrollUp=true] - Whether to scroll to top before navigation
 */
export const navigateWithScroll = (navigate, path, cartUuid = null, scrollUp = true) => {
  if (scrollUp) {
    scrollToTop();
  }
  
  const finalPath = preserveCartId(path, cartUuid);
  
  // Small delay to allow scroll animation to start
  setTimeout(() => {
    navigate(finalPath);
  }, 100);
};

/**
 * Get current cart UUID from URL or storage
 * @returns {string|null} Cart UUID if exists
 */
export const getCurrentCartId = () => {
  return getStoredCartUuid();
};