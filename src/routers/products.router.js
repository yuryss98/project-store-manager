const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/', productsController.getProducts);

router.get('/search', productsController.getProductsByQuery);

router.post('/', productsController.createProduct);

router.get('/:id', productsController.getProductById);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;