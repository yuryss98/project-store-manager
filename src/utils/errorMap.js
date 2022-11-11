const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};