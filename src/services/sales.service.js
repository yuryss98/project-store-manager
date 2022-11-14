const { validateNewSale } = require('./validations/validateInputValue');
const { validateProductExists } = require('./validations/valideteProductExists');
const { salesModel } = require('../models');

const createSales = async (sales) => {
  const invalidValues = validateNewSale(sales);
  if (invalidValues.type) return invalidValues;

  const productIsExists = await validateProductExists(sales);
  if (productIsExists.type) return productIsExists;

  const dateId = await salesModel.insertSalesDate();

  const salesProduct = sales.map(async (element) => {
    await salesModel.insertSalesProduct(dateId, element);
  });

  await Promise.all(salesProduct);

  return { type: null, message: { id: dateId, itemsSold: sales } };
};

const getAll = async () => {
  const products = await salesModel.findAll();

  return { type: null, message: products };
};

const getById = async (id) => {
  const product = await salesModel.findById(id);

  if (product.length) return { type: null, message: product };

  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

module.exports = {
  createSales,
  getAll,
  getById,
};