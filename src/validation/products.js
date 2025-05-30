import Joi from 'joi';

export const createProductsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 30 characters',
    'string.empty': 'Name is required!',
    'any.required': 'Name is required!',
  }),
  price: Joi.number().required().messages({
    'number.base': 'Price must be a number',
    'any.required': 'Price is required!',
  }),
  category: Joi.string()
    .valid('books', 'electronics', 'clothing', 'other')
    .required()
    .messages({
      'any.only':
        'Category must be one of: books, electronics, clothing, other',
      'string.empty': 'Category is required!',
      'any.required': 'Category is required!',
    }),
  description: Joi.string().allow('').messages({
    'string.base': 'Description should be a string',
  }),
});
