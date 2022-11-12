const connection = require('./connection');

const findAll = async () => {
  const [data] = await connection.execute(
    'SELECT * FROM products',
  );

  return data;
};

const findById = async (id) => {
  const [[data]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );

  return data;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES(?)',
    [name],
  );

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};