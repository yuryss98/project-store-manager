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

module.exports = {
  findAll,
  findById,
};