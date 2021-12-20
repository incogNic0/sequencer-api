const express = require('express');
const router = express.Router();

const { validUser } = require('../../helpers/joiSchemas');
const { catchAsync } = require('../../helpers/utils');


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', validUser, (req, res) => {
  res.send(req.body);
});

module.exports = router;