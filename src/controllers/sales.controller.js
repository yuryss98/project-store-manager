const { salesService } = require('../services');
const httpStatusCode = require('../utils/httpStatusCode');
const errorMap = require('../utils/errorMap');

const createSales = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.createSales(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(httpStatusCode.CREATED).json(message);
};

const getSales = async (_req, res) => {
  const { message } = await salesService.getSales();

  return res.status(httpStatusCode.OK).json(message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.getSalesById(Number(id));

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(httpStatusCode.OK).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.deleteSale(Number(id));

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(httpStatusCode.NO_CONTENT).end();
};

const updateSale = async (req, res) => {
  const { id } = req.params;

  const sales = req.body;

  const { type, message } = await salesService.updateSale(Number(id), sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(httpStatusCode.OK).json(message);
};

module.exports = {
  createSales,
  getSales,
  getSalesById,
  deleteSale,
  updateSale,
};