const { ExpressError, errorHandler, catchAsync } = require('./utils');
const Joi = require('joi');

const validUser = (req, res, next) => {
  const userSchema = Joi.object({
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
    console.log(error)
    const msgs = error.details.map(el => el.message);
    throw new ExpressError(msgs, 400);
  }

  req.body = value;

  return next();
}




module.exports = {
  validUser
};