const express = require('express');
const router = express.Router();

//GET Home Page
router.get('/', (req, res, next) => {
  res.render('layout')
})

//GET Materials Information Page
router.get('/recycling-waste-types', (req, res, next) => {
  res.render('reclying-types')
})

//GET About Us Page
router.get('/about', (req, res, next) => {
  res.render('about')
})

//Route link to new route home-user.js
const homeUser = require('./home-user')
router.use('/', homeUser);

//Route link to new route home-internal.js
const homeInternal = require('./home-internal');
router.use('/', homeInternal);

module.exports = router;