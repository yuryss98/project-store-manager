const { salesService } = require('../services');
const httpStatusCode = require('../utils/httpStatusCode');
const errorMap = require('../utils/errorMap');

const createSales = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.createSales(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(httpStatusCode.CREATED).json(message);
};

const getAll = async (_req, res) => {
  const { message } = await salesService.getAll();

  return res.status(httpStatusCode.OK).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.getById(Number(id));

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(httpStatusCode.OK).json(message);
};

module.exports = {
  createSales,
  getAll,
  getById,
};