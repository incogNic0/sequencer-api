const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sampleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  audioURL: {
    type: String,
    required: true
  }
})

const kitSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  defaultTempo: {
    type: Number
  },
  samples: [ sampleSchema ]
});

module.exports = mongoose.model('Kit', kitSchema);