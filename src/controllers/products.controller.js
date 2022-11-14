const { productsService } = require('../services');
const httpStatusCode = require('../utils/httpStatusCode');
const errorMap = require('../utils/errorMap');

const getProducts = async (_req, res) => {
  const { message } = await productsService.getProducts();

  res.status(httpStatusCode.OK).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.getProductById(Number(id));

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(httpStatusCode.OK).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productsService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(httpStatusCode.CREATED).json({ id: message, name });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  const { type, message } = await productsService.updateProduct(Number(id), name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(httpStatusCode.OK).json({ id: message, name });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
};