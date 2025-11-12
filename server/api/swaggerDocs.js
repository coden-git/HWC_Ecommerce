const { attachDoc, addSchema, addSecurityScheme, setGlobalSecurity, getSpec } = require('./openApiBuilder');

// Define reusable schemas
function setupSchemas() {
  // Product schema
  addSchema('Product', {
    type: 'object',
    properties: {
      uuid: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the product',
        example: '550e8400-e29b-41d4-a716-446655440000'
      },
      primaryImage: {
        type: 'string',
        format: 'uri',
        description: 'Primary product image S3 URL',
        example: 'https://wellness-bucket.s3.amazonaws.com/products/primary-image.jpg'
      },
      secondaryImages: {
        type: 'array',
        items: {
          type: 'string',
          format: 'uri'
        },
        description: 'Array of secondary product images',
        example: [
          'https://wellness-bucket.s3.amazonaws.com/products/secondary-1.jpg',
          'https://wellness-bucket.s3.amazonaws.com/products/secondary-2.jpg'
        ]
      },
      highlighterText: {
        type: 'string',
        maxLength: 200,
        description: 'Highlighted marketing text',
        example: 'Limited Time Offer!'
      },
      price: {
        type: 'number',
        minimum: 0,
        description: 'Original price in USD',
        example: 99.99
      },
      discountedPrice: {
        type: 'number',
        minimum: 0,
        description: 'Discounted price in USD (optional)',
        example: 79.99
      },
      numberOfPurchases: {
        type: 'integer',
        minimum: 0,
        description: 'Total number of purchases',
        example: 150
      },
      userRating: {
        type: 'number',
        minimum: 0,
        maximum: 5,
        description: 'Average user rating (0-5)',
        example: 4.5
      },
      title: {
        type: 'string',
        maxLength: 100,
        description: 'Product title',
        example: 'Premium Wellness Supplement'
      },
      subtitle: {
        type: 'string',
        maxLength: 150,
        description: 'Product subtitle',
        example: 'Advanced Health Formula for Daily Vitality'
      },
      description: {
        type: 'string',
        maxLength: 2000,
        description: 'Detailed product description',
        example: 'A comprehensive wellness supplement designed to boost your daily energy and support overall health with natural ingredients.'
      },
      productSpecification: {
        type: 'object',
        description: 'Product specifications and details',
        example: {
          weight: '500g',
          ingredients: ['Vitamin C', 'Zinc', 'Magnesium'],
          servingsPerContainer: 30,
          dosage: '2 capsules daily'
        }
      },
      isActive: {
        type: 'boolean',
        description: 'Whether the product is active/available',
        example: true
      },
      discountPercentage: {
        type: 'integer',
        readOnly: true,
        description: 'Calculated discount percentage',
        example: 20
      },
      finalPrice: {
        type: 'number',
        readOnly: true,
        description: 'Final price (discounted or original)',
        example: 79.99
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        readOnly: true,
        description: 'Product creation timestamp',
        example: '2024-01-15T10:30:00.000Z'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        readOnly: true,
        description: 'Last update timestamp',
        example: '2024-01-20T14:45:00.000Z'
      }
    },
    required: ['uuid', 'primaryImage', 'price', 'title', 'description']
  });

  // Product creation request schema
  addSchema('CreateProductRequest', {
    type: 'object',
    properties: {
      highlighterText: {
        type: 'string',
        maxLength: 200,
        description: 'Highlighted marketing text',
        example: 'Limited Time Offer!'
      },
      price: {
        type: 'number',
        minimum: 0,
        description: 'Original price in USD',
        example: 99.99
      },
      discountedPrice: {
        type: 'number',
        minimum: 0,
        description: 'Discounted price in USD (must be less than or equal to price)',
        example: 79.99
      },
      numberOfPurchases: {
        type: 'integer',
        minimum: 0,
        default: 0,
        description: 'Initial number of purchases',
        example: 0
      },
      userRating: {
        type: 'number',
        minimum: 0,
        maximum: 5,
        description: 'Initial user rating (0-5)',
        example: 4.5
      },
      title: {
        type: 'string',
        maxLength: 100,
        description: 'Product title',
        example: 'Premium Wellness Supplement'
      },
      subtitle: {
        type: 'string',
        maxLength: 150,
        description: 'Product subtitle',
        example: 'Advanced Health Formula for Daily Vitality'
      },
      description: {
        type: 'string',
        maxLength: 2000,
        description: 'Detailed product description',
        example: 'A comprehensive wellness supplement designed to boost your daily energy and support overall health with natural ingredients.'
      },
      productSpecification: {
        type: 'object',
        description: 'Product specifications and details',
        example: {
          weight: '500g',
          ingredients: ['Vitamin C', 'Zinc', 'Magnesium'],
          servingsPerContainer: 30,
          dosage: '2 capsules daily'
        }
      }
    },
    required: ['price', 'title', 'description']
  });

  // Cart product item schema
  addSchema('CartProduct', {
    type: 'object',
    properties: {
      productUuid: {
        type: 'string',
        description: 'Product UUID stored in the cart',
        example: '550e8400-e29b-41d4-a716-446655440000'
      },
      productId: {
        type: 'string',
        description: 'Database identifier for product (ObjectId string)',
        example: '65f0d3b12c73f6a9f4d17c25'
      },
      title: {
        type: 'string',
        description: 'Snapshot of product title when added to cart',
        example: 'Premium Wellness Supplement'
      },
      price: {
        type: 'number',
        minimum: 0,
        description: 'Original price per unit at time of addition',
        example: 99.99
      },
      discountedPrice: {
        type: 'number',
        minimum: 0,
        nullable: true,
        description: 'Discounted price per unit at time of addition',
        example: 79.99
      },
      quantity: {
        type: 'integer',
        minimum: 1,
        description: 'Number of units of this product in the cart',
        example: 2
      },
      primaryImage: {
        type: 'string',
        format: 'uri',
        description: 'Primary image URL snapshot',
        example: 'https://wellness-bucket.s3.amazonaws.com/products/primary-image.jpg'
      }
    },
    required: ['productUuid', 'title', 'price', 'quantity', 'primaryImage']
  });

  // Cart address schema
  addSchema('CartAddress', {
    type: 'object',
    properties: {
      addressLine1: {
        type: 'string',
        description: 'Primary address line',
        example: '221B Baker Street'
      },
      addressLine2: {
        type: 'string',
        description: 'Secondary address line',
        example: 'Apartment 4B'
      },
      landmark: {
        type: 'string',
        description: 'Nearby landmark for delivery assistance',
        example: 'Near City Museum'
      },
      pincode: {
        type: 'string',
        description: '6-digit postal code',
        example: '560001'
      },
      city: {
        type: 'string',
        description: 'City name',
        example: 'Bengaluru'
      },
      state: {
        type: 'string',
        description: 'State name',
        example: 'Karnataka'
      },
      office: {
        type: 'string',
        description: 'Post office associated with the pincode',
        example: 'Bangalore G.P.O.'
      }
    },
    required: ['addressLine1', 'pincode', 'city', 'state', 'office']
  });

  // Cart schema
  addSchema('Cart', {
    type: 'object',
    properties: {
      uuid: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the cart',
        example: '5f7b2c20-4d8c-4afd-9f2b-4e439b8b8a55'
      },
      cartStatus: {
        type: 'string',
        enum: ['CART', 'CHECKOUT', 'PLACED', 'FAILED', 'SHIPPED'],
        description: 'Lifecycle status of the cart',
        example: 'CART'
      },
      products: {
        type: 'array',
        description: 'Products currently in the cart',
        items: { $ref: '#/components/schemas/CartProduct' }
      },
      totalValue: {
        type: 'number',
        minimum: 0,
        description: 'Sum of original prices for all items',
        example: 199.98
      },
      totalDiscount: {
        type: 'number',
        minimum: 0,
        description: 'Total discount applied to the cart',
        example: 40
      },
      finalTotal: {
        type: 'number',
        minimum: 0,
        readOnly: true,
        description: 'Final amount after discounts',
        example: 159.98
      },
      totalItems: {
        type: 'integer',
        minimum: 0,
        readOnly: true,
        description: 'Total quantity of individual items',
        example: 3
      },
      name: {
        type: 'string',
        description: 'Customer name associated with the cart',
        example: 'John Doe'
      },
      number: {
        type: 'string',
        description: 'Customer contact number',
        example: '9876543210'
      },
      shippingAddress: {
        $ref: '#/components/schemas/CartAddress'
      },
      billingAddress: {
        $ref: '#/components/schemas/CartAddress'
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'Cart creation timestamp',
        example: '2025-02-11T10:30:00.000Z'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Last updated timestamp',
        example: '2025-02-11T11:15:00.000Z'
      }
    },
    required: ['uuid', 'cartStatus', 'products', 'totalValue', 'totalDiscount']
  });

  // Add-to-cart request schema
  addSchema('AddToCartRequest', {
    type: 'object',
    properties: {
      uuid: {
        type: 'string',
        format: 'uuid',
        description: 'Optional existing cart UUID to append items to',
        example: '5f7b2c20-4d8c-4afd-9f2b-4e439b8b8a55'
      },
      productId: {
        type: 'string',
        description: 'Product UUID or URI to add to the cart',
        example: 'premium-wellness-supplement'
      },
      quantity: {
        type: 'integer',
        minimum: 1,
        default: 1,
        description: 'Quantity to add',
        example: 2
      }
    },
    required: ['productId']
  });

  addSchema('CheckoutCartRequest', {
    type: 'object',
    properties: {
      shippingAddress: {
        $ref: '#/components/schemas/CartAddress',
        description: 'Shipping address to use for fulfillment'
      },
      billingAddress: {
        $ref: '#/components/schemas/CartAddress',
        description: 'Billing address; defaults to shipping address when omitted'
      }
    },
    required: ['shippingAddress']
  });

  // Cart response schema
  addSchema('CartResponse', {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Cart retrieved successfully' },
      data: { $ref: '#/components/schemas/Cart' }
    },
    required: ['success', 'message', 'data']
  });

  addSchema('CartListResponse', {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Carts retrieved successfully' },
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/Cart' }
      },
      pagination: {
        type: 'object',
        properties: {
          page: { type: 'integer', example: 1 },
          pageSize: { type: 'integer', example: 10 },
          total: { type: 'integer', example: 42 },
          pages: { type: 'integer', example: 5 }
        },
        required: ['page', 'pageSize', 'total', 'pages']
      }
    },
    required: ['success', 'message', 'data', 'pagination']
  });

  // Product update request schema (all fields optional)
  addSchema('UpdateProductRequest', {
    type: 'object',
    properties: {
      highlighterText: { type: 'string', maxLength: 200 },
      price: { type: 'number', minimum: 0 },
      discountedPrice: { type: 'number', minimum: 0 },
      numberOfPurchases: { type: 'integer', minimum: 0 },
      userRating: { type: 'number', minimum: 0, maximum: 5 },
      title: { type: 'string', maxLength: 100 },
      subtitle: { type: 'string', maxLength: 150 },
      description: { type: 'string', maxLength: 2000 },
      productSpecification: { type: 'object' }
    }
  });

  // Success response schema
  addSchema('SuccessResponse', {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      message: {
        type: 'string',
        example: 'Operation completed successfully'
      },
      data: {
        oneOf: [
          { $ref: '#/components/schemas/Product' },
          { type: 'array', items: { $ref: '#/components/schemas/Product' } },
          { type: 'object' }
        ]
      }
    },
    required: ['success', 'message']
  });

  // Paginated response schema
  addSchema('PaginatedProductResponse', {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Products retrieved successfully' },
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/Product' }
      },
      pagination: {
        type: 'object',
        properties: {
          page: { type: 'integer', example: 1 },
          limit: { type: 'integer', example: 10 },
          total: { type: 'integer', example: 100 },
          pages: { type: 'integer', example: 10 }
        },
        required: ['page', 'limit', 'total', 'pages']
      }
    },
    required: ['success', 'message', 'data', 'pagination']
  });

  // Error response schema
  addSchema('ErrorResponse', {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: false
      },
      message: {
        type: 'string',
        example: 'An error occurred'
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            field: { type: 'string', example: 'title' },
            message: { type: 'string', example: 'Title is required' },
            value: { example: null }
          }
        }
      }
    },
    required: ['success', 'message']
  });

  // Health check response
  addSchema('HealthResponse', {
    type: 'object',
    properties: {
      status: { type: 'string', example: 'OK' },
      message: { type: 'string', example: 'Server is healthy' }
    },
    required: ['status', 'message']
  });

  // Image upload response
  addSchema('ImageUploadResponse', {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Images uploaded successfully' },
      data: {
        type: 'object',
        properties: {
          primaryImage: {
            type: 'string',
            format: 'uri',
            description: 'S3 URL of the uploaded primary image',
            example: 'https://wellness-bucket.s3.amazonaws.com/dev/products/primary/550e8400-e29b-41d4-a716-446655440000.jpg'
          },
          secondaryImages: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uri'
            },
            description: 'Array of S3 URLs for secondary images',
            example: [
              'https://wellness-bucket.s3.amazonaws.com/dev/products/secondary/550e8400-e29b-41d4-a716-446655440001.jpg',
              'https://wellness-bucket.s3.amazonaws.com/dev/products/secondary/550e8400-e29b-41d4-a716-446655440002.jpg'
            ]
          }
        }
      }
    },
    required: ['success', 'message', 'data']
  });
}

// Configure security schemes
function setupSecurity() {
  addSecurityScheme('AdminAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'Admin authentication token required for protected endpoints'
  });
}

// Document all API endpoints
function setupEndpoints() {
  // Health check endpoint
  attachDoc('/health', 'GET', {
    tags: ['Health'],
    summary: 'Health check endpoint',
    description: 'Check if the API server is running and healthy',
    responses: {
      200: {
        description: 'Server is healthy',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/HealthResponse' }
          }
        }
      }
    }
  });

  // Upload product images endpoint
  attachDoc('/products/images', 'POST', {
    tags: ['Products'],
    summary: 'Upload product images',
    description: 'Upload primary and secondary images for products. Requires admin authentication. Supports 1 primary image and up to 5 secondary images.',
    security: [{ AdminAuth: [] }],
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              primaryImage: {
                type: 'string',
                format: 'binary',
                description: 'Primary product image (single file)'
              },
              secondaryImages: {
                type: 'array',
                items: {
                  type: 'string',
                  format: 'binary'
                },
                description: 'Secondary product images (up to 5 files)',
                maxItems: 5
              }
            }
          },
          encoding: {
            primaryImage: {
              contentType: 'image/*'
            },
            secondaryImages: {
              contentType: 'image/*'
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Images uploaded successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ImageUploadResponse' }
          }
        }
      },
      400: {
        description: 'Bad request - Invalid file format, size, or count',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            examples: {
              'file-too-large': {
                summary: 'File size error',
                value: {
                  success: false,
                  message: 'File too large. Maximum size is 10MB per file.'
                }
              },
              'invalid-file-type': {
                summary: 'Invalid file type',
                value: {
                  success: false,
                  message: 'Only image files are allowed!'
                }
              },
              'too-many-files': {
                summary: 'Too many files',
                value: {
                  success: false,
                  message: 'Too many files. Maximum is 1 primary image and 5 secondary images.'
                }
              }
            }
          }
        }
      },
      401: {
        description: 'Unauthorized - Missing or invalid admin token',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      500: {
        description: 'Internal server error - S3 upload failed',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });

  // Update product images endpoint
  attachDoc('/products/{uuid}/images', 'PUT', {
    tags: ['Products'],
    summary: 'Update product images by UUID',
    description: 'Update primary and/or secondary images for an existing product. Requires admin authentication. By default, new secondary images are added to existing ones. Use replaceAll=true to replace all secondary images.',
    security: [{ AdminAuth: [] }],
    parameters: [
      {
        name: 'uuid',
        in: 'path',
        description: 'Product UUID',
        required: true,
        schema: { type: 'string', format: 'uuid' },
        example: '550e8400-e29b-41d4-a716-446655440000'
      },
      {
        name: 'replaceAll',
        in: 'query',
        description: 'Replace all secondary images instead of adding to existing ones',
        required: false,
        schema: { type: 'string', enum: ['true', 'false'], default: 'false' },
        example: 'false'
      }
    ],
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              primaryImage: {
                type: 'string',
                format: 'binary',
                description: 'New primary product image (optional)'
              },
              secondaryImages: {
                type: 'array',
                items: {
                  type: 'string',
                  format: 'binary'
                },
                description: 'New secondary product images (optional, up to 5 files)',
                maxItems: 5
              }
            }
          },
          encoding: {
            primaryImage: {
              contentType: 'image/*'
            },
            secondaryImages: {
              contentType: 'image/*'
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Product images updated successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: true },
                message: { type: 'string', example: 'Product images updated successfully' },
                data: {
                  type: 'object',
                  properties: {
                    uuid: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' },
                    primaryImage: { type: 'string', example: 'https://wellness-bucket.s3.amazonaws.com/dev/products/primary/uuid.jpg' },
                    secondaryImages: {
                      type: 'array',
                      items: { type: 'string' },
                      example: ['https://wellness-bucket.s3.amazonaws.com/dev/products/secondary/uuid1.jpg']
                    },
                    updatedFields: {
                      type: 'array',
                      items: { type: 'string' },
                      example: ['primaryImage', 'secondaryImages']
                    }
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Bad request - Invalid file format, size, count, or no images uploaded',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      401: {
        description: 'Unauthorized - Missing or invalid admin token',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      404: {
        description: 'Product not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      500: {
        description: 'Internal server error - S3 upload or database update failed',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });

  // Create product endpoint
  attachDoc('/products', 'POST', {
    tags: ['Products'],
    summary: 'Create a new product',
    description: 'Create a new product in the system. Requires admin authentication.',
    security: [{ AdminAuth: [] }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/CreateProductRequest' },
          examples: {
            'wellness-supplement': {
              summary: 'Wellness Supplement Example',
              value: {
                title: 'Premium Wellness Supplement',
                subtitle: 'Advanced Health Formula for Daily Vitality',
                description: 'A comprehensive wellness supplement designed to boost your daily energy and support overall health with natural ingredients.',
                price: 99.99,
                discountedPrice: 79.99,
                highlighterText: 'Limited Time Offer!',
                numberOfPurchases: 0,
                userRating: 4.5,
                productSpecification: {
                  weight: '500g',
                  ingredients: ['Vitamin C', 'Zinc', 'Magnesium'],
                  servingsPerContainer: 30,
                  dosage: '2 capsules daily'
                }
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Product created successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/SuccessResponse' }
          }
        }
      },
      400: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      401: {
        description: 'Unauthorized - Missing or invalid admin token',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      500: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });

  // Get top selling products endpoint
  attachDoc('/products/top-selling', 'GET', {
    tags: ['Products'],
    summary: 'Get top selling products',
    description: 'Retrieve a list of top selling products sorted by number of purchases and user ratings.',
    parameters: [
      {
        name: 'limit',
        in: 'query',
        description: 'Maximum number of top selling products to return',
        required: false,
        schema: { type: 'integer', minimum: 1, maximum: 50, default: 8 },
        example: 8
      }
    ],
    responses: {
      200: {
        description: 'Top selling products retrieved successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: true },
                message: { type: 'string', example: 'Top selling products retrieved successfully' },
                data: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Product' }
                }
              }
            }
          }
        }
      },
      500: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });

  // Get all products endpoint
  attachDoc('/products', 'GET', {
    tags: ['Products'],
    summary: 'Get all active products',
    description: 'Retrieve a paginated list of all active products with optional filtering and search capabilities.',
    parameters: [
      {
        name: 'page',
        in: 'query',
        description: 'Page number for pagination',
        required: false,
        schema: { type: 'integer', minimum: 1, default: 1 },
        example: 1
      },
      {
        name: 'limit',
        in: 'query',
        description: 'Number of products per page',
        required: false,
        schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
        example: 10
      },
      {
        name: 'sortBy',
        in: 'query',
        description: 'Field to sort by',
        required: false,
        schema: { 
          type: 'string',
          enum: ['createdAt', 'updatedAt', 'price', 'userRating', 'numberOfPurchases', 'title'],
          default: 'createdAt'
        },
        example: 'createdAt'
      },
      {
        name: 'sortOrder',
        in: 'query',
        description: 'Sort order',
        required: false,
        schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' },
        example: 'desc'
      },
      {
        name: 'search',
        in: 'query',
        description: 'Search term to filter products by title, description, or highlighter text',
        required: false,
        schema: { type: 'string' },
        example: 'wellness'
      },
      {
        name: 'minPrice',
        in: 'query',
        description: 'Minimum price filter',
        required: false,
        schema: { type: 'number', minimum: 0 },
        example: 50
      },
      {
        name: 'maxPrice',
        in: 'query',
        description: 'Maximum price filter',
        required: false,
        schema: { type: 'number', minimum: 0 },
        example: 200
      },
      {
        name: 'minRating',
        in: 'query',
        description: 'Minimum rating filter',
        required: false,
        schema: { type: 'number', minimum: 0, maximum: 5 },
        example: 4
      }
    ],
    responses: {
      200: {
        description: 'Products retrieved successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/PaginatedProductResponse' }
          }
        }
      },
      500: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });

  // Get product by UUID endpoint
  attachDoc('/products/{uuid}', 'GET', {
    tags: ['Products'],
    summary: 'Get product by UUID',
    description: 'Retrieve a single active product by its unique identifier.',
    parameters: [
      {
        name: 'uuid',
        in: 'path',
        description: 'Product UUID',
        required: true,
        schema: { type: 'string', format: 'uuid' },
        example: '550e8400-e29b-41d4-a716-446655440000'
      }
    ],
    responses: {
      200: {
        description: 'Product retrieved successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/SuccessResponse' }
          }
        }
      },
      404: {
        description: 'Product not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      500: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });

  // Update product endpoint
  attachDoc('/products/{uuid}', 'PUT', {
    tags: ['Products'],
    summary: 'Update product',
    description: 'Update an existing product. Requires admin authentication.',
    security: [{ AdminAuth: [] }],
    parameters: [
      {
        name: 'uuid',
        in: 'path',
        description: 'Product UUID',
        required: true,
        schema: { type: 'string', format: 'uuid' },
        example: '550e8400-e29b-41d4-a716-446655440000'
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/UpdateProductRequest' },
          examples: {
            'price-update': {
              summary: 'Update Price Example',
              value: {
                price: 89.99,
                discountedPrice: 69.99
              }
            },
            'content-update': {
              summary: 'Update Content Example',
              value: {
                title: 'Updated Premium Wellness Supplement',
                description: 'Updated comprehensive wellness supplement with improved formula.',
                highlighterText: 'New & Improved!'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Product updated successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/SuccessResponse' }
          }
        }
      },
      400: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      401: {
        description: 'Unauthorized - Missing or invalid admin token',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      404: {
        description: 'Product not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      500: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });

  // Delete product endpoint
  attachDoc('/products/{uuid}', 'DELETE', {
    tags: ['Products'],
    summary: 'Delete product (soft delete)',
    description: 'Soft delete a product by setting isActive to false. Requires admin authentication.',
    security: [{ AdminAuth: [] }],
    parameters: [
      {
        name: 'uuid',
        in: 'path',
        description: 'Product UUID',
        required: true,
        schema: { type: 'string', format: 'uuid' },
        example: '550e8400-e29b-41d4-a716-446655440000'
      }
    ],
    responses: {
      200: {
        description: 'Product deleted successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/SuccessResponse' }
          }
        }
      },
      401: {
        description: 'Unauthorized - Missing or invalid admin token',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      404: {
        description: 'Product not found or already deleted',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      500: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });

  // Add product to cart endpoint
  attachDoc('/cart/add', 'POST', {
    tags: ['Cart'],
    summary: 'Add product to cart',
    description: 'Add a product to an existing cart (when UUID is provided) or create a new cart automatically.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/AddToCartRequest' },
          examples: {
            'new-cart': {
              summary: 'Create new cart with product',
              value: {
                productId: 'premium-wellness-supplement',
                quantity: 1
              }
            },
            'existing-cart': {
              summary: 'Add to existing cart',
              value: {
                uuid: '5f7b2c20-4d8c-4afd-9f2b-4e439b8b8a55',
                productId: '550e8400-e29b-41d4-a716-446655440000',
                quantity: 2
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Product added to cart successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: true },
                message: { type: 'string', example: 'Product added to cart successfully' },
                data: {
                  type: 'object',
                  properties: {
                    cartUuid: {
                      type: 'string',
                      format: 'uuid',
                      example: '5f7b2c20-4d8c-4afd-9f2b-4e439b8b8a55'
                    },
                    cart: { $ref: '#/components/schemas/Cart' },
                    addedProduct: { $ref: '#/components/schemas/CartProduct' }
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Validation error or missing data',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      404: {
        description: 'Product or cart not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      500: {
        description: 'Failed to add product to cart',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });

  // List carts endpoint
  attachDoc('/cart', 'GET', {
    tags: ['Cart'],
    summary: 'List carts with filters',
    description: 'Retrieve paginated carts with optional filters for status, date range, customer name, or phone number. Useful for administrative dashboards.',
    parameters: [
      {
        name: 'status',
        in: 'query',
        description: 'Filter carts by status',
        required: false,
        schema: {
          type: 'string',
          enum: ['CART', 'CHECKOUT', 'PLACED', 'FAILED', 'SHIPPED']
        }
      },
      {
        name: 'startDate',
        in: 'query',
        description: 'Filter carts created on or after this ISO date (yyyy-mm-dd)',
        required: false,
        schema: { type: 'string', format: 'date' }
      },
      {
        name: 'endDate',
        in: 'query',
        description: 'Filter carts created on or before this ISO date (yyyy-mm-dd)',
        required: false,
        schema: { type: 'string', format: 'date' }
      },
      {
        name: 'name',
        in: 'query',
        description: 'Case-insensitive substring search on the customer name',
        required: false,
        schema: { type: 'string' }
      },
      {
        name: 'phoneNumber',
        in: 'query',
        description: 'Case-insensitive substring search on the stored phone number',
        required: false,
        schema: { type: 'string' }
      },
      {
        name: 'pageNumber',
        in: 'query',
        description: 'Page number for paginated results (defaults to 1)',
        required: false,
        schema: { type: 'integer', minimum: 1, default: 1 }
      }
    ],
    responses: {
      200: {
        description: 'Carts retrieved successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CartListResponse' }
          }
        }
      },
      400: {
        description: 'Invalid filter parameters provided',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      500: {
        description: 'Failed to retrieve carts',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });

  attachDoc('/cart/checkout/{uuid}', 'POST', {
    tags: ['Cart'],
    summary: 'Checkout cart',
    description: 'Finalize a cart by providing shipping (and optional billing) address data. The cart UUID is supplied as a path parameter.',
    parameters: [
      {
        name: 'uuid',
        in: 'path',
        description: 'Cart UUID to checkout',
        required: true,
        schema: { type: 'string', format: 'uuid' },
        example: '5f7b2c20-4d8c-4afd-9f2b-4e439b8b8a55'
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/CheckoutCartRequest' },
          examples: {
            default: {
              summary: 'Checkout payload',
              value: {
                shippingAddress: {
                  addressLine1: '221B Baker Street',
                  addressLine2: 'Apartment 4B',
                  landmark: 'Near City Museum',
                  pincode: '560001',
                  city: 'Bengaluru',
                  state: 'Karnataka',
                  office: 'Bangalore G.P.O.'
                },
                billingAddress: {
                  addressLine1: '742 Evergreen Terrace',
                  addressLine2: null,
                  landmark: 'Springfield Elementary',
                  pincode: '560002',
                  city: 'Bengaluru',
                  state: 'Karnataka',
                  office: 'Ashok Nagar S.O'
                }
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Cart checked out successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CartResponse' }
          }
        }
      },
      400: {
        description: 'Validation error or cart not in a checkout-ready state',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      404: {
        description: 'Cart not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      500: {
        description: 'Failed to checkout cart',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });

  attachDoc('/cart/{uuid}/dispatch', 'GET', {
    tags: ['Cart'],
    summary: 'Mark cart as shipped',
    description: 'Update the cart status to SHIPPED once the order has been dispatched. Only carts in PLACED status can transition to SHIPPED.',
    parameters: [
      {
        name: 'uuid',
        in: 'path',
        description: 'Cart UUID to dispatch',
        required: true,
        schema: { type: 'string', format: 'uuid' },
        example: '5f7b2c20-4d8c-4afd-9f2b-4e439b8b8a55'
      }
    ],
    responses: {
      200: {
        description: 'Cart marked as shipped successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CartResponse' }
          }
        }
      },
      400: {
        description: 'Cart not in a state that permits dispatch',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      404: {
        description: 'Cart not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      500: {
        description: 'Dispatch attempt failed due to server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });

  // Get cart by UUID endpoint
  attachDoc('/cart/{uuid}', 'GET', {
    tags: ['Cart'],
    summary: 'Get cart by UUID',
    description: 'Retrieve an existing cart by its UUID.',
    parameters: [
      {
        name: 'uuid',
        in: 'path',
        description: 'Cart UUID to fetch',
        required: true,
        schema: { type: 'string', format: 'uuid' },
        example: '5f7b2c20-4d8c-4afd-9f2b-4e439b8b8a55'
      }
    ],
    responses: {
      200: {
        description: 'Cart retrieved successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CartResponse' }
          }
        }
      },
      404: {
        description: 'Cart not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      500: {
        description: 'Failed to retrieve cart',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });

  // Postal lookup endpoint
  attachDoc('/postal/pincode/{pincode}', 'GET', {
    tags: ['Postal'],
    summary: 'Get location details by pincode',
    description: 'Fetch city, state, and related postal information for a 6-digit Indian pincode using the India Post public API.',
    parameters: [
      {
        name: 'pincode',
        in: 'path',
        description: '6-digit Indian postal pincode',
        required: true,
        schema: { type: 'string', pattern: '^\\d{6}$' },
        example: '560001'
      }
    ],
    responses: {
      200: {
        description: 'Location data retrieved successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: true },
                message: { type: 'string', example: 'Location data retrieved successfully' },
                data: {
                  type: 'object',
                  properties: {
                    state: { type: 'string', example: 'Karnataka' },
                    city: { type: 'string', example: 'Bengaluru' },
                    region: { type: 'string', example: 'Bangalore HQ Region' },
                    country: { type: 'string', example: 'India' },
                    offices: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: { type: 'string', example: 'Bangalore G.P.O.' },
                          branchType: { type: 'string', example: 'Head Post Office' },
                          deliveryStatus: { type: 'string', example: 'Delivery' },
                          district: { type: 'string', example: 'Bangalore' },
                          division: { type: 'string', example: 'Bangalore East' },
                          state: { type: 'string', example: 'Karnataka' },
                          region: { type: 'string', example: 'Bangalore HQ Region' },
                          country: { type: 'string', example: 'India' },
                          pincode: { type: 'string', example: '560001' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Invalid pincode supplied',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            examples: {
              invalidPincode: {
                summary: 'Validation error',
                value: {
                  success: false,
                  message: 'A valid 6-digit pincode is required'
                }
              }
            }
          }
        }
      },
      404: {
        description: 'Pincode not found or no data available',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      },
      500: {
        description: 'Failed to fetch location data',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    }
  });
}

// Initialize all documentation
function initializeSwaggerDocs() {
  setupSchemas();
  setupSecurity();
  setupEndpoints();
}

module.exports = { initializeSwaggerDocs, getSpec };