const Product = require('./product.model');
const { asyncHandler } = require('../middlewares/middleware');
const { uploadFile } = require('../utils');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

/**
 * Create a new product
 * @route POST /api/products
 * @access Public (you may want to add authentication later)
 */
const createProduct = async (req, res) => {
  try {
    // Extract validated data from request body
    const {
      highlighterText,
      price,
      discountedPrice,
      numberOfPurchases,
      userRating,
      title,
      subtitle,
      description,
      productSpecification
    } = req.body;

    // For now, we'll use placeholder images since they're required
    // In a real application, you'd implement image upload functionality
    const primaryImage = "https://example.s3.amazonaws.com/placeholder-primary.jpg";
    const secondaryImages = [];

    // Create product data object
    const productData = {
      primaryImage,
      secondaryImages,
      highlighterText,
      price,
      discountedPrice,
      numberOfPurchases,
      userRating,
      title,
      subtitle,
      description,
      productSpecification
    };

    // Create new product instance
    const product = new Product(productData);

    // Save to database
    const savedProduct = await product.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct
    });

  } catch (error) {
    // If it's a validation error, let the error middleware handle it
    if (error.name === 'ValidationError') {
      throw error;
    }

    // For other errors, throw a generic server error
    const serverError = new Error('Failed to create product');
    serverError.statusCode = 500;
    throw serverError;
  }
};

/**
 * Get all products
 * @route GET /api/products
 * @access Public
 */
const getAllProducts =  async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
      minPrice,
      maxPrice,
      minRating
    } = req.query;

    // Build query object
    const query = { isActive: true }; // Only show active products


    // Add search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { highlighterText: { $regex: search, $options: 'i' } }
      ];
    }

    // Add price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Add rating filter
    if (minRating) {
      query.userRating = { $gte: parseFloat(minRating) };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    const serverError = new Error('Failed to retrieve products');
    serverError.statusCode = 500;
    throw serverError;
  }
};

/**
 * Get a single product by UUID or URI
 * @route GET /api/products/:identifier
 * @access Public
 */
const getProductByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;

    console.log('Identifier:', identifier); 

    // Try to find by UUID first, then by URI
    let product = await Product.findOne({ uuid: identifier, isActive: true });
    
    if (!product) {
      // If not found by UUID, try finding by URI
      product = await Product.findOne({ uri: identifier, isActive: true });
    }

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product
    });

  } catch (error) {
    if (error.statusCode === 404) {
      throw error;
    }

    const serverError = new Error('Failed to retrieve product');
    serverError.statusCode = 500;
    throw serverError;
  }
};

/**
 * Update a product
 * @route PUT /api/products/:uuid
 * @access Private (add authentication middleware when needed)
 */
const updateProduct = async (req, res) => {
  try {
    const { identifier } = req.params;
    const updateData = req.body;

    // Try to find by UUID first, then by URI
    let product = await Product.findOneAndUpdate(
      { uuid: identifier, isActive: true },
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      // If not found by UUID, try finding by URI
      product = await Product.findOneAndUpdate(
        { uri: identifier, isActive: true },
        updateData,
        { new: true, runValidators: true }
      );
    }

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });

  } catch (error) {
    if (error.statusCode === 404 || error.name === 'ValidationError') {
      throw error;
    }

    const serverError = new Error('Failed to update product');
    serverError.statusCode = 500;
    throw serverError;
  }
};

/**
 * Delete a product (soft delete - sets isActive to false)
 * @route DELETE /api/products/:uuid
 * @access Private (add authentication middleware when needed)
 */
const deleteProduct = async (req, res) => {
  try {
    const { identifier } = req.params;

    // Try to find by UUID first, then by URI
    let product = await Product.findOneAndUpdate(
      { uuid: identifier, isActive: true },
      { isActive: false },
      { new: true, runValidators: true }
    );

    if (!product) {
      // If not found by UUID, try finding by URI
      product = await Product.findOneAndUpdate(
        { uri: identifier, isActive: true },
        { isActive: false },
        { new: true, runValidators: true }
      );
    }

    if (!product) {
      const error = new Error('Product not found or already deleted');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: product
    });

  } catch (error) {
    if (error.statusCode === 404) {
      throw error;
    }

    const serverError = new Error('Failed to delete product');
    serverError.statusCode = 500;
    throw serverError;
  }
};


/**
 * Update product images by UUID
 * @route PUT /api/products/:uuid/images
 * @access Private (Admin only)
 */
const updateProductImages = async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Check if product exists and is active - try UUID first, then URI
    let existingProduct = await Product.findOne({ uuid: identifier, isActive: true });
    if (!existingProduct) {
      existingProduct = await Product.findOne({ uri: identifier, isActive: true });
    }
    
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const updateData = {};
    const uploadedImages = {
      primaryImage: existingProduct.primaryImage,
      secondaryImages: [...existingProduct.secondaryImages]
    };

    // Handle primary image upload
    if (req.files && req.files.primaryImage) {
      const primaryImageFile = req.files.primaryImage[0];
      const primaryImageExtension = path.extname(primaryImageFile.originalname);
      const primaryImageKey = `wellness/${process.env.ENV}/primary/${uuidv4()}${primaryImageExtension}`;
      
      try {
        await uploadFile({
          file: primaryImageFile,
          path: 'products',
          key: primaryImageKey
        });

        // Construct the S3 URL
        const primaryImageUrl = `https://easyrevwebpublic.s3.ap-south-1.amazonaws.com/${process.env.ENV}/products/${primaryImageKey}`;
        uploadedImages.primaryImage = primaryImageUrl;
        updateData.primaryImage = primaryImageUrl;
      } catch (error) {
        console.error('Primary image upload failed:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload primary image',
          error: error.message
        });
      }
    }

    // Handle secondary images upload
    if (req.files && req.files.secondaryImages) {
      const secondaryImageFiles = req.files.secondaryImages;
      const newSecondaryImages = [];
      
      for (const file of secondaryImageFiles) {
        try {
          const extension = path.extname(file.originalname);
          const imageKey = `wellness/${process.env.ENV}/secondary/${uuidv4()}${extension}`;
          
          await uploadFile({
            file: file,
            path: 'products',
            key: imageKey
          });

          // Construct the S3 URL
          const imageUrl = `https://easyrevwebpublic.s3.ap-south-1.amazonaws.com/${process.env.ENV}/products/${imageKey}`;
          newSecondaryImages.push(imageUrl);
        } catch (error) {
          console.error('Secondary image upload failed:', error);
          // Continue with other images even if one fails
        }
      }

      if (newSecondaryImages.length > 0) {
        // Replace or add to existing secondary images based on query parameter
        const { replaceAll } = req.query;
        
        if (replaceAll === 'true') {
          // Replace all secondary images
          uploadedImages.secondaryImages = newSecondaryImages;
          updateData.secondaryImages = newSecondaryImages;
        } else {
          // Add to existing secondary images
          uploadedImages.secondaryImages = [...existingProduct.secondaryImages, ...newSecondaryImages];
          updateData.secondaryImages = uploadedImages.secondaryImages;
        }
      }
    }

    // Check if any images were uploaded
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid images were uploaded'
      });
    }

    // Update the product in database
    const updatedProduct = await Product.findOneAndUpdate(
      { uuid: existingProduct.uuid, isActive: true },
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Product images updated successfully',
      data: {
        uuid: updatedProduct.uuid,
        primaryImage: updatedProduct.primaryImage,
        secondaryImages: updatedProduct.secondaryImages,
        updatedFields: Object.keys(updateData)
      }
    });

  } catch (error) {
    console.error('Image update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product images',
      error: error.message
    });
  }
};

/**
 * Get top selling products
 * @route GET /api/products/top-selling
 * @access Public
 */
const getTopSellingProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    // Get top selling products sorted by numberOfPurchases and userRating
    const products = await Product.find({ isActive: true })
      .sort({ 
        numberOfPurchases: -1,  // Primary sort: most purchased
        userRating: -1,         // Secondary sort: highest rated
        createdAt: -1           // Tertiary sort: newest
      })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      message: 'Top selling products retrieved successfully',
      data: products
    });

  } catch (error) {
    const serverError = new Error('Failed to retrieve top selling products');
    serverError.statusCode = 500;
    throw serverError;
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByIdentifier,
  updateProduct,
  deleteProduct,
  updateProductImages,
  getTopSellingProducts
};
