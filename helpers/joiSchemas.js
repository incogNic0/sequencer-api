const { ExpressError, errorHandler, catchAsync } = require('./utils');
const Joi = require('joi');

const validUser = (req, res, next) => {
  const userSchema = Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(30)
      .alphanum()
      .required()
      .messages({
        'string.base': "Name must be text",
        'string.min': 'Name must be at least 2 characters.',
        'string.max': 'Name must be 30 characters or less.',
        'string.alphanum': 'Name must only contain alpha-numeric characters.',
        'any.required': 'Name is required.'
      }),
      
    email: Joi.string()
      .trim()
      .email({ 
        minDomainSegments: 2,
        tlds: { 
          allow: ['com', 'net']
        }
      })
      .required()
      .messages({
        'string.base': 'Text only.',
        'any.required': 'Email is required.',
        'string.email': 'Must be a valid email',
      }),
  
      password: Joi.string()
        .trim()
        .required()
        .min(8)
        .max(32)
        .alphanum()
        .messages({
          'any.required': 'Password is required.',
          'string.min': 'Password must be at least 8 characters.',
          'string.max': 'Password must be 32 characters or less.',
          'string.alphanum': 'Password can only alpha-numeric characters.'
        }),
  
      passwordConfirm: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
          'any.required': 'Must confirm password.',
          'any.only': 'Passwords must match.'
        })
  });

  const {value, error} = userSchema.validate(req.body, {abortEarly: false});

  if (error) {
    const msgs = error.details.map(el => el.message);
    throw new ExpressError(msgs, 400);
  }

  req.body = value;

  return next();
}




module.exports = {
  validUser
};