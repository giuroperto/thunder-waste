const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Booking = require('../models/booking');

//GET User's Home Page
router.get('/home/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
  .then(data => {
    res.render('user-home', data)
  })
  .catch(error => {
    console.log('There is an error', error)
  })
})

//GET User's Profile Page
router.get('/profile/:id')

module.exports = router;
