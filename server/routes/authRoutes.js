const passport = require('passport');

module.exports = (app) => {
  // route handler when user clicks login button -> pass user off to passport
  app.get(
    '/auth/google', 
    passport.authenticate('google', {
      // scope specifies to google what access we want to have on this user (we want user's profile and email)
      scope: ['profile', 'email']
    })
  );
  
  // google strategy will know that this request has code contained w/in
  app.get(
    '/auth/google/callback', 
    passport.authenticate('google')
  );
    // -> goes to passport.use -> w/ access token in hand (callback arrow function)
}
