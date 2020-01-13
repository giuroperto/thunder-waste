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
// const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const ensureLogin = require('connect-ensure-login');
const nodemon = require('nodemon');
const cloudinary = require('cloudinary');
// debug?

const app = express();

//Connecting mongoose to database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(x => {
  console.log(`Connect to Mongo DB`)
})
.catch(error => {
  console.log('Error connecting to Mongo DB', error)
})

//Views settings
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

//Defining index route
const index = require('./routes/index');
app.use('/', index);

//Link PORT to .env
app.listen(process.env.PORT)

module.exports = app;