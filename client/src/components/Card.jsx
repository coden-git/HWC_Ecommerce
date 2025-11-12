import React from 'react';
import { Button } from './index';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  title, 
  description, 
  price, 
  image, 
  onButtonClick,
  buttonText = "Add to Cart",
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden';
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-2 transition-all duration-300' : '';
  
  // If it's a product card (has title, description, etc.)
  if (title || description || price || image) {
    return (
      <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
        {image && (
          <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
            <span className="text-6xl">{image}</span>
          </div>
        )}
        <div className="p-6">
          {title && (
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
          )}
          {description && (
            <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
          )}
          {price && (
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-green-600">{price}</span>
              <div className="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          )}
          <Button 
            variant="primary" 
            className="w-full" 
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </div>
        {children}
      </div>
    );
  }
  
  // Regular card
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;