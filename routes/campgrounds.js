const express  = require('express'),
      router   = express.Router();
const Campground = require('../models/campground');


// Campground INDEX Route : show all campgrounds
router.get("/", (req, res) => {
   // Get all campgrounds from DB
   Campground.find({}, (err, allCampgrounds) => {
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
   });
});

// Campground CREATE Route : add new campgrounds to DB
router.post("/", isLoggedIn, (req, res) => {
   // Get Data from form and add to campgrounds array
   let name            = req.body.name,
       image           = req.body.image,
       desc            = req.body.description,
       author = {
           id: req.user._id,
           username: req.user.username
       };
       NewCampground = {name: name, image: image, description: desc, author: author};

   //Create a new campground and save it to DB
   Campground.create(NewCampground, (err, newlyCreated) => {
       if(err) {
           console.log(err);
       } else {
            res.redirect('/campgrounds');
       }
   });

});

// Campground NEW Route : show form to create new campground
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new.ejs");
});

// Campground SHOW Route : show info about particular campground ID
router.get("/:id", (req, res) => {
   // Find the campground with the provided IDe
   Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
       if(err) {
           console.log(err);
       } else {
           // render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
   });
});

// Campground EDIT Route
router.get('/:id/edit', checkCampgroundOwnership, (req, res) => {
        Campground.findById(req.params.id, (err, foundCampground) => {
            res.render('campgrounds/edit', {campground: foundCampground});
        });
})

// Campground UPDATE Route
router.put('/:id', (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground ,(err, updateCampground) => {
         if(err) {
            console.log(err);
            res.redirect('/campgrounds');
         } else {
            res.redirect('/campgrounds/' + req.params.id);
         }
    });
});

// Campground DESTROY Route
router.delete('/:id', (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            console.log(err);
             res.redirect('/campgrounds/' + req.params.id);
        } else {
             res.redirect('/campgrounds');
        }
    });
});

// MiddleWare Function Check is the user logged in/ if not, NOT show the /secret, if logged in and authenticated - show /secret
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
         res.redirect('/login');
    }
 }

function checkCampgroundOwnership(req, res, next){
    // Is user logged in ?
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err) {
                console.log(err);
                res.redirect('back');
            } else {
                // Does user own the campground ?
                // foundCampground.author.id is mongoose object
                // req.user._id is a string
                // So we can not compare it by == or ===
                // we will use mongoose method .equals()
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                     res.redirect('back');
                }
            }
        });

    } else {
         res.redirect('back'); // Send back the user from where came from
    }
}

module.exports = router;