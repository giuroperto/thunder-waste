require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const ensureLogin = require('connect-ensure-login');
const nodemon = require('nodemon');
const cloudinary = require('cloudinary');
const favicon = require('serve-favicon');

const app = express();

// require model user
const User = require('./models/user');

//Connecting mongoose to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(x => {
  console.log(`Connect to Mongo DB`)
})
.catch(error => {
  console.log('Error connecting to Mongo DB', error)
  })
  
  // MIDDLEWARES SETUP
  
  // setting up favicon
  app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// setting up bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// setting up session
app.use(session({
  secret: "thunder-waste",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 6000000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

// setting up passport

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

app.use(flash());
passport.use(new LocalStrategy({
    passReqToCallback: true,
  },
  (req, username, password, next) => {
    User.findOne({
      username
    }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, {
          message: "Incorrect username"
        });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, {
          message: "Incorrect password"
        });
      }

      return next(null, user);
    });
  }));

app.use(passport.initialize());
app.use(passport.session());

//Views settings
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

//Route link to new route index.js
const index = require('./routes/index');
app.use('/', index);

//Link PORT to .env
app.listen(process.env.PORT)

module.exports = app;