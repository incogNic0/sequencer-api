const jwt = require('jsonwebtoken');
const { ExpressError, catchAsync } = require('../helpers/utils');
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if(!token) 
    throw new ExpressError(['No token. Authorization denied.'], 401);

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;
    next()
  } catch (err) {
    throw new ExpressError(['Invalid token.'], 401);
  }
};