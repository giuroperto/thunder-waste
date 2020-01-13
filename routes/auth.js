const express = require('express');
const router = express.Router();
router.get('/signup', (req, res, next) => {
  // passar se eh admin ou nao - current user
  res.render('auth/signup');
})
module.exports = router;