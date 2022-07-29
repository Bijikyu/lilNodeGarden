const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const factSchema = new Schema({
  facts: Array
}, {
  timestamps: true
});

const userSchema = new Schema({
  name: String,
  email: String,
  cohort: String,
  avatar: String,
  facts: [factSchema],
  googleId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);