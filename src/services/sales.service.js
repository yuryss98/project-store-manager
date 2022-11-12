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

module.exports = {
  createSales,
};