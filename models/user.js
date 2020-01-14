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
  sector: { type: String, enum: ['business', 'cottage-industry', 'heavy-industry', 'light-industry', 'manufacturing'] },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: {type: String, enum: ['client', 'internal', 'admin'], default: 'client'},
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  logo: {type: String, default: 'https://res.cloudinary.com/dxatyucj2/image/upload/v1579016218/thunder-waste/black-chimpanzee-smiling-50582_ol5eps.jpg' }
},
{ 
  timestamps: true 
});

// for adding maps later on using the location
userSchema.index({ location: '2dsphere' });

//Creating mongoose model from our Schema
const User = mongoose.model('User', userSchema);
module.exports = User;
