const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/', productsController.getProducts);

router.post('/', productsController.createProduct);

router.get('/:id', productsController.getProductById);

router.put('/:id', productsController.updateProduct);

module.exports = router;