const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.findAll();

  return { type: null, message: products };
};

const getById = async (id) => {
  const product = await productsModel.findById(id);

  if (product) return { type: null, message: product };

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  getAll,
  getById,
};