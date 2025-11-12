const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
    default: uuidv4,
    required: true
  },
  primaryImage: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.*\.amazonaws\.com\/.*/.test(v) || /^https?:\/\/.*s3.*\.amazonaws\.com\/.*/.test(v);
      },
      message: 'Primary image must be a valid S3 URL'
    }
  },
  secondaryImages: [{
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.*\.amazonaws\.com\/.*/.test(v) || /^https?:\/\/.*s3.*\.amazonaws\.com\/.*/.test(v);
      },
      message: 'Secondary images must be valid S3 URLs'
    }
  }],
  highlighterText: {
    type: String,
    trim: true,
    maxlength: 200
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function(v) {
        return v >= 0;
      },
      message: 'Price must be a positive number'
    }
  },
  discountedPrice: {
    type: Number,
    min: 0,
    validate: {
      validator: function(v) {
        if (v !== null && v !== undefined) {
          return v >= 0 && v <= this.price;
        }
        return true;
      },
      message: 'Discounted price must be positive and less than or equal to original price'
    }
  },
  numberOfPurchases: {
    type: Number,
    default: 0,
    min: 0
  },
  userRating: {
    type: Number,
    min: 0,
    max: 5,
    validate: {
      validator: function(v) {
        if (v !== null && v !== undefined) {
          return v >= 0 && v <= 5;
        }
        return true;
      },
      message: 'User rating must be between 0 and 5'
    }
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  uri: {
    type: String,
    unique: true,
    trim: true,
    index: true
  },
  subtitle: {
    type: String,
    trim: true,
    maxlength: 150
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  productSpecification: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true, // This automatically adds createdAt and updatedAt fields
  versionKey: false
});

// Indexes for better query performance
productSchema.index({ uuid: 1 });
productSchema.index({ uri: 1 });
productSchema.index({ title: 'text', description: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ userRating: -1 });
productSchema.index({ numberOfPurchases: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isActive: 1 });

// Virtual for calculating discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.discountedPrice && this.price > this.discountedPrice) {
    return Math.round(((this.price - this.discountedPrice) / this.price) * 100);
  }
  return 0;
});

// Virtual for final price (discounted price if available, otherwise original price)
productSchema.virtual('finalPrice').get(function() {
  return this.discountedPrice || this.price;
});

// Pre-save middleware to ensure UUID is generated and URI is created from title
productSchema.pre('save', function(next) {
  if (!this.uuid) {
    this.uuid = uuidv4();
  }
  
  // Generate URI from title if title is modified or if URI doesn't exist
  if (this.isModified('title') || !this.uri) {
    this.uri = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace one or more spaces with single hyphen
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  }
  
  next();
});

// Transform function to include virtuals in JSON output
productSchema.set('toJSON', { 
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._id;
    return ret;
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
