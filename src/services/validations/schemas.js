const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
}).required().messages({
  'any.required': '{#label} is required',
  'string.min': '{#label} length must be at least {#limit} characters long',
});

module.exports = {
  addProductSchema,
};