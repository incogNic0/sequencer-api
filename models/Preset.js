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
  },
  effects: {
    gainValue: {
      type: Number,
      default: 1
    },
    panValue: {
      type: Number,
      default: 0
    }
  }
});

const presetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  
  kitName: {
    type: String,
    required: true()
  },

  defaultTempo: {
    type: Number
  },
  samples: [ sampleSchema ]
});

module.exports = mongoose.model('Preset', presetSchema);