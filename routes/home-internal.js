const express = require('express');
const router = express.Router();

router.get(('/staff/home'), (req, res, next) => {
  res.render('internal-home');
});

router.get('/staff/pro')

module.exports = router;
