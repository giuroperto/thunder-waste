const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');


const bookingSchema = new Schema({
  date: Date,
  time: { type: String, enum: ['morning', 'afternoon', 'evening']},
  material: { type: String, enum: ['plastic', 'glass', 'paper', 'wood', 'oil'] },
  quantity: Number,
  responsiblePerson: String,
  client: { type: Schema.Types.ObjectId, ref: 'User' }
}, 
{
  timestamps: true
})

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;