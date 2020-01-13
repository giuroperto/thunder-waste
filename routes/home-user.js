const express = require('express');
const router = express.Router();
const User = require('../models/user')

//GET User's Home Page
router.get('/home/:Id', (res, req, next) => {
  const { id } = req.params;
  console.log(req.params)
  User.findById(id)
  .then(data => {
    res.render('user-home', data)
  })
  .catch(error => {
    console.log('There is an error', error)
  })
  
})

module.exports = router;
