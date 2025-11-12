const Joi = require('joi');

// Joi schema for product creation
const createProductSchema = Joi.object({
  highlighterText: Joi.string()
    .max(200)
    .trim()
    .optional()
    .allow('', null)
    .messages({
      'string.max': 'Highlighter text must not exceed 200 characters'
    }),
  
  price: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be a positive number',
      'any.required': 'Price is required'
    }),
  
  discountedPrice: Joi.number()
    .positive()
    .optional()
    .custom((value, helpers) => {
      const { price } = helpers.state.ancestors[0];
      if (value && price && value > price) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'number.base': 'Discounted price must be a number',
      'number.positive': 'Discounted price must be a positive number',
      'any.invalid': 'Discounted price must be less than or equal to the original price'
    }),
  
  numberOfPurchases: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      'number.base': 'Number of purchases must be a number',
      'number.integer': 'Number of purchases must be an integer',
      'number.min': 'Number of purchases must be zero or positive'
    }),
  
  userRating: Joi.number()
    .min(0)
    .max(5)
    .optional()
    .messages({
      'number.base': 'User rating must be a number',
      'number.min': 'User rating must be between 0 and 5',
      'number.max': 'User rating must be between 0 and 5'
    }),
  
  title: Joi.string()
    .max(100)
    .trim()
    .required()
    .messages({
      'string.base': 'Title must be a string',
      'string.max': 'Title must not exceed 100 characters',
      'any.required': 'Title is required'
    }),
  
  subtitle: Joi.string()
    .max(150)
    .trim()
    .optional()
    .allow('', null)
    .messages({
      'string.max': 'Subtitle must not exceed 150 characters'
    }),
  
  description: Joi.string()
    .max(2000)
    .trim()
    .required()
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description must not exceed 2000 characters',
      'any.required': 'Description is required'
    }),
  
  productSpecification: Joi.object()
    .optional()
    .default({})
    .messages({
      'object.base': 'Product specification must be an object'
    })
});

// Joi schema for product update (all fields optional except those that should remain required)
const updateProductSchema = Joi.object({
  highlighterText: Joi.string()
    .max(200)
    .trim()
    .optional()
    .allow('', null)
    .messages({
      'string.max': 'Highlighter text must not exceed 200 characters'
    }),
  
  price: Joi.number()
    .positive()
    .optional()
    .messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be a positive number'
    }),
  
  discountedPrice: Joi.number()
    .positive()
    .optional()
    .custom((value, helpers) => {
      const { price } = helpers.state.ancestors[0];
      if (value && price && value > price) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'number.base': 'Discounted price must be a number',
      'number.positive': 'Discounted price must be a positive number',
      'any.invalid': 'Discounted price must be less than or equal to the original price'
    }),
  
  numberOfPurchases: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Number of purchases must be a number',
      'number.integer': 'Number of purchases must be an integer',
      'number.min': 'Number of purchases must be zero or positive'
    }),
  
  userRating: Joi.number()
    .min(0)
    .max(5)
    .optional()
    .messages({
      'number.base': 'User rating must be a number',
      'number.min': 'User rating must be between 0 and 5',
      'number.max': 'User rating must be between 0 and 5'
    }),
  
  title: Joi.string()
    .max(100)
    .trim()
    .optional()
    .messages({
      'string.base': 'Title must be a string',
      'string.max': 'Title must not exceed 100 characters'
    }),
  
  subtitle: Joi.string()
    .max(150)
    .trim()
    .optional()
    .allow('', null)
    .messages({
      'string.max': 'Subtitle must not exceed 150 characters'
    }),
  
  description: Joi.string()
    .max(2000)
    .trim()
    .optional()
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description must not exceed 2000 characters'
    }),
  
  productSpecification: Joi.object()
    .optional()
    .messages({
      'object.base': 'Product specification must be an object'
    })
});

module.exports = {
  createProductSchema,
  updateProductSchema
};
