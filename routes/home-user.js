const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Booking = require('../models/booking');

//GET User's Home Page
router.get('/home/:id', (req, res, next) => {
  const { id } = req.params;
  res.render('users/user-home')
  // User.findById(id)
  // .then(data => {
  //   res.render('users/user-home.hbs', data)
  // })
  // .catch(error => {
  //   console.log('There is an error', error)
  // })
})

//GET User's Profile Page
router.get('/bookings/:id', (req, res, next) => {
  const { id } = req.params;
  res.render('users/user-bookings');
  // User.findById(id)
  // .then(data => {
  //   res.render('users/user-bookings', data)
  // .catch(error => {
  //   console.log('There is an error', error)
  // })
  // })
})

//GET User's Profile Page
router.get('/profile/:id', (req, res, next) => {
  const { id } = req.params;
  res.render('users/user-profile');
  // User.findById(id)
  // .then(data => {
  //   res.render('users/user-profile', data)
  // .catch(error => {
  //   console.log('There is an error', error)
  // })
  // })
})

//GET Edit User's Info Page
router.get('/edit-infos/:id', (req, res, next) => {
  const { id } = req.params;
  res.render('users/user-edit-infos');
  // User.findById(Id)
  // .then(data => {
  //   res.render('users/user-edit-infos', data)
  // .catch(error => {
  //   console.log('There is an error', error)
  // })
  // })
})

module.exports = router;
