const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Cooperative = require('../models/cooperatives');

router.get('/clients', (req, res) => {
  User.find({ accountType: 'client' })
    .then((response) => res.json(response))
    .catch((err) => {
      throw new Error(err);
    });
});

router.get('/cooperatives', (req, res) => {
  Cooperative.find()
    .then((response) => res.json(response))
    .catch((err) => {
      throw new Error(err);
    });
});

module.exports = router;