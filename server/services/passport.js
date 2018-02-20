const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

  // MODEL CLASS: use 1 argument to fetch the model out of mongoose --> mongoose.model('users')
const User = mongoose.model('users');

// use passport to use new instance of google 2.0 strategy
  // need to pass client id and client secret to GoogleStrategy
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    // route in our app user is sent back to after they grant permission to google to authorize our app
      // we'll need to add a route handler to handle this ^ -> user is coming back to our app from google w/ a google-code in hand
        // we'll parse the code out and send another request back to google w/ that code 
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log('profile: ', profile);
    console.log('refreshToken: ', refreshToken);
    console.log('accessToken: ', accessToken);
    // at this point, passport saw that google sent code back to our server and then 
    // sent follow up request to google to exchange that code for profile/email (user info)
    // *** now we have our opportunity to take that info and create a new user in our db
    
    // async query db to check if record exists first
    User.findOne({ googleId: profile.id }).then(existingUser => {
      if (!existingUser) {
        new User({googleId: profile.id}).save();
        // ^ create a new instance of the user + PERSIST it to db...
        // use mongoose model to save 
      }
    });

  })
);
  