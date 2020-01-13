const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  date: Date,
  time: { type: String, enum: ['Morning (8am to 12pm)', 'Afternoon (1pm to 5pm)', 'Evening (6pm to 11pm)']},
  material: { type: String, enum: ['Plastic', 'Glass', 'Paper', 'Wood', 'Oil'] },
  quantity: Number,
  responsiblePerson: String,
  client: { type: Schema.Types.ObjectId, ref: 'User' }
}, 
{
  timestamps: true
})

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;