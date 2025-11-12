const express = require('express');
const swaggerUi = require('swagger-ui-express');
const router = express.Router();

// Import product-related modules
const productController = require('./products/product.controller');
const { createProductSchema, updateProductSchema } = require('./products/product.validator');

// Import cart-related modules
const cartController = require('./cart/cart.controller');
const {
  addToCartSchema,
  getCartByUuidSchema,
  checkoutCartBodySchema,
  checkoutCartParamsSchema,
  listCartsQuerySchema
} = require('./cart/cart.validator');

// Import postal modules
const postalController = require('./postal/postal.controller');

const { validateRequest, adminAuth } = require('./middlewares/middleware');
const { productImageUpload, handleMulterError } = require('./middlewares/upload');

// Import Swagger documentation
const { initializeSwaggerDocs, getSpec } = require('./swaggerDocs');

// Initialize Swagger documentation
initializeSwaggerDocs();

// Define your API routes here

// Swagger UI setup
const swaggerSpec = getSpec();
const swaggerOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Wellness API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    tryItOutEnabled: true,
    filter: true,
    docExpansion: 'list',
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
    displayRequestDuration: true
  }
};

// Swagger documentation routes
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerSpec, swaggerOptions));

// OpenAPI spec endpoint (JSON)
router.get('/docs/openapi.json', (req, res) => {
  res.json(swaggerSpec);
});

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});



router.put('/products/:identifier/images',

  [adminAuth,
  productImageUpload,
  handleMulterError,
  ],
  productController.updateProductImages
);

router.post('/products', 
  [adminAuth,
  validateRequest(createProductSchema, 'body'),
  ],
  productController.createProduct
);

router.get('/products', 
  productController.getAllProducts
);

router.get('/products/top-selling', 
  productController.getTopSellingProducts
);

router.get('/products/:identifier', 
  productController.getProductByIdentifier
);

router.put('/products/:identifier',
  [adminAuth,
  validateRequest(updateProductSchema, 'body'),
  ],
  productController.updateProduct
);

router.delete('/products/:identifier',
  [adminAuth],
  productController.deleteProduct
);

// Cart routes
router.post('/cart/add',
  validateRequest(addToCartSchema, 'body'),
  cartController.addToCart
);

router.post('/cart/checkout/:uuid',
  [
    validateRequest(checkoutCartParamsSchema, 'params'),
    validateRequest(checkoutCartBodySchema, 'body')
  ],
  cartController.checkoutCart
);

router.get('/cart',
  validateRequest(listCartsQuerySchema, 'query'),
  cartController.getCarts
);

router.get('/cart/:uuid/dispatch',
  validateRequest(getCartByUuidSchema, 'params'),
  cartController.dispatchCart
);

router.get('/cart/:uuid',
  validateRequest(getCartByUuidSchema, 'params'),
  cartController.getCartByUuid
);

// Postal utility routes
router.get('/postal/pincode/:pincode', postalController.getLocationByPincode);

module.exports = router;
