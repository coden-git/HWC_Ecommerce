import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({
  items = [],
  separator = '/',
  className = '',
  navClassName = '',
  preserveCartId = false,
}) => {
  if (!items.length) {
    return null;
  }

  const location = useLocation();
  const cartId = preserveCartId
    ? new URLSearchParams(location.search || '').get('cartId')
    : null;

  const buildLinkTo = (to) => {
    if (!cartId || !to) {
      return to;
    }

    if (typeof to === 'string') {
      const [pathname, search = ''] = to.split('?');
      const params = new URLSearchParams(search);
      params.set('cartId', cartId);
      const queryString = params.toString();
      return queryString ? `${pathname}?${queryString}` : pathname;
    }

    if (typeof to === 'object' && to !== null) {
      const params = new URLSearchParams(to.search || '');
      params.set('cartId', cartId);
      return {
        ...to,
        search: `?${params.toString()}`,
      };
    }

    return to;
  };

  return (
    <div className={`bg-white border-b ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className={`text-sm text-gray-500 flex items-center flex-wrap ${navClassName}`} aria-label="Breadcrumb">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const linkTarget = buildLinkTo(item.to);

            return (
              <React.Fragment key={`${item.label}-${index}`}>
                {index > 0 && (
                  <span className="mx-2 text-gray-400" aria-hidden="true">
                    {separator}
                  </span>
                )}
                {isLast || !item.to ? (
                  <span className="text-gray-900 font-medium" aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={linkTarget}
                    className="hover:text-blue-600 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
