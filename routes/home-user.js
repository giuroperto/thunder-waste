const express = require('express');
const router = express.Router();
const User = require('../models/user');
const uploadCloud = require('../config/cloudinary');
const Booking = require('../models/booking');
const ensureLogin = require('connect-ensure-login');

//GET User's Home Page
router.get('/home', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const {
    id
  } = req.user;
  const {
    bookings
  } = req.user;
  User.findById(id)
    //populating bookings array with all information located at Bookings model (new waste remove schedule)
    .populate('bookings')
    .then(data => {
      res.render('users/user-home', {
        data,
        message: req.flash('error')
      });
    })
    .catch(error => {
      console.log(error)
    })
})


//GET User's Profile Page
router.get('/profile', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const activeUser = req.user;
  User.findById(activeUser._id)
    .then(data => {
      // res.send(req.user)
      res.render('users/user-profile', {
        data,
        message: req.flash('error')
      })
    })
    .catch(error => {
      console.log('There is an error', error)
    })
})

//GET Edit User's Info Page
router.get('/edit-infos/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const {
    id
  } = req.params;
  User.findById(id)
    .then(data => {
      res.render('users/user-edit-infos', data)
    })
    .catch(error => {
          console.log('There is an error', error)
        })
})

//POST Edit User's Info Page (Update infos)
router.post('/edit-infos/:id', ensureLogin.ensureLoggedIn(), uploadCloud.single('logo'), (req, res, next) => {
  const {
    id
  } = req.params;
  const {
    username,
    name,
    address,
    phone,
    sector,
    email,
    cnpj
  } = req.body;
  User.findByIdAndUpdate(id, {
      username,
      name,
      address,
      phone,
      sector,
      email,
      cnpj
    })
    .then(_ => {
      req.flash('error', '');
      req.flash('error', `${name}\'s infos have been successfully updated`);
      res.redirect('/profile');
    })
    .catch(error => {
      console.log('Error while editing account infos', error)
    })
})

//GET User's Bookings Page
router.get('/bookings', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  //getting id from the logged user (req.user get the infos related to the logged user)
  const {
    id
  } = req.user;
  res.render('users/user-bookings', req.user)
});

router.get('/bookings/:id/edit', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Booking.findById(req.params.id)
  .then(booking => {
    res.render('booking-edit', booking);
  })
  .catch(err => console.log(err))
});

router.get('/bookings/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Booking.findById(req.params.id)
  .populate('client')
  .then(booking => {
    res.render('booking-details', booking);
  })
  .catch(err => console.log(err))
});

//POST User's Bookings Page (schedule a new waste remove)
router.post('/bookings', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const {
    id
  } = req.user;
  const {
    date,
    time,
    material,
    quantity,
    responsiblePerson
  } = req.body;
  Booking.create({
      client: id,
      date,
      time,
      material,
      quantity,
      responsiblePerson
    })
    .then(data => {
      const bookingId = data.id;
      User.findByIdAndUpdate(id, {
          $push: {
            bookings: bookingId
          }
        }, {
          new: true
        })
        .then(obj => {
          req.flash('error', '');
          req.flash('error', 'Booking created!');
          res.redirect('/home');
        })
        .catch(error => {
          console.log('Error', error);
        })
    })
    .catch(error => {
      console.log('Error while booking new waste remove', error);
    })
});

module.exports = router;