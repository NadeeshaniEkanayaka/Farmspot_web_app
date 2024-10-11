const { Product, AdditionalImage } = require('../models');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for single and multiple file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadSingle = multer({ storage }).single('mainImage');
const uploadMultiple = multer({ storage }).array('additionalImages', 5);

// Add Product with main image upload
exports.addProduct = async (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }

    try {
      const { name, uid, price, description, pprice, category, stock, product_lat, product_lng } = req.body;

      // Get only the relative path of the uploaded file
      const relativePath = path.relative(process.cwd(), req.file.path);

      const product = await Product.create({
        name,
        uid,
        price,
        description,
        mainImage: `/${relativePath}`, // Ensure it starts with '/'
        pprice,
        category,
        stock,
        product_lat,
        product_lng,
      });

      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  });
};


// Add Additional Images
exports.addAdditionalImages = async (req, res) => {
  uploadMultiple(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const mainImage = req.body.mainImage;
      const additionalImages = req.files.map((file) => ({
        imagePath: file.path,
        mainImage,
      }));

      const addedImages = await AdditionalImage.bulkCreate(additionalImages);
      res.status(201).json(addedImages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

// Delete additional images by main image
exports.deleteAdditionalImagesByMainImage = async (req, res) => {
  try {
    const { mainImage } = req.params;
    await AdditionalImage.destroy({ where: { mainImage } });
    res.status(200).json({ message: 'Additional images deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete additional image by ID
exports.deleteAdditionalImageById = async (req, res) => {
  try {
    const { id } = req.params;
    await AdditionalImage.destroy({ where: { id } });
    res.status(200).json({ message: 'Additional image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View Product by ID
exports.viewProductById = async (req, res) => {
  try {
    const { uid } = req.params;
    const products = await Product.findAll({
      where: {
        uid: uid
      }
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'Products not found' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.viewProductById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findAll({
      where: {
        id: id
      }
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'Products not found' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// View All Products
exports.viewAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Exported function to generate a URL for an image in the uploads folder
exports.generateImageUrl = (req, imagePath) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const fullImagePath = path.join('uploads', imagePath);

  return `${baseUrl}/${fullImagePath}`;
};


// Delete Product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete associated additional images if any
    await AdditionalImage.destroy({ where: { mainImage: product.mainImage } });

    // Delete the product
    await product.destroy();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};
