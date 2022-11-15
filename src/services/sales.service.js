const { validateNewSale } = require('./validations/validateInputValue');
const { validateProductExists } = require('./validations/valideteProductExists');
const { salesModel } = require('../models');

const createSales = async (sales) => {
  const invalidValues = validateNewSale(sales);
  if (invalidValues.type) return invalidValues;

  const productNotExists = await validateProductExists(sales);
  if (productNotExists.type) return productNotExists;

  const dateId = await salesModel.insertSalesDate();

  const insertSalesAndProducts = sales.map(async (sale) => {
    await salesModel.insertSalesProduct(dateId, sale);
  });

  await Promise.all(insertSalesAndProducts);

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
  const findSale = await salesModel.findById(id);

  if (!findSale.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  await salesModel.deleteSale(id);

  return { type: null, message: '' };
};

const updateSale = async (id, sales) => {
  const invalidValues = validateNewSale(sales);
  if (invalidValues.type) return invalidValues;

  const productNotExists = await validateProductExists(sales);
  if (productNotExists.type) return productNotExists;

  const findSale = await salesModel.findById(id);

  if (!findSale.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const updatedSale = sales.map(async (sale) => {
    await salesModel.update(id, sale);
  });

  await Promise.all(updatedSale);

  return { type: null, message: { saleId: id, itemsUpdated: sales } };
};

module.exports = {
  createSales,
  getSales,
  getSalesById,
  deleteSale,
  updateSale,
};