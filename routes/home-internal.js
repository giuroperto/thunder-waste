const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ensureLogin = require('connect-ensure-login');
const Booking = require('../models/booking');

// check routes according to the role of the user
const checkClient = checkRoles('client');
const checkAdmin = checkRoles('admin');
const checkInternal = checkRoles('internal');
const checkInternalAdmin = checkRoles2('internal', 'admin');

// rendezirando route home
router.get(('/'), checkInternalAdmin, (req, res, next) => {
  const activeUser = req.user;
  let isAdmin = (activeUser.accountType === 'admin');
  let isInternal = (activeUser.accountType === 'internal');

  User.find()
    .populate('bookings')
    .populate('client')
    .then(users => {
      let companiesBooking = users.filter(company => company.bookings.length > 0);

      res.render('internal/internal-home.hbs', {
        activeUser,
        isAdmin,
        isInternal,
        companiesBooking,
        message: req.flash('error')
      });

    })
    .catch(err => console.log(err));
});

// route to load list of employees
router.get('/employees', checkInternalAdmin, (req, res, next) => {
  const activeUser = req.user;
  let isInternal = (activeUser.accountType === 'internal');
  User.find({
      accountType: 'internal'
    })
    .then(employees => {
      const allOtherEmployees = employees.filter(employee => employee._id !== req.user._id);
      // if (allOtherEmployees.length == 0) {
      //   req.flash('error', '');
      //   req.flash('error', 'There are no employees in our database :/');
      // }
      res.render('internal/internal-all', {
        allOtherEmployees,
        isInternal,
        message: req.flash('error')
      });
    })
    .catch(err => console.log(err));
});

router.get('/admin', checkAdmin, (req, res, next) => {
  const activeUser = req.user;
  let isAdmin = (activeUser.accountType === 'admin');
  User.find({
    accountType: 'admin'
  })
  .then(admins => {
    const allOtherAdmins = admins.filter(admin => admin._id !== req.user._id);
    // if (allOtherEmployees.length == 0) {
    //   req.flash('error', '');
    //   req.flash('error', 'There are no employees in our database :/');
    // }
    res.render('internal/internal-all', {
      allOtherAdmins,
      isAdmin,
      message: req.flash('error')
    });
  })
  .catch(err => console.log(err));
})

// route to add a new 'internal' or 'admin' user
router.get('/employees/add', checkAdmin, (req, res, next) => {
  const activeUser = req.user;
  let isAdmin = (activeUser.accountType === 'admin');
  const returnPage = 'staff/employees';
  res.render('auth/signup', { isAdmin,
    returnPage,
    message: req.flash('error')
  });
});

router.get('/admin/add', checkAdmin, (req, res, next) => {
  const activeUser = req.user;
  let isAdmin = (activeUser.accountType === 'admin');
  const returnPage = 'staff/admin';
  res.render('auth/signup', { isAdmin,
    returnPage,
    message: req.flash('error')
  });
});

// route to load list of users
router.get('/users', checkInternalAdmin, (req, res, next) => {
  const activeUser = req.user;
  let isAdmin = (activeUser.accountType === 'admin');
  // console.log(isAdmin);
  // res.send(isAdmin);

  User.find({
      accountType: 'client'
    })
    .then(clients => {
      res.render('internal/user-list', {
        clients,
        isAdmin,
        message: req.flash('error')
      });
    })
    .catch(err => console.log(err));
});

// route to load list of bookings
router.get('/bookings', checkInternalAdmin, (req, res, next) => {
  User.find()
    .populate('bookings')
    .then(users => {
      let companiesBooking = users.filter(company => company.bookings.length > 0)
      res.render('internal/bookings.hbs', {
        companiesBooking,
        message: req.flash('error')
      });
    })
    .catch(err => console.log(err));
});

router.get('/myprofile', checkInternalAdmin, (req, res, next) => {
  let client = req.user;
  res.render('internal/user-details', { client });
});

router.get('/myprofile/edit', checkInternalAdmin, (req, res, next) => {
  res.render('internal/user-edit', req.user);
});

// route to see details of a specific user
router.get('/users/:id', checkInternalAdmin, (req, res, next) => {
  const {
    id
  } = req.params;
  User.findById(id)
    .populate('bookings')
    .then(client => {
      let hasBookings = (client.bookings.length > 0);
      res.render('internal/user-details', { client, hasBookings });
    })
    .catch(err => console.log(err));
});

router.get('/users/:id/edit', checkInternalAdmin, (req, res, next) => {
  let activeUser = req.user;
  const {
    id
  } = req.params;
  if (activeUser._id !== id){
    req.flash('error', '');
    req.flash('error', 'You don\'t have permission to perform this task');
    res.render('auth/login', { message: req.flash('error') });
  }
  User.findById(id)
    .then(client => {
      // res.send(client.location.coordinates.1);
      res.render('internal/user-edit', client);
    })
    .catch(err => console.log(err));
});

//TODO add admin role
// route to delete details of a user
router.post('/users/:id/delete', checkAdmin, (req, res, next) => {
  const {
    id
  } = req.params;
  User.findByIdAndRemove(id)
    .then(_ => {
      req.flash('error', '');
      req.flash('error', 'User deleted!');
      res.redirect('/staff/users');
    })
    .catch(err => console.log(err));
});

router.get('/employees/:id', checkAdmin, (req, res, next) => {
  const {
    id
  } = req.params;
  User.findById(id)
    .then(employee => {
      res.render('internal/internal-profile', employee);
    })
    .catch(err => console.log(err));
});

router.get('/employees/:id/edit', checkAdmin, (req, res, next) => {
  let activeUser = req.user;
  const {
    id
  } = req.params;
  if (activeUser._id !== id){
    req.flash('error', '');
    req.flash('error', 'You don\'t have permission to perform this task');
    res.render('auth/login', { message: req.flash('error') });
  }
  User.findById(id)
    .then(employee => {
      res.render('internal/user-edit', employee);
    })
    .catch(err => console.log(err));
});

//TODO add admin role
// route to delete details of a employee
router.post('/employees/:id/delete', checkAdmin, (req, res, next) => {
  const {
    id
  } = req.params;
  User.findByIdAndRemove(id)
    .then(_ => {
      req.flash('error', '');
      req.flash('error', 'User deleted!');
      res.redirect('/staff/employees');
    })
    .catch(err => console.log(err));
});

router.post('/:id/edit', checkInternalAdmin, (req, res, next) => {
  const {
    id
  } = req.params;
  // res.send(req.body);
  const {
    username,
    name,
    cnpj,
    email,
    address,
    latitude,
    longitude,
    phone,
    sector
  } = req.body;

  const addLocation = {
    type: 'Point',
    coordinates: [longitude, latitude],
  }

  User.findByIdAndUpdate(id, {
      username,
      name,
      cnpj,
      email,
      address,
      location: addLocation,
      phone,
      sector
    })
    .then(user => {
      req.flash('error', '');
      req.flash('error', `User ${user.name} updated successfully`);
      res.redirect('/staff/');
    })
    .catch(err => console.log(err))

})

function checkRoles(role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.accountType === role) {
      return next();
    } else {
      req.flash('error', '');
      req.flash('error', 'You can\'t access this page!');
      res.redirect('/login')
    }
  }
}

function checkRoles2(role1, role2) {
  return function (req, res, next) {
    if (req.isAuthenticated() && (req.user.accountType === role1 || req.user.accountType === role2)) {
      return next();
    } else {
      req.flash('error', '');
      req.flash('error', 'You can\'t access this page!');
      res.redirect('/login')
    }
  }
}

module.exports = router;