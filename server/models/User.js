const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;


// schema -> will describe what every individual record will look like
const userSchema = new Schema({
  googleId: String
});

// create 'MODEL CLASS'
  // if doesn't already exist, create model class (tells mongo that new collection should be created)
mongoose.model('users', userSchema);
// ^ loads the schema into mongoose (use 2 arguments)
  // use 1 argument to fetch the model out of mongoose --> mongoose.model('users')
    // use model class to create a new model instance and save it to db... (in passport.js)