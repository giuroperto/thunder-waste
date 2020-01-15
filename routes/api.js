const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => {
  User.find({ accountType: 'client' })
    .then((response) => res.json(response))
    .catch((err) => {
      throw new Error(err);
    });
});

module.exports = router;