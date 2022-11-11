const { productsModel } = require('../models');

const getProducts = async () => {
  const products = await productsModel.findAll();

  return { type: null, message: products };
};

const getProductById = async (id) => {
  const product = await productsModel.findById(id);

  if (product) return { type: null, message: product };

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  getProducts,
  getProductById,
};