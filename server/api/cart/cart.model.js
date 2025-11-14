const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Address sub-schema
const addressSchema = new mongoose.Schema({
  addressLine1: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  addressLine2: {
    type: String,
    trim: true,
    maxlength: 200
  },
  landmark: {
    type: String,
    trim: true,
    maxlength: 100
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\d{6}$/.test(v); // Indian pincode format
      },
      message: 'Pincode must be 6 digits'
    }
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  state: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  office: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  }
}, {
  _id: false // Disable _id for sub-documents
});

// Product item sub-schema for cart
const cartProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    ref: 'Product'
  },
  productUuid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountedPrice: {
    type: Number,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  primaryImage: {
    type: String,
    required: true
  }
}, {
  _id: false // Disable _id for sub-documents
});

// Main cart schema
const cartSchema = new mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
    default: uuidv4,
    required: true
  },
  products: [{
    type: cartProductSchema,
    required: true
  }],
  totalValue: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  totalDiscount: {
    type: Number,
    min: 0,
    default: 0
  },
  cartStatus: {
    type: String,
    required: true,
    enum: ['CART', 'CHECKOUT', 'PLACED', 'FAILED', 'SHIPPED'],
    default: 'CART'
  },
  name: {
    type: String,
    required: false,
    trim: true,
    maxlength: 100
  },
  orderNumber: {
    type: String,
    required: false,
    trim: true,
    maxlength: 100
  },
  number: {
    type: String,
    required: false,
    trim: true,
    // validate: {
    //   validator: function(v) {
    //     return /^[6-9]\d{9}$/.test(v); // Indian mobile number format
    //   },
    //   message: 'Number must be a valid 10-digit Indian mobile number'
    // }
  },
  shippingAddress: {
    type: addressSchema,
    required: false
  },
  billingAddress: {
    type: addressSchema,
    required: false
  }
}, {
  timestamps: true, // This automatically adds createdAt and updatedAt fields
  versionKey: false
});

// Indexes for better query performance
cartSchema.index({ uuid: 1 });
cartSchema.index({ cartStatus: 1 });
cartSchema.index({ number: 1 });
cartSchema.index({ createdAt: -1 });

// Virtual for calculating final total after discount
cartSchema.virtual('finalTotal').get(function() {
  return Math.max(0, this.totalValue - this.totalDiscount);
});

// Virtual for calculating total items in cart
cartSchema.virtual('totalItems').get(function() {
  return this.products.reduce((total, product) => total + product.quantity, 0);
});

// Pre-save middleware to ensure UUID is generated and calculate totals
cartSchema.pre('save', function(next) {
  if (!this.uuid) {
    this.uuid = uuidv4();
  }
  
  // Calculate total value and discount
  if (this.products && this.products.length > 0) {
    let totalValue = 0;
    let totalDiscount = 0;
    
    this.products.forEach(product => {
      const originalPrice = product.price * product.quantity;
      const discountedPrice = product.discountedPrice 
        ? product.discountedPrice * product.quantity 
        : originalPrice;
      
      totalValue += originalPrice;
      totalDiscount += (originalPrice - discountedPrice);
    });
    
    this.totalValue = totalValue;
    this.totalDiscount = totalDiscount;
  } else {
    this.totalValue = 0;
    this.totalDiscount = 0;
  }
  
  next();
});

// Method to add product to cart
cartSchema.methods.addProduct = function(productData) {
  const existingProductIndex = this.products.findIndex(
    p => p.productUuid === productData.productUuid
  );
  
  if (existingProductIndex > -1) {
    // If product exists, update quantity
    if (productData.quantity===0) {
      this.products.splice(existingProductIndex, 1);
    }else{
        this.products[existingProductIndex].quantity = productData.quantity

    }
  } else {
    // If product doesn't exist, add new product
    this.products.push(productData);
  }
  
  return this.save();
};

// Method to remove product from cart
cartSchema.methods.removeProduct = function(productUuid) {
  this.products = this.products.filter(p => p.productUuid !== productUuid);
  return this.save();
};

// Method to update product quantity
cartSchema.methods.updateProductQuantity = function(productUuid, quantity) {
  const productIndex = this.products.findIndex(p => p.productUuid === productUuid);
  
  if (productIndex > -1) {
    if (quantity <= 0) {
      // Remove product if quantity is 0 or less
      this.products.splice(productIndex, 1);
    } else {
      // Update quantity
      this.products[productIndex].quantity = quantity;
    }
  }
  
  return this.save();
};

// Method to clear cart
cartSchema.methods.clearCart = function() {
  this.products = [];
  return this.save();
};

// Transform function to include virtuals in JSON output
cartSchema.set('toJSON', { 
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._id;
    return ret;
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;