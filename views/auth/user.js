const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Booking = require('./booking');

//Creating mongoose Schema
const userSchema = new Schema({
  name: String,
  cnpj: String,
  address: String,
  location: { type: { type: String}, coordinates: [Number] },
  phone: Number,
  sector: { type: String, enum: ['Energy', 'Materials', 'Industrials', 'Consumer Discretionary', 'Consumer Staples', 'Health Care', 'Financials', 'Information Technology'] },
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  accountType: {type: String, enum: ['Client', 'Internal', 'Admin']},
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  logo: String,
},
{ 
  timestamps: true 
});

//Creating mongoose model from our Schema
const User = mongoose.model('User', userSchema);
module.exports = User;
