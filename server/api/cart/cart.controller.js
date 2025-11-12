const Cart = require('./cart.model');
const Product = require('../products/product.model');
const Config = require('../config/config.model');

/**
 * Add product to cart
 * @route POST /api/cart/add
 * @access Public
 */
const addToCart = async (req, res) => {
  try {
    const { uuid, productId, quantity = 1 } = req.body;

    // Validate required fields
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0'
      });
    }

    // Find the product by UUID or URI
    let product = await Product.findOne({ uuid: productId, isActive: true });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    let cart;

    if (uuid) {
      // If cart UUID is provided, find existing cart
      cart = await Cart.findOne({ uuid, cartStatus: 'CART' });
      
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }
    } else {
      // If no cart UUID provided, create new cart
      cart = new Cart({
        products: [],
        cartStatus: 'CART'
      });
    }

    // Prepare product data for cart
    const cartProductData = {
      productId: product._id,
      productUuid: product.uuid,
      title: product.title,
      price: product.price,
      discountedPrice: product.discountedPrice,
      quantity: parseInt(quantity),
      primaryImage: product.primaryImage
    };

    // Add product to cart using the model method
    const updatedCart = await cart.addProduct(cartProductData);

    res.status(200).json({
      success: true,
      message: 'Product added to cart successfully',
      data: {
        cartUuid: updatedCart.uuid,
        cart: updatedCart,
        addedProduct: cartProductData
      }
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Cart with this UUID already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to add product to cart',
      error: error.message
    });
  }
};

/**
 * Get cart by UUID
 * @route GET /api/cart/:uuid
 * @access Public
 */
const getCartByUuid = async (req, res) => {
  try {
    const { uuid } = req.params;

    if (!uuid) {
      return res.status(400).json({
        success: false,
        message: 'Cart UUID is required'
      });
    }

    const cart = await Cart.findOne({ uuid });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cart retrieved successfully',
      data: cart
    });

  } catch (error) {
    console.error('Get cart error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cart',
      error: error.message
    });
  }
};

/**
 * Checkout cart
 * @route POST /api/cart/checkout?uuid=
 * @access Public
 */
const checkoutCart = async (req, res) => {
  try {
    const { uuid } = req.params;
    const { shippingAddress, billingAddress } = req.body;

    if (!uuid) {
      return res.status(400).json({
        success: false,
        message: 'Cart UUID is required',
      });
    }

    const cart = await Cart.findOne({ uuid });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    if (cart.cartStatus !== 'CART') {
      return res.status(400).json({
        success: false,
        message: 'Cart is not in a checkout-ready state',
      });
    }

    cart.shippingAddress = shippingAddress;
    cart.billingAddress = billingAddress || shippingAddress;
    cart.cartStatus = 'PLACED';
    const config = await Config.getValue('orderId', 0);
    cart.orderNumber = `ORD-${config + 1}`;
    cart.name =shippingAddress?.name || '';
    cart.number =shippingAddress?.phoneNumber || '';

    await Config.setValue('orderId', config + 1);

    await cart.save();

    return res.status(200).json({
      success: true,
      message: 'Cart checked out successfully',
      data: cart,
    });
  } catch (error) {
    console.error('Checkout cart error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to checkout cart',
      error: error.message,
    });
  }
};

/**
 * List carts with filters
 * @route GET /api/cart
 * @access Public (consider securing for admin use)
 */
const getCarts = async (req, res) => {
  try {
    const {
      status,
      startDate,
      endDate,
      name,
      phoneNumber,
      pageNumber,
    } = req.query;

    const page = Number(pageNumber) || 1;
    const PAGE_SIZE = 10;

    const filters = {};

    if (status) {
      filters.cartStatus = status;
    }

    if (startDate || endDate) {
      filters.createdAt = {};

      if (startDate) {
        filters.createdAt.$gte = new Date(startDate);
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filters.createdAt.$lte = end;
      }
    }

    if (name) {
      filters.name = { $regex: name, $options: 'i' };
    }

    if (phoneNumber) {
      filters.number = { $regex: phoneNumber, $options: 'i' };
    }

    const skip = (page - 1) * PAGE_SIZE;

    const [carts, total] = await Promise.all([
      Cart.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE),
      Cart.countDocuments(filters),
    ]);

    return res.status(200).json({
      success: true,
      message: 'Carts retrieved successfully',
      data: carts,
      pagination: {
        page,
        pageSize: PAGE_SIZE,
        total,
        pages: Math.ceil(total / PAGE_SIZE),
      },
    });
  } catch (error) {
    console.error('Get carts error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve carts',
      error: error.message,
    });
  }
};

/**
 * Mark cart as dispatched
 * @route GET /api/cart/:uuid/dispatch
 * @access Public (consider securing if needed)
 */
const dispatchCart = async (req, res) => {
  try {
    const { uuid } = req.params;

    if (!uuid) {
      return res.status(400).json({
        success: false,
        message: 'Cart UUID is required',
      });
    }

    const cart = await Cart.findOne({ uuid });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    if (cart.cartStatus === 'SHIPPED') {
      return res.status(200).json({
        success: true,
        message: 'Cart is already marked as shipped',
        data: cart,
      });
    }

    if (cart.cartStatus !== 'PLACED') {
      return res.status(400).json({
        success: false,
        message: 'Cart must be in PLACED status before it can be shipped',
      });
    }

    cart.cartStatus = 'SHIPPED';
    await cart.save();

    return res.status(200).json({
      success: true,
      message: 'Cart status updated to SHIPPED',
      data: cart,
    });
  } catch (error) {
    console.error('Dispatch cart error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to dispatch cart',
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCartByUuid,
  checkoutCart,
  getCarts,
  dispatchCart,
};