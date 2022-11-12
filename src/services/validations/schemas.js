const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
}).required().messages({
  'any.required': '{#label} is required',
  'string.min': '{#label} length must be at least {#limit} characters long',
});

const createSalesSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
}).required();

module.exports = {
  addProductSchema,
  createSalesSchema,
};