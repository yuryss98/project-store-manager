const { addProductSchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = addProductSchema
    .validate({ name });
  if (error) {
    if (error.message.includes('is required')) {
      return { type: 'BAD_REQUEST', message: error.message };
    }

    return { type: 'UNPROCESSABLE_ENTITY', message: error.message };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
};