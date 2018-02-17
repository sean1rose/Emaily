// COMMONJS modules on SERVER side (using require; as opposed to es2015 modules which use 'import')
const express = require('express');
const app = express();

// route handler
app.get('/', (req, res) => {
  // send response
  res.send({ hi: 'there'});
});


// heroku injects environment variables (set in node runtime)
  // if there's an env variable defined by heroku, assign it to port
  // otherwise you're developing so use 5000
const PORT = process.env.PORT || 5000;
// express telling node to listen to port 5000
app.listen(PORT);