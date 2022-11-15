const { addProductSchema, createSalesSchema } = require('./schemas');

const checkErrorType = (error) => {
  if (error.message.includes('is required')) {
    return { type: 'BAD_REQUEST', message: error.message };
  }

  return { type: 'UNPROCESSABLE_ENTITY', message: error.message };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema
    .validate({ name });
  
  if (error) return checkErrorType(error);

  return { type: null, message: '' };
};

const validateNewSale = (sales) => {
  const validate = sales.map((sale) => createSalesSchema.validate(sale));

  const findError = validate.find((err) => err.error);

  if (findError) {
    const { error } = findError;

    return checkErrorType(error);
  }

  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
  validateNewSale,
};