const express  = require('express'),
      router   = express.Router({mergeParams: true});
const Campground = require('../models/campground'),
      Comment = require('../models/comment');

// MiddleWare Function Check is the user logged in/ if not, NOT show the /secret, if logged in and authenticated - show /secret
function isLoggedIn(req, res, next) {
   if(req.isAuthenticated()) {
       return next();
   } else {
        res.redirect('/login');
   }
}

// Comments NEW Route : show form to add a new comment
router.get('/new', isLoggedIn, (req, res) => {
   Campground.findById(req.params.id, (err, foundCampground) => {
       if(err) {
           console.log(err);
       } else {
           res.render('comments/new', {campground: foundCampground});
       }
   });

});

// Comments CREATE Route : add new comment to campground in DB
router.post('/', isLoggedIn, (req, res) => {
   // lookup campground using ID
   Campground.findById(req.params.id, (err, foundCampground) => {
       if(err) {
           console.log(err);
           res.redirect('/campgrounds');
       } else {
           // Create new comment
           Comment.create(req.body.comment, (err, comment) => {
               if(err) {
                   console.log(err);
               } else {
                   // Add username and id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   // Save the comment
                   comment.save();
                   // Connect the new comment to campground
                   foundCampground.comments.push(comment);
                   foundCampground.save();
                   // redirect to campground show page
                    res.redirect(`/campgrounds/${foundCampground._id}`);
               }
           });
       }
   });
});

module.exports = router;