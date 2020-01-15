const express = require('express');
const router = express.Router();

//GET Home Page
router.get('/', (req, res, next) => {
  res.render('index')
})

//GET Services Page
router.get('/services', (req, res, next) => {
  res.render('services');
})

//GET Materials Information Page
router.get('/recycling-waste-types', (req, res, next) => {
  res.render('recycling-types');
})

//GET About Us Page
router.get('/about', (req, res, next) => {
  res.render('about');
})

//GET Redirect Page
router.get('/redirect', (req, res, next) => {
  res.render('redirect');
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

//Route link to api.js route
const api = require('./api');
router.use('/api', api);

module.exports = router;