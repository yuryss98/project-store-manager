const { salesService } = require('../services');
const httpStatusCode = require('../utils/httpStatusCode');
const errorMap = require('../utils/errorMap');

const createSales = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.createSales(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(httpStatusCode.CREATED).json(message);
};

module.exports = {
  createSales,
};