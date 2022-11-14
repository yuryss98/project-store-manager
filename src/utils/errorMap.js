const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
  SALE_NOT_FOUND: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};