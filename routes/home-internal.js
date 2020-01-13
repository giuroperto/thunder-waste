const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get(('/home'), (req, res, next) => {
  res.render('internal-home');
});

// router.get('/all', (req, res, next) => {
//   User.find({accountType: 'Internal'})
//   .then(employees => {
//     res.render('internal-all', { employees });
//   })
//   .catch(err => console.log(err))
// });

module.exports = router;
