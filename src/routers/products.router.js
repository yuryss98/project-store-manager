const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductById);

module.exports = router;