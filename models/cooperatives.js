const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coopSchema = new Schema ({
  name: String,
  address: String,
  location: { type: { type: String}, coordinates: [Number] },
}, { 
  timestamps: true,
})

const Cooperative = mongoose.model('Cooperative', coopSchema);

module.exports = Cooperative;
