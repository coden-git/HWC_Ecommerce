const Joi = require('joi');

// Add to cart validation schema
const addToCartSchema = Joi.object({
  uuid: Joi.string()
    .uuid()
    .optional()
    .messages({
      'string.uuid': 'Cart UUID must be a valid UUID format'
    }),
  
  productId: Joi.string()
    .required()
    .trim()
    .messages({
      'string.empty': 'Product ID is required',
      'any.required': 'Product ID is required'
    }),
  
  quantity: Joi.number()
    .integer()
    .min(0)
    .max(100)
    .default(1)
    .messages({
      'number.base': 'Quantity must be a number',
      'number.integer': 'Quantity must be an integer',
      'number.min': 'Quantity must be at least 0',
      'number.max': 'Quantity cannot exceed 100'
    })
});

// Get cart by UUID validation schema
const getCartByUuidSchema = Joi.object({
  uuid: Joi.string()
    .uuid()
    .required()
    .messages({
      'string.empty': 'Cart UUID is required',
      'any.required': 'Cart UUID is required',
      'string.uuid': 'Cart UUID must be a valid UUID format'
    })
});

const addressSchema = Joi.object({
  addressLine1: Joi.string().trim().max(200).required().messages({
    'string.empty': 'Address line 1 is required',
  }),
  addressLine2: Joi.string().trim().max(200).allow('', null),
  landmark: Joi.string().trim().max(100).allow('', null),
  pincode: Joi.string()
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      'string.pattern.base': 'Pincode must be a 6-digit number',
      'string.empty': 'Pincode is required',
    }),
  city: Joi.string().trim().max(50).required().messages({
    'string.empty': 'City is required',
  }),
  state: Joi.string().trim().max(50).required().messages({
    'string.empty': 'State is required',
  }),
  office: Joi.string().trim().max(50).required().messages({
    'string.empty': 'Post office is required',
  }),
});

const checkoutCartBodySchema = Joi.object({
  shippingAddress: addressSchema.required().messages({
    'any.required': 'Shipping address is required',
  }),
  billingAddress: addressSchema.optional(),
});

const checkoutCartParamsSchema = Joi.object({
  uuid: Joi.string()
    .uuid()
    .required()
    .messages({
      'string.empty': 'Cart UUID is required',
      'any.required': 'Cart UUID is required',
      'string.uuid': 'Cart UUID must be a valid UUID format',
    }),
});

module.exports = {
  addToCartSchema,
  getCartByUuidSchema,
  checkoutCartBodySchema,
  checkoutCartParamsSchema,
};