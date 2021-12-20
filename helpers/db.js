const mongoose = require('mongoose');

const mongoDBUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/step-sequencer';

module.exports = async () => {
  const db = mongoose.connection;
  mongoose.connect(mongoDBUrl);
  
  db.on("error", console.error.bind(console, 'Mongo Connection Failed...'));
  db.once("open", () => {
      console.log("Mongo Connection Open...");
  });
}