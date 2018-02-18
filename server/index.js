// COMMONJS modules on SERVER side (using require; as opposed to es2015 modules which use 'import')
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys.js');

const app = express();


// use passport to use new instance of google 2.0 strategy
  // need to pass client id and client secret to GoogleStrategy
passport.use(new GoogleStrategy());


// heroku injects environment variables (set in node runtime)
  // if there's an env variable defined by heroku, assign it to PORT (otherwise you're developing so use 5000)
const PORT = process.env.PORT || 5000;
// express telling node to listen to port 5000
app.listen(PORT);