const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
   username: String,
   password: String
});

// Required passport to work
userSchema.plugin(passportLocalMongoose);
// Export the model 'User'
const User = mongoose.model('User', userSchema);
module.exports = User;