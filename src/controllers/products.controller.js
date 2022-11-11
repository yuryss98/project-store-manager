const { productsService } = require('../services');
const httpStatusCode = require('../utils/httpStatusCode');

const getAll = async (_req, res) => {
  const { message } = await productsService.getAll();

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.getById(Number(id));

  if (type) return res.status(httpStatusCode.NotFound).json({ message });

  res.status(httpStatusCode.OK).json(message);
};

module.exports = {
  getAll,
  getById,
};