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

const getProductsByName = async (req, res) => {
  const { q } = req.query;

  const { type, message } = await productsService.getProductsByName(q);

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

  return res.status(httpStatusCode.OK).json({ id, name });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.deleteProduct(Number(id));

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(httpStatusCode.NO_CONTENT).end();
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByName,
};