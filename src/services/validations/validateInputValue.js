const { addProductSchema, createSalesSchema } = require('./schemas');

const validateError = (error) => {
  if (error) {
    if (error.message.includes('is required')) {
      return { type: 'BAD_REQUEST', message: error.message };
    }

    return { type: 'UNPROCESSABLE_ENTITY', message: error.message };
  }

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema
    .validate({ name });
  
  return validateError(error);
};

const validateNewSale = (sales) => {
  const validate = sales.map((element) => createSalesSchema.validate(element));

  const findError = validate.find((err) => err.error);

  if (findError) {
    const { error } = findError;

    return validateError(error);
  }

  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
  validateNewSale,
};