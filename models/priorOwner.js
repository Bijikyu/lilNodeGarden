// to demo many to many and referancing

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priorOwnerSchema = new Schema({
  name: String,
  born: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('PriorOwner', priorOwnerSchema); // Compile the schema into a model and export it.