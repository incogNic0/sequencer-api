const { ExpressError, errorHandler, catchAsync } = require('../helpers/utils');
const Joi = require('joi');

const validReg = (req, res, next) => {
  const registrationSchema = Joi.object({
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

  const {value, error} = registrationSchema.validate(req.body, {abortEarly: false});
  if (error) {
    const msgs = error.details.map(el => el.message);
    throw new ExpressError(msgs, 400);
  }

  req.body = value;

  return next();
}

const validLogin = (req, res, next) => {
  const loginSchema = Joi.object({
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
    .messages({
      'any.required': 'Password is required.',
    })
  });

  const {value, error} = loginSchema.validate(req.body, {abortEarly: false});

  if (error) {
    const msgs = error.details.map(el => el.message);
    throw new ExpressError(msgs, 400);
  }

  req.body = value;

  return next();
}




module.exports = {
  validReg,
  validLogin
};