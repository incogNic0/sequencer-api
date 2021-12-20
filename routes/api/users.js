const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validUser } = require('../../helpers/joiSchemas');
const { ExpressError, catchAsync } = require('../../helpers/utils');

const User = require('../../models/User');


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', validUser, catchAsync( async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if(existingUser) throw new ExpressError(['Email is already registered.'], 409);

  const newUser = new User({...req.body});

  const salt = await bycrypt.genSalt(10);
  newUser.password = await bycrypt.hash(password, salt)

  const user = await newUser.save()

  const payload = {
    user: {
      id: user.id
    }
  }
  const secret = process.env.JWT_SECRET;

  jwt.sign(
    payload,
    secret,
    { expiresIn: 3600 },
    (err, token) => {
      if(err) throw err;
      res.json({ token });
    })
}));

module.exports = router;