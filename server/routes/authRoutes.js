const passport = require('passport');

module.exports = (app) => {
  // 1)
  app.get(
    '/auth/google', 
    passport.authenticate('google', {
      // 2)
      scope: ['profile', 'email']
    })
  );
  
  // 3)
  app.get(
    '/auth/google/callback', 
    passport.authenticate('google')
  );
  // 4)
}



// 1) route handler when user clicks login button -> pass user off to passport
// 2) scope specifies to google what access we want to have on this user (we want user's profile and email)
// 3) google strategy will know that this request has code contained w/in
// 4) -> goes to passport.use -> w/ access token in hand (callback arrow function)
