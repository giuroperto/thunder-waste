const express = require('express');
const router = express.Router();
const User = require('../models/user');
const uploadCloud = require('../config/cloudinary');
const passport = require('passport');
const flash = require('connect-flash');

// encryption
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
  const activeUser = req.user;
  let isAdmin = false;
  // (activeUser.accountType === 'admin');
  let returnPage = '';

  res.render('auth/signup', {
    isAdmin,
    returnPage,
    message: req.flash('error')
  });
});

router.post('/signup', uploadCloud.single('logo'), (req, res, next) => {
  const {
    username,
    name,
    address,
    phone,
    sector,
    accountType,
    email,
    password,
    cnpj,
    latitude,
    longitude
  } = req.body;

  const addLocation = {
    type: 'Point',
    coordinates: [longitude, latitude],
  };

  const logoUrl = req.file.url;

  if (username === '' || password === '' || email === '' || name === '' || cnpj === '') {
    req.flash('error', '');
    req.flash('error', 'You must complete all required fields before continuing!');
    res.render('auth/signup', {
      message: req.flash('error')
    });
    return;
  }

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPassword = bcrypt.hashSync(password, salt);

  User.findOne({
      username
    })
    .then(user => {
      if (user !== null) {
        req.flash('error', '');
        req.flash('error', 'Username combination not valid. Please try again!');
        res.render('auth/signup', {
          message: req.flash('error')
        });
        return;
      };

      User.findOne({
          email
        })
        .then(user => {
          if (user !== null) {
            req.flash('error', '');
            req.flash('error', 'Email is already linked to an account. Please log in!');
            res.redirect('/login');
            return;
          }

          User.create({
              username,
              name,
              address,
              phone,
              sector,
              accountType,
              email,
              cnpj,
              password: hashPassword,
              location: addLocation,
              logo: logoUrl
            })
            .then(user => {
              req.flash('error', '');
              req.flash('error', `Username ${user.username} successfully created!`);
              res.redirect('/login');
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.get('/login', (req, res, next) => {
  res.render('auth/login', {
    message: req.flash('error')
  });
});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/redirect",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true,
}));

module.exports = router;