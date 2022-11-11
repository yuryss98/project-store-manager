const { productsModel } = require('../models');
require('express-async-errors');

const { validateNewProduct } = require('./validations/validateInputValue');

const getProducts = async () => {
  const products = await productsModel.findAll();

  return { type: null, message: products };
};

const getProductById = async (id) => {
  const product = await productsModel.findById(id);

  if (product) return { type: null, message: product };

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const createProduct = async (name) => {
  const { type, message } = validateNewProduct(name);

  if (type) return { type, message };

  const productId = await productsModel.insert(name);

  return { type: null, message: productId };
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};