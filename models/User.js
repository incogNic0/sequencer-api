const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  profileName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    trim: true
  }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema );