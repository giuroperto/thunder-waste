const express = require('express');
const router = express.Router();
const User = require('../models/user');
const uploadCloud = require('../config/cloudinary');
const Booking = require('../models/booking');


//GET User's Home Page
router.get('/home', (req, res, next) => {
  const { id } = req.user;
  res.render('users/user-home', req.user)
})


//GET User's Profile Page
router.get('/profile', (req, res, next) => {
  const activeUser = req.user;
  User.findById(activeUser._id)
  .then(data => {
    // res.send(req.user)
    res.render('users/user-profile', data)
    .catch(error => {
      console.log('There is an error', error)
    })
  })
})

//GET Edit User's Info Page
router.get('/edit-infos/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
  .then(data => {
    res.render('users/user-edit-infos', data)
    .catch(error => {
      console.log('There is an error', error)
    })
  })
})

//POST Edit User's Info Page (Update infos)
router.post('/edit-infos/:id', uploadCloud.single('logo'), (req, res, next) => {
  const { id } = req.params;
  const { username, name, address, phone, sector, email, cnpj } = req.body;
  User.findByIdAndUpdate(id, { username, name, address, phone, sector, email, cnpj })
  .then(_ => {
    res.redirect('/profile')
  })
  .catch(error => {
    console.log('Error while editing account infos', error)
  })
})

//GET User's Bookings Page
router.get('/bookings', (req, res, next) => {
  //getting id from the logged user (req.user get the infos related to the logged user)
  const { id } = req.user;
  res.render('users/user-bookings', req.user)
})

//POST User's Bookings Page (schedule a new waste remove)
router.post('/bookings', (req, res, next) => {
  const { id } = req.user;
  const { date, time, material, quantity, responsiblePerson } = req.body;
  Booking.create({ client: id, date, time, material, quantity, responsiblePerson })
  .then(data => {
    const bookingId = data.id;
    User.findByIdAndUpdate(id, { $push: {bookings: bookingId}}, {new: true})
    .then(obj => {
      res.send(obj)
    })
    .catch(error => {
      console.log('Error', error)
    })
    // res.redirect('/profile')
  })
  .catch(error => {
    console.log('Error while booking new waste remove', error)
  })
})

module.exports = router;

