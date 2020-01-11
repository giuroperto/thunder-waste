require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const logger = require('morgan');
// const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const multer = require('multer');
const ensureLogin = require('connect-ensure-login');
// debug?