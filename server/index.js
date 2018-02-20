// 1)
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// 2)
require('./models/User');
// 3)
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

// 7)
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// 6)
app.use(passport.initialize());
app.use(passport.session());

// 4)
require('./routes/authRoutes')(app);

// 5)
const PORT = process.env.PORT || 5000;
app.listen(PORT);


// 1) COMMONJS modules on SERVER side (using require; as opposed to es2015 modules which use 'import')
// 2) create collection of users
// 3) don't assign, since that file isn't returning anything (just want to execute the code in that file)
// 4) require statement returns the function, then invoked w/ app as an argument...
// 5) heroku injects environment variables (set in node runtime)
  // if there's an env variable defined by heroku, assign it to PORT (otherwise you're developing so use 5000)
  // express telling node to listen to port 5000
// 6) enable cookies & tell passport to keep track of our auth w/ cookies - 
// 7) keys is used to encrypt
