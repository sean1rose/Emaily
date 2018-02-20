const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// 1)
const User = mongoose.model('users');

// 9)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 10)
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

// 2)
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    // 3)
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // 4)
    
    // 5)
    User.findOne({ googleId: profile.id }).then(existingUser => {
      if (existingUser) {
        // 6)
        done(null, existingUser);
      } 
      else {
        // 7)
        new User({googleId: profile.id}).save()
        .then(user => done(null, user));
        // 8)  
      }
    });
    
  })
);


// 1) MODEL CLASS: use 1 argument to fetch the model out of mongoose --> mongoose.model('users')
// 2) use passport to use new instance of google 2.0 strategy
  // need to pass client id and client secret to GoogleStrategy
// 3) route in our app user is sent back to after they grant permission to google to authorize our app
  // we'll need to add a route handler to handle this ^ -> user is coming back to our app from google w/ a google-code in hand
    // we'll parse the code out and send another request back to google w/ that code 
// 4) at this point, passport saw that google sent code back to our server and then 
// sent follow up request to google to exchange that code for profile/email (user info)
// *** now we have our opportunity to take that info and create a new user in our db
// 5) async query db to check if record exists first
// 6) inform passport that we are done w/ user creation and can resume auth process
// 7) create a new MODEL INSTANCE of the user + PERSIST it to db...
// use mongoose model to save 
// 8)  ^ 'user' is a model instance
// 9) this is our own, internal, mongodb id (not the googleId)
// 10) turn id into mongoose model instance by querying db for user w/ that id
  