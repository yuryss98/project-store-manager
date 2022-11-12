const connection = require('./connection');

const insertSalesDate = async () => {
  const date = new Date();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [date],
  );

  return insertId;
};

const insertSalesProduct = async (saleId, sales) => {
  const data = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, ...Object.values(sales)],
  );

  return data;
};

module.exports = {
  insertSalesDate,
  insertSalesProduct,
};