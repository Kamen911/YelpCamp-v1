const mongoose = require('mongoose');

// Campground SCHEMA Setup
const campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

// Compile schema into a Model
var Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;