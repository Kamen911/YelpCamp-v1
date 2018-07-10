const express               = require('express'),
      app                   = express(),
      methodOverride        = require('method-override'),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      session               = require('express-session'),
      port                  = 3000;
// Schema Setup
const User                  = require('./models/user'),
      Campground            = require('./models/campground'),
      Comment               = require('./models/comment');
// Requring Routes Setup
const campgroundRoutes      = require('./routes/campgrounds'),
      commentRoutes         = require('./routes/comments'),
      indexRoutes           = require('./routes/index');
// Seed file for clear and populate the DB with sample data
const seedDB                = require('./seeds');

// Create and connect to a yelp_camp Database inside of MongoDB
mongoose.connect('mongodb://localhost:27017/yelp_camp');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
// seedDB(); // Seed the database

// Passport Setup (First Session -> initialize -> Session !Important ORDER!)
app.use(session({ secret: "kamen kirilov", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
// Serialize and Deserialize to the User, require passport to work and give the LocalStrategy that we add ( LocalStrategy = require('passport-local'))
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass currentUser data to all routes to NOT be undefined, so not crashing
app.use( (req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/', indexRoutes);


// Tell Express to listen for requests (start server)
app.listen(port, () => console.log(`The YelpCamp Server is started on port ${port}!`) );