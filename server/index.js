// COMMONJS modules on SERVER side (using require; as opposed to es2015 modules which use 'import')
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// create collection of users
require('./models/User');
// don't assign, since that file isn't returning anything (just want to execute the code in that file)
require('./services/passport');

const app = express();
mongoose.connect(keys.mongoURI);


// require statement returns the function, then invoked w/ app as an argument...
require('./routes/authRoutes')(app);


// heroku injects environment variables (set in node runtime)
  // if there's an env variable defined by heroku, assign it to PORT (otherwise you're developing so use 5000)
const PORT = process.env.PORT || 5000;
// express telling node to listen to port 5000
app.listen(PORT);

