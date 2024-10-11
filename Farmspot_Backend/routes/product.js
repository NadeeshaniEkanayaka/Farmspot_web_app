const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Routes for product operations
router.post('/products/add', productController.addProduct);
router.get('/products/uid/:uid', productController.viewProductById);
router.get('/products/:id', productController.viewProductById2)
router.get('/products', productController.viewAllProducts);
router.delete('/products/delete/:id', productController.deleteProductById);

// Routes for additional images operations
router.delete('/products/additional-images/:mainImage', productController.deleteAdditionalImagesByMainImage);
router.delete('/products/additional-image/:id', productController.deleteAdditionalImageById);


module.exports = router;
