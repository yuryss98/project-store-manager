const camelize = require('camelize');
const connection = require('./connection');

const insertSalesDate = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales VALUES ()',
  );

  return insertId;
};

const insertSalesProduct = async (saleId, sales) => {
  const [{ affectedRows }] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, ...Object.values(sales)],
  );

  return affectedRows;
};

const findAll = async () => {
  const [data] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id,  sp.quantity
      FROM
        StoreManager.sales AS s
      INNER JOIN
        StoreManager.sales_products AS sp
      ON
        s.id = sp.sale_id
      ORDER BY
        sp.sale_id, sp.product_id;`,
  );

  return camelize(data);
};

const findById = async (id) => {
  const [data] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
      FROM
        StoreManager.sales AS s
      INNER JOIN
        StoreManager.sales_products AS sp
      ON
        s.id = sp.sale_id
      WHERE
        sp.sale_id = ?
      ORDER BY
        sp.sale_id, sp.product_id;`,
    [id],
  );

  return camelize(data);
};

const deleteSale = async (id) => {
  await connection.execute(
    `DELETE FROM sales
      WHERE id = ?`,
    [id],
  );
};

const update = async (saleId, sales) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE sales_products
      SET  quantity = ?
      WHERE sale_id = ? AND product_id= ?`,
    [sales.quantity, saleId, sales.productId],
  );

  return affectedRows;
};

module.exports = {
  insertSalesDate,
  insertSalesProduct,
  findAll,
  findById,
  deleteSale,
  update,
};