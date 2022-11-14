const router = require('express').Router();
const { salesController } = require('../controllers');

router.get('/', salesController.getSales);

router.post('/', salesController.createSales);

router.get('/:id', salesController.getSalesById);

module.exports = router;