const router = require('express').Router();
const { salesController } = require('../controllers');

router.get('/', salesController.getSales);

router.post('/', salesController.createSales);

router.get('/:id', salesController.getSalesById);

router.put('/:id', salesController.updateSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;