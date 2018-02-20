const mongoose = require('mongoose');
// 1)
const { Schema } = mongoose;

// 2)
const userSchema = new Schema({
  googleId: String
});

// 3)
mongoose.model('users', userSchema);



// 1) const Schema = mongoose.Schema;
// 2) schema -> will describe what every individual record will look like
// 3) create 'MODEL CLASS'
  // if doesn't already exist, create model class (tells mongo that new collection should be created)
// ^ loads the schema into mongoose (use 2 arguments)
  // use 1 argument to fetch the model out of mongoose --> mongoose.model('users')
    // use model class to create a new model instance and save it to db... (in passport.js)