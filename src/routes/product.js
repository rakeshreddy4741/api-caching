const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const cache = require('../middleware/cache');

router.get('/', cache, productController.getAllProducts);
router.get('/:id', cache, productController.getProductById);

router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
