const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ensureLogin = require('connect-ensure-login');

// rendezirando route home
//TODO add info about bookings
router.get(('/'), ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const activeUser = req.user;
  // res.send(activeUser);
  User.find()
  .populate('bookings')
  .then(users => {
    let companiesBooking = users.filter(company => company.bookings.length > 0)
    // res.send(companiesBooking);
    // res.send({users})
    res.render('internal/internal-home.hbs', { activeUser, companiesBooking });
  })
  .catch(err => console.log(err));
});

// route to load list of employees
router.get('/employees', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.find({ accountType: 'internal' })
    .then(employees => {
      res.render('internal/internal-all', { employees });
    })
    .catch(err => console.log(err));
  });
  
  // route to add a new 'internal' or 'admin' user
  //TODO only admins can perform this task
  router.get('/employees/add', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    res.render('auth/signup');
  });
  
  // route to load list of users
  router.get('/users', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    User.find({ accountType: 'client' })
    .then(clients => {
      res.render('internal/user-list', { clients });
    })
    .catch(err => console.log(err));
  });

  // route to see details of a specific user
  // TODO show bookings?
  router.get('/users/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
    .populate('bookings')
    .then(client => {
      res.render('internal/user-details', client);
    })
    .catch(err => console.log(err));
  });

  router.get('/users/:id/edit', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
    .then(client => {
      res.render('internal/user-edit', client);
    })
    .catch(err => console.log(err));
  });

  //TODO add admin role
  // route to delete details of a user
router.post('/users/:id/delete', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
  .then(_ => {
    req.flash('error', '');
    req.flash('error', 'User deleted!');
    res.redirect('/staff/users');
  })
  .catch(err => console.log(err));
});

router.get('/employees/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
  .then(employee => {
    res.render('internal/internal-profile', employee);
  })
  .catch(err => console.log(err));
});

router.get('/employees/:id/edit', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
  .then(employee => {
    res.render('internal/user-edit', employee);
  })
  .catch(err => console.log(err));
});

//TODO add admin role
// route to delete details of a employee
router.post('/employees/:id/delete', ensureLogin.ensureLoggedIn(), (req, res, next) => {
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