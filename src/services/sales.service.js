const { validateNewSale } = require('./validations/validateInputValue');
const { productsModel } = require('../models');
const { salesModel } = require('../models');

const validateProductExists = async (sales) => {
  let productNotFound = 0;

  const result = sales.map(async ({ productId }) => {
    const data = await productsModel.findById(productId);

    if (data === undefined) {
      productNotFound += 1;

      return productNotFound;
    }

    return data;
  });

  await Promise.all(result);

  if (productNotFound > 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

const createSales = async (sales) => {
  const { type, message } = validateNewSale(sales);
  if (type) return { type, message };

  const productIsExists = await validateProductExists(sales);

  if (productIsExists.type) return productIsExists;

  const dateId = await salesModel.insertSalesDate();

  const salesProduct = sales.map(async (element) => {
    await salesModel.insertSalesProduct(dateId, element);
  });

  await Promise.all(salesProduct);

  return { type: null, message: { id: dateId, itemsSold: sales } };
};

module.exports = {
  createSales,
};