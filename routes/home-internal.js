const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get(('/'), (req, res, next) => {
  // add active user + name in the welcome page
  res.render('internal/internal-home.hbs');
});

// route to load list of employees
router.get('/employees', (req, res, next) => {
  User.find({ accountType: 'internal' })
    .then(employees => {
      res.render('internal/internal-all', { employees });
    })
    .catch(err => console.log(err));
  });
  
  // route to add a new 'internal' or 'admin' user
  //TODO only admins can perform this task
  router.get('/employees/add', (req, res, next) => {
    res.render('auth/signup');
  });
  
  // route to load list of users
  //TODO check if only clients
  router.get('/users', (req, res, next) => {
    User.find({ accountType: 'client' })
    .then(clients => {
      res.render('internal/user-list', { clients });
    })
    .catch(err => console.log(err));
  });

  // route to see details of a specific user
  router.get('/users/:id', (req, res, next) => {
    // res.render('internal/user-details');
    const { id } = req.params;
    User.findById(id)
    .populate('bookings')
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

  // route to delete details of a user
router.post('/users/:id/delete', (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
  .then(_ => {
    req.flash('error', '');
    req.flash('error', 'User deleted!');
    res.redirect('/staff/users');
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

// route to delete details of a employee
router.post('/employees/:id/delete', (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
  .then(_ => {
    req.flash('error', '');
    req.flash('error', 'User deleted!');
    res.redirect('/staff/employees');
  })
  .catch(err => console.log(err));
});

module.exports = router;