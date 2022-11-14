const router = require('express').Router();
const { salesController } = require('../controllers');

router.get('/', salesController.getAll);

router.post('/', salesController.createSales);

router.get('/:id', salesController.getById);

module.exports = router;