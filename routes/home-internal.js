const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get(('/'), (req, res, next) => {
  // add active user + name in the welcome page
  res.render('internal/internal-home.hbs');
});

router.get('/employees', (req, res, next) => {
  // res.render('internal/internal-all');
  User.find({
      accountType: 'Internal'
    })
    .then(employees => {
      res.render('internal/internal-all', {
        employees
      });
    })
    .catch(err => console.log(err));
  });
  
  router.get('/employees/add', (req, res, next) => {
    // verificar se eh admin para poder criar account Type
    res.render('auth/signup');
  });
  
  router.get('/users', (req, res, next) => {
    // res.render('internal/user-list');
    User.find({ accountType: 'Client' })
    .then(clients => {
      res.render('internal/user-list', { clients });
    })
    .catch(err => console.log(err));
  });

  router.get('/users/:id', (req, res, next) => {
    // res.render('internal/user-details');
    const { id } = req.params;
    User.findById(id)
    .then(client => {
      res.render('internal/user-details', client);
    })
    .catch(err => console.log(err));
  });

  router.get('/users/:id/edit', (req, res, next) => {
    // res.render('internal/user-edit');
    const { id } = req.params;
    User.findById(id)
    .then(client => {
      res.render('internal/user-edit', client);
    })
    .catch(err => console.log(err));
  });

router.get('/employees/:id', (req, res, next) => {
  // res.render('internal/internal-profile');
  const { id } = req.params;
  User.findById(id)
  .then(employee => {
    res.render('internal/internal-profile', employee);
  })
  .catch(err => console.log(err));
});

router.get('/employees/:id/edit', (req, res, next) => {
  // res.render('internal/internal-edit');
  const { id } = req.params;
  User.findById(id)
  .then(employee => {
    res.render('internal/internal-edit', employee);
  })
  .catch(err => console.log(err));
});

module.exports = router;