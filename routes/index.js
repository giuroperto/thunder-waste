const express = require('express');
const router = express.Router();

//GET Home Page
router.get('/', (req, res, next) => {
  res.render('index')
})

//GET Services Page
router.get('/services', (req, res, next) => {
  res.render('services')
})

//GET Materials Information Page
router.get('/recycling-waste-types', (req, res, next) => {
  res.render('reclying-types')
})

//GET About Us Page
router.get('/about', (req, res, next) => {
  res.render('about')
})

// GET LOGOUT
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

//Route link to home-user.js route 
const homeUser = require('./home-user')
router.use('/', homeUser);

//Route link to home-internal.js route
const homeInternal = require('./home-internal');
router.use('/staff', homeInternal);

//Route link to auth.js route
const auth = require('./auth');
router.use('/', auth);

module.exports = router;