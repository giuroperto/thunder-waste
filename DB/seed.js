// const mongoose = require('mongoose');
// const User = require('../models/user');

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(x => {
//   console.log(`Connect to Mongo DB`)
// })
// .catch(error => {
//   console.log('Error connecting to Mongo DB', error)
// })

// const users = [
//   {
//     name: String,
//   cnpj: String,
//   address: String,
//   location: { type: { type: String}, coordinates: [Number] },
//   phone: Number,
//   sector: { type: String, enum: ['Energy', 'Materials', 'Industrials', 'Consumer Discretionary', 'Consumer Staples', 'Health Care', 'Financials', 'Information Technology'] },
//   username: 'giulia',
//   email: 'giu@giu.com',
//   password: { type: String, require: true },
//   accountType: {type: String, enum: ['Client', 'Internal', 'Admin']},
//   bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
//   logo: String,
//   }
// ]