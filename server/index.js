// COMMONJS modules on SERVER side (using require; as opposed to es2015 modules which use 'import')
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();


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
    // at this point, passport saw that google sent code back to our server and then 
    // sent follow up request to google to exchange that code for profile/email (user info)
    // *** now we have our opportunity to take that info and create a new user in our db
    console.log('access token - ', accessToken);
    console.log('refresh token - ', refreshToken);
    console.log('profile - ', profile);
    console.log('done - ', done);
  })
);

// route handler when user clicks login button -> pass user off to passport
app.get('/auth/google', passport.authenticate('google', {
  // scope specifies to google what access we want to have on this user (we want user's profile and email)
  scope: ['profile', 'email']
}));

// google strategy will know that this request has code contained w/in
app.get('/auth/google/callback', passport.authenticate('google'));
  // -> goes to passport.use -> w/ access token in hand (callback arrow function)


// heroku injects environment variables (set in node runtime)
  // if there's an env variable defined by heroku, assign it to PORT (otherwise you're developing so use 5000)
const PORT = process.env.PORT || 5000;
// express telling node to listen to port 5000
app.listen(PORT);

