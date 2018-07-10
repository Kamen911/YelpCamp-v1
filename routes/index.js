const express  = require('express'),
      router   = express.Router(),
      passport = require('passport');
const User = require('../models/user');

// MiddleWare Function Check is the user logged in/ if not, NOT show the /secret, if logged in and authenticated - show /secret
function isLoggedIn(req, res, next) {
   if(req.isAuthenticated()) {
       return next();
   } else {
        res.redirect('/login');
   }
}

router.get("/", (req, res) => res.render("landing") );

// -------Auth routes-------

// Show Sign UP register Form
router.get('/register', (req, res) => {
   res.render('users/register');
});

// Handling Sign Up logic
router.post('/register', (req, res) => {
   const newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, (err, user) => {
       if(err) {
           console.log(err);
           return res.render('users/register');
       } else {
           passport.authenticate('local')(req, res, ()=>{
                res.redirect('/campgrounds');
           });
       }
   });
});

// --------------Login Routes
// Show login form
router.get('/login', (req, res) => {
   res.render('users/login');
});
// Handling Login Logic / MiddleWare
// ( router.post('login', middleware, callback) )
router.post('/login', passport.authenticate('local',
   {
       successRedirect: '/campgrounds',
       failureRedirect: '/login'
   }), (req, res) => {

});

// LogOUT Route
router.get('/logout', (req, res) => {
   req.logout();
   res.redirect('/');
});

module.exports = router;