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

const getSales = async () => {
  const sales = await salesModel.findAll();

  return { type: null, message: sales };
};

const getSalesById = async (id) => {
  const sales = await salesModel.findById(id);

  if (sales.length) return { type: null, message: sales };

  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const deleteSale = async (id) => {
  const findSales = await salesModel.findById(id);

  if (!findSales.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  await salesModel.deleteSale(id);

  return { type: null, message: '' };
};

const updateSale = async (id, sales) => {
  const invalidValues = validateNewSale(sales);
  if (invalidValues.type) return invalidValues;

  const productIsExists = await validateProductExists(sales);
  if (productIsExists.type) return productIsExists;

  const findSales = await salesModel.findById(id);

  if (!findSales.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const updatedSales = sales.map(async (element) => {
    await salesModel.update(id, element);
  });

  await Promise.all(updatedSales);

  return { type: null, message: { saleId: id, itemsUpdated: sales } };
};

module.exports = {
  createSales,
  getSales,
  getSalesById,
  deleteSale,
  updateSale,
};