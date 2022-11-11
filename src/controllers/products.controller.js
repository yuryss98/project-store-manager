const { productsService } = require('../services');
const httpStatusCode = require('../utils/httpStatusCode');

const getProducts = async (_req, res) => {
  const { message } = await productsService.getProducts();

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.getProductById(Number(id));

  if (type) return res.status(httpStatusCode.NotFound).json({ message });

  res.status(httpStatusCode.OK).json(message);
};

module.exports = {
  getProducts,
  getProductById,
};