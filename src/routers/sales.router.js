const router = require('express').Router();
const { salesController } = require('../controllers');

router.post('/', salesController.createSales);

module.exports = router;