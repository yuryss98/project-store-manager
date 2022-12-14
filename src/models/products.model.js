const connection = require('./connection');

const findAll = async () => {
  const [data] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return data;
};

const findById = async (id) => {
  const [[data]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return data;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES(?)',
    [name],
  );

  return insertId;
};

const update = async (id, name) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?`,
      [name, id],
  );

  return affectedRows;
};

const deleteProduct = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.products
      WHERE id = ?`,
    [id],
  );
};

const findByName = async (name) => {
  const [data] = await connection.execute(
    `SELECT * FROM StoreManager.products
      WHERE name LIKE ?`,
    [name],
  );

  return data;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteProduct,
  findByName,
};