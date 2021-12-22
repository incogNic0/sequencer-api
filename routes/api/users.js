const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validReg, validLogin } = require('../../middleware/joiSchemas');
const { ExpressError, catchAsync } = require('../../helpers/utils');

const User = require('../../models/User');
const authUser = require('../../middleware/auth');


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/register', validReg, catchAsync( async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const { name, password } = req.body;

  // Check for existing user
  const existingUser = await User.findOne({ email });
  if(existingUser) throw new ExpressError(['Email is already registered.'], 409);

  // Create/Save new user and hashed password
  const newUser = new User({ name , email, password});
  const salt = await bycrypt.genSalt(10);
  newUser.password = await bycrypt.hash(password, salt)
  const user = await newUser.save()

  // Return Token
  const payload = {
    user: {
      id: user.id
    }
  }
  const secret = process.env.JWT_SECRET;

  jwt.sign(
    payload,
    secret,
    { expiresIn: 36000 },
    (err, token) => {
      if(err) throw err;
      res.json({ token });
    })
}));


// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post('/login', validLogin, catchAsync( async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const { password } = req.body;

  // Get user
  const user = await User.findOne({ email });
  if(!user) 
    throw new ExpressError(['Invalid credentials.'], 400);

  // Check password
  const isMatch = await bycrypt.compare(password, user.password);
  if(!isMatch) {
    throw new ExpressError(['Invalid credentials.'], 400)
  }

  // Return Token
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
    });
}));

router.get('/', authUser, (req, res, next) => {
  res.send('Private route.');
});

module.exports = router;