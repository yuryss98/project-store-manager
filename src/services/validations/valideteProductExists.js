const { productsModel } = require('../../models');

const validateProductExists = async (sales) => {
  let productNotFound = 0;

  const result = sales.map(async ({ productId }) => {
    const data = await productsModel.findById(productId);

    if (data === undefined) {
      productNotFound += 1;

      return productNotFound;
    }

    return data;
  });

  await Promise.all(result);

  if (productNotFound > 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  validateProductExists,
};